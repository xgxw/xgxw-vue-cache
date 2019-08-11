import { SelectItem } from '@/constants/command';

interface State {
  pageDataSet: SelectItem[]
};

const state: State = {
  pageDataSet: []
}

const getters = {
  getPageDataSet: (state: State): SelectItem[] => {
    return state.pageDataSet
  }
}

const actions = {
  async changePageDataSet({ commit }, pageDataSet: SelectItem[]): Promise<any> {
    return new Promise<any>((resolved, reject) => {
      commit("changePageDataSet", pageDataSet)
      resolved()
    })
  }
}

const mutations = {
  changePageDataSet(state: State, pageDataSet: SelectItem[]) {
    state.pageDataSet = pageDataSet;
    console.log("changePageDataSet: ", pageDataSet)
  }
}
export default ({
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
});
