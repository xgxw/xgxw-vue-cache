import Vue from 'vue';
import Vuex from 'vuex';
import file from './file'
import catalog from './catalog'
import article from './article'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    file,
    catalog,
    article
  },
});