import Vue from 'vue';
import Vuex from 'vuex';
import menu from './menu'
import article from './article'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    menu,
    article
  },
});