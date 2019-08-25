import * as Axios from 'axios'
import { client as tokenClient, TokenInfo } from './token'
import { UnauthorizedError, NotFoundError, InvalidTokenError } from '@/constants/error';

const baseURL = process.env.VUE_APP_BASE_URL

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
          return data;
        },
      ],
      ...requsetConfig,
    })
  }

  async fetchFile(r: FetchFileRequset): Promise<FetchFileResponse> {
    return this.requestAttachToken({
      url: 'v1/file/' + r.fid,
      method: "GET",
    })
  }
  async createFile(r: CreateFileRequset): Promise<CreateFileResponse> {
    return this.requestWithToken({
      url: 'v1/file/' + r.fid,
      method: "POST",
      data: {
        ...r
      }
    })
  }
  async uploadFile(r: UploadFileRequset): Promise<UploadFileResponse> {
    return this.requestWithToken({
      url: 'v1/file/' + r.fid,
      method: "PUT",
      data: {
        ...r
      }
    })
  }
  async delFile(r: DelFileRequset): Promise<DelFileResponse> {
    return this.requestWithToken({
      url: 'v1/file/' + r.fid,
      method: "DELETE",
    })
  }
  async delFiles(r: DelFilesRequset): Promise<DelFilesResponse> {
    return this.requestWithToken({
      url: 'v1/file',
      method: "DELETE",
      data: {
        ...r
      }
    })
  }
  async fetchCatalog(r: FetchCatalogRequset): Promise<FetchCatalogResponse> {
    return tokenClient.getTokenInfo().then((token: TokenInfo) => {
      return this.requestWithToken({
        url: 'v1/catalog' + r.path + '?options=1',
        method: "GET",
      })
    }).catch(e => {
      return this.request({
        url: 'v1/catalog/public' + r.path + '?options=1',
        method: "GET",
      })
    })
  }

  // ------------------------- Token相关 -------------------------------
  async fetchToken(r: FetchTokenRequest): Promise<FetchTokenResponse> {
    return this.request({
      url: "v1/auth/token",
      method: "POST",
      data: {
        ...r
      }
    })
  }
  // authorization 认证请求
  async authorization(r: FetchTokenRequest): Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {
      this.fetchToken(r).then(res => {
        let tokenInfo = res.data;
        // 存储到本地
        tokenClient.setTokenInfo({
          token: tokenInfo.token,
          expiresAt: tokenInfo.expires_at,
        }).then(resolve).catch(reject)
      }).catch(reject)
    })
  }

  // -------------------------- 基础方法 -------------------------------
  // 基础请求, 无需token
  async request(req: Axios.AxiosRequestConfig): Promise<any> {
    return new Promise<any>((resolved, reject) => {
      this.axios(req).then(resolved).catch(e => {
        if (e.response) {
          switch (e.response.status) {
            case 403:
              return tokenClient.getTokenInfo().then(res => {
                reject(InvalidTokenError)
              }).catch(e => {
                reject(UnauthorizedError)
              })
            case 404:
              return reject(NotFoundError)
            default:
              return reject(e)
          }
        } else if (e.request) {
          return reject(NotFoundError)
        } else {
          return reject(e)
        }
      })
    })
  }
  // 必须有token才可以
  async requestWithToken(req: Axios.AxiosRequestConfig): Promise<any> {
    return tokenClient.getTokenInfo().then((token: TokenInfo) => {
      req.headers = {
        "Authorization": token.token
      }
      return this.request(req)
    }).catch(e => {
      return new Promise<any>((resolve, reject) => {
        reject(UnauthorizedError)
      })
    })
  }
  // 当有 token 时带token, 没有时不带token的请求
  async requestAttachToken(req: Axios.AxiosRequestConfig): Promise<any> {
    return tokenClient.getTokenInfo().then((token: TokenInfo) => {
      return this.requestWithToken(req)
    }).catch(e => {
      return this.request(req)
    })
  }
}

export const client = new HTTPClient({ baseURL: baseURL })

// ----------------------- 结构体定义 --------------------------

export interface FetchTokenRequest {
  cipher: string
}
export interface FetchTokenResponse {
  data: {
    token: string
    expires_at: number
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

export type CreateFileRequset = UploadFileRequset
export type CreateFileResponse = UploadFileResponse

export interface DelFileRequset {
  fid: string
}
export interface DelFileResponse { }

export interface DelFilesRequset {
  fids: string[]
}
export interface DelFilesResponse { }

export interface FetchCatalogRequset {
  path: string
}
export interface FetchCatalogResponse {
  data: {
    catalog: string,
    paths: string[]
  }
}