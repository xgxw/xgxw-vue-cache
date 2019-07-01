import * as Axios from 'axios'
import router from '@/router'
import { client as tokenClient, TokenType } from './token'

const baseURL = process.env.VUE_APP_BASE_URL
const goAuthorizePage = () => {
  tokenClient.delTokenInfo().then((res) => {
    router.push("/login")
  })
}

export class HTTPClient {
  private readonly axios: Axios.AxiosInstance;

  constructor(requsetConfig: Axios.AxiosRequestConfig) {
    this.axios = Axios.default.create({
      timeout: 0,
      withCredentials: true, // 允许跨域 cookie
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      maxContentLength: 2000,
      transformResponse: [
        data => {
          try {
            data = JSON.parse(data);
          } catch (e) {
            data = {};
          }
          if (data.status === 403) {
            tokenClient.delTokenInfo()
            router.push('/login');
          }
          return data;
        },
      ],
      ...requsetConfig,
    })
  }

  async fetchFile(r: FetchFileRequset): Promise<FetchFileResponse> {
    return this.request({
      url: 'v1/file/' + r.fid,
      method: "GET",
    })
  }
  async uploadFile(r: UploadFileRequset): Promise<UploadFileResponse> {
    return this.authRequest({
      url: 'v1/file/' + r.fid,
      method: "POST",
      data: {
        ...r
      }
    })
  }

  // Token相关
  async fetchToken(r: FetchTokenRequest): Promise<FetchTokenResponse> {
    return this.request({
      url: "v1/token",
      method: "POST",
      data: {
        client_id: "",
        scope: "",
        client_secret: "",
        ...r
      }
    })
  }
  async authorization(r: FetchTokenRequest): Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {
      this.fetchToken(r).then(res => {
        let tokenInfo = res.data;
        // 存储到本地
        tokenClient.setTokenInfo({
          tokenType: tokenInfo.token_type,
          expiresIn: tokenInfo.expires_in,
          scope: tokenInfo.scope
        }).then(resolve).catch(reject)
      }).catch(reject)
    })
  }
  // 基础方法
  async request(req: Axios.AxiosRequestConfig): Promise<any> {
    return this.axios(req)
  }
  async authRequest(req: Axios.AxiosRequestConfig): Promise<any> {
    return tokenClient.getTokenInfo().then((token: any) => {
      if (token && token.accessToken) {
        req.headers = {
          "Authorization": "Bearer " + token.accessToken
        }
        return this.axios(req)
        // 认证失败没有指定的错误码, 所以不能判断认证失败的情况, 所以不能在认证失败后跳转
      }
      return new Promise<any>((resolve, reject) => {
        reject(goAuthorizePage)
      })
    })
  }
}

export const client = new HTTPClient({ baseURL: baseURL })

// ----------------------- 结构体定义 --------------------------

export interface FetchTokenRequest {
  userID?: string
}
export interface FetchTokenResponse {
  data: {
    token_type: TokenType
    expires_in: number
    scope: string
  }
}

export interface FetchFileRequset {
  fid: string
}
export interface FetchFileResponse {
  data: {
    fid: string
    name: string
    content: string
  }
}

export interface UploadFileRequset {
  fid: string
  name: string
  content: string
}
export interface UploadFileResponse { }
