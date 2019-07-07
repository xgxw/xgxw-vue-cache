import { client, FetchFileRequset, UploadFileRequset } from '@/api';
import { RequestError, UnkownRequestError, UnauthorizedError, instanceOfRequestError } from '@/constants/error';

export interface Article {
  fid: string,
  name: string,
  content: string,
}

interface State {
  fetching: boolean,
  uploading: boolean,
  data: Article,
};

const defaultArticle: Article = {
  fid: "",
  name: "",
  content: "",
}
const state: State = {
  fetching: true,
  uploading: true,
  data: defaultArticle,
}

const getters = {
  isFetching: (state: State): boolean => {
    return state.fetching
  },
  isUploading: (state: State): boolean => {
    return state.uploading
  },
  getContent: (state: State): string => {
    return state.data.content
  }
}

const actions = {
  // fetchContent 初次进入时下载文件. 传入文件名称.
  async fetchContent({ commit }, fid: string): Promise<any> {
    commit("fetchingContent", fid)
    return new Promise<any>((resolved, reject) => {
      let article: Article = defaultArticle;
      client.fetchFile({ fid: fid }).then(res => {
        article = {
          fid: res.data.fid,
          name: res.data.name,
          content: res.data.content,
        }
        resolved()
      }).catch(e => {
        if (instanceOfRequestError(e)) {
          return reject(e)
        }
        console.log("请求服务器发生错误: ", e)
        reject(UnkownRequestError)
      }).finally(() => {
        commit("fetchingContentFinish", article)
      })
    })
  },
  // changeContent 更改vuex Content 内容. Editor.vue change事件触发
  async changeContent({ commit, state }, content: string): Promise<any> {
    return new Promise<any>((resolved, reject) => {
      if (state.data && (state.data.content == content)) {
        resolved()
      }
      commit("changeContent", content)
      resolved()
    })
  },
  // uploadContent 上传Content. Editor.vue save事件触发
  async uploadContent({ commit, state }, content: string): Promise<any> {
    commit("uploadContent", content)
    return new Promise<any>((resolved, reject) => {
      let r: UploadFileRequset = {
        fid: state.data.fid,
        name: state.data.name,
        content: content,
      }
      client.uploadFile(r).then(res => {
        resolved()
      }).catch(e => {
        if (instanceOfRequestError(e)) {
          return reject(e)
        }
        console.log("请求服务器发生错误: ", e)
        reject(UnkownRequestError)
      }).finally(() => {
        commit("uploadContentFinish")
      })
    })
  }
}

const mutations = {
  fetchingContent(state: State, fid: string) {
    state.fetching = true
    state.data.fid = fid
    console.log("fetchingContent: ", fid)
  },
  fetchingContentFinish(state: State, article: Article) {
    state.fetching = false
    state.data = article
    console.log("fetchingContentFinish: ", article)
  },
  changeContent(state: State, content: string) {
    state.data.content = content
    console.log("changeContent: ", content)
  },
  uploadContent(state: State, content: string) {
    state.uploading = true
    state.data.content = content
    console.log("uploadContent: ", content)
  },
  uploadContentFinish(state: State) {
    state.uploading = false
    console.log("uploadContentFinish.")
  }
}
export default ({
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
});
