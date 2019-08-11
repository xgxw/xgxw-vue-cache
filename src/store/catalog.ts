import { client, FetchCatalogRequset } from '@/api';
import { instanceOfRequestError, UnkownRequestError } from '@/constants/error';

interface State {
  expand: boolean,
  data: {
    catalog: {},
  }
};

const state: State = {
  expand: false,
  data: {
    catalog: {}
  }
}

const getters = {
  isExpand: (state: State): boolean => {
    return state.expand
  },
  getCatalog: (state: State): {} => {
    return state.data.catalog
  }
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
      let catalog = {}
      client.fetchCatalog(r).then(res => {
        catalog = res.data
        resolved()
      }).catch(e => {
        if (instanceOfRequestError(e)) {
          return reject(e)
        }
        console.log("请求服务器发生错误: ", e)
        reject(UnkownRequestError)
      }).finally(() => {
        commit("fetchCatalogFinish", catalog)
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
  fetchCatalogFinish(state: State, catalog: {}) {
    state.data.catalog = catalog;
    console.log("getCatalogFinish: ", catalog)
  }
}
export default ({
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
});
