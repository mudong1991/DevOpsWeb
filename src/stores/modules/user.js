/**
 * Created by mudong on 2017/10/10 0010.
 */
// import router from 'router/index';

export default {
  state: {
    info: {}
  },
  getters: {

  },
  mutations: {
      setUserInfo(state, userInfo) {
        state.info = userInfo;  // 给状态信息重新赋值
      }
  },
  actions: {

  }
};
