import { client, FetchCatalogRequset } from '@/api';
import { instanceOfRequestError, UnkownRequestError } from '@/constants/error';

interface State {
  expand: boolean,
  data: {
    catalog: {},
    paths: string[]
  }
};

const state: State = {
  expand: false,
  data: {
    catalog: {},
    paths: []
  }
}

const getters = {
  isExpand: (state: State): boolean => {
    return state.expand
  },
  getCatalog: (state: State): {} => {
    return state.data.catalog
  },
  getPaths: (state: State): string[] => {
    return state.data.paths
  }
}

interface FetchCatalogData {
  catalog: {},
  paths: string[]
}

const actions = {
  // toggleExpand 切换 catalog 显示状态
  async toggleExpand({ commit, state }): Promise<any> {
    return new Promise<any>((resolved, reject) => {
      commit("toggleExpand", !state.expand)
      resolved()
    })
  },
  async fetchCatalog({ commit }): Promise<any> {
    commit("fetchCatalog")
    return new Promise<any>((resolved, reject) => {
      let r: FetchCatalogRequset = {}
      let data: FetchCatalogData = {
        catalog: {},
        paths: []
      }

      client.fetchCatalog(r).then(res => {
        data.catalog = res.data.catalog
        data.paths = res.data.paths
        resolved()
      }).catch(e => {
        if (instanceOfRequestError(e)) {
          return reject(e)
        }
        console.log("请求服务器发生错误: ", e)
        reject(UnkownRequestError)
      }).finally(() => {
        commit("fetchCatalogFinish", data)
      })
    })
  },
}

const mutations = {
  toggleExpand(state: State, expand: boolean) {
    state.expand = expand;
    console.log("toggleExpand: ", expand)
  },
  fetchCatalog(state: State) {
    console.log("fetchCatalog")
  },
  fetchCatalogFinish(state: State, data: FetchCatalogData) {
    state.data.catalog = data.catalog;
    state.data.paths = data.paths
    console.log("getCatalogFinish: ", data.catalog, data.paths)
  }
}
export default ({
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
});
