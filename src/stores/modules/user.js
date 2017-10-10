/**
 * Created by mudong on 2017/10/10 0010.
 */
// import router from 'router/index';

export default {
  state: {
    userInfo: {}
  },
  getters: {

  },
  mutations: {
      getUserInfo(state) {
        return state.userInfo;
      },
      setUserInfo(state, userInfo) {
        state.userInfo = userInfo;  // 给状态信息重新赋值
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo)); // 在localStorage中拿用户信息
      }
  },
  actions: {

  }
};
