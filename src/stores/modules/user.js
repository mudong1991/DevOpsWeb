/**
 * Created by mudong on 2017/10/10 0010.
 */
// import router from 'router/index';

export default {
  state: {
    info: {},
    keepLogin: false
  },
  getters: {

  },
  mutations: {
      setUserInfo(state, userInfo) {
        state.info = userInfo;  // 给状态信息重新赋值
      },
      setKeepLogin(state, status) {
        state.keepLogin = status;
        window.localStorage.setItem('keepLogin', state.keepLogin);
      }
  },
  actions: {

  }
};
