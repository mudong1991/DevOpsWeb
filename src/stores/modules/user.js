/**
 * Created by mudong on 2017/10/10 0010.
 */

export default {
  state: {
    info: null
  },
  getters: {

  },
  mutations: {
      setUserInfo(state, userInfo) {
        state.info = userInfo;  // 给状态信息重新赋值
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
      }
  },
  actions: {

  }
};
