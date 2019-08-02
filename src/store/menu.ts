import { client } from '@/api';

interface State {
  expand: boolean,
};

const state: State = {
  expand: false,
}

const getters = {
  isExpand: (state: State): boolean => {
    return state.expand
  }
}

const actions = {
  // toggleExpand 切换 menu 显示状态
  async toggleExpand({ commit, state }): Promise<any> {
    return new Promise<any>((resolved, reject) => {
      commit("toggleExpand", !state.expand)
      resolved()
    })
  },
}

const mutations = {
  toggleExpand(state: State, expand: boolean) {
    state.expand = expand;
    console.log("toggleExpand: ", expand)
  }
}
export default ({
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
});
