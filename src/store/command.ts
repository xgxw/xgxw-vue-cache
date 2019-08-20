import { client, FetchCatalogRequset } from '@/api';
import { instanceOfRequestError, UnkownRequestError } from '@/constants/error';
import { SelectItem } from '@/constants/command';

interface State {
  data: {
    catalog: string,
    paths: string[],
    pageDataSet: SelectItem[]
  }
};

const state: State = {
  data: {
    catalog: "",
    paths: [],
    pageDataSet: []
  }
}

const getters = {
  getPageDataSet: (state: State): SelectItem[] => {
    return state.data.pageDataSet
  },
  getCatalog: (state: State): string => {
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
  async changePageDataSet({ commit }, pageDataSet: SelectItem[]): Promise<any> {
    return new Promise<any>((resolved, reject) => {
      commit("changePageDataSet", pageDataSet)
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
  changePageDataSet(state: State, pageDataSet: SelectItem[]) {
    state.data.pageDataSet = pageDataSet;
    console.log("changePageDataSet: ", pageDataSet)
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
