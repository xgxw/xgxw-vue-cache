export interface Article {
  fid: string,
  name: string,
  content: string,
}

interface State {
  fetching: boolean,
  data: Article,
};

const state: State = {
  fetching: true,
  data: {
    fid: "",
    name: "",
    content: "",
  }
}

const getters = {
  isFetching: (state: State): boolean => {
    return state.fetching
  },
  getContent: (state: State): string => {
    return state.data.content
  }
}

const actions = {

}

const mutations = {

}
export default ({
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
});
