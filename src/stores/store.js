/**
 * Created by mudong on 2017/9/28 0028.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import loading from './modules/loading';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    loading,
    user
  }
});

export default store;
