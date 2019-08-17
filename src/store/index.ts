import Vue from 'vue';
import Vuex from 'vuex';
import file from './file'
import command from './command'
import article from './article'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    file,
    article,
    command
  },
});