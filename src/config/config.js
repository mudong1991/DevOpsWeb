/* eslint-disable camelcase */

import {Message, MessageBox} from 'element-ui';
/**
 * 项目全局配置文件
 * Created by mudong on 2017/9/30 0030.
 */

export const routerChangeTime = 100; // 路由切换延迟时间

/**
 * 网站页面相关配置
 * */
export const title = '四方开发云'; // 页面标题
export const copyright = '东风残雪@版权所有';  // 页面版权

/**
 * 配置接口访问地址
 * */
export const rootPath = 'http://127.0.0.1:8810'; // 根据实际业务填写

export const successHandler = (res) => {
  let store = require('stores/store');
  let code = res.body.code;
  let status = res.body.status;
  let msg = res.body.message;
  switch (code) {
    case 10:
      if (status === 403) {
        clearLoginMsg();
        /* MessageBox.alert(msg, '错误提示', {
         confirmButtonText: '去登录',
         callback: () => {
         router.push('/');
         }
         }); */
        store.default.commit('xhrGoLogin');
      } else {
        MessageBox.alert(msg, '错误提示');
      }
      break;
    case 11:
      if (status === 403) {
        /* MessageBox.alert('您当前的会话已超时，请重新登录', '错误提示', {
         confirmButtonText: '去登录',
         callback: () => {
         this.$router.push('/login');
         }
         }); */
        store.default.commit('xhrGoLogin');
      }
      break;
    case 20:
      // Message.error(msg);
      break;
    case 30:
      router.push('/manage');
      // router.push(msg);
      break;
    case 200:
      msg && Message.success(msg);
      break;
    case 400:
      break;
    case 404:
      router.push('/404');
      break;
    case 500:
      router.push('/500');
      break;
    // default:
    //     Message.error('网络异常，请稍后再试~');
    //     break;
  }

  /**
   * 清除登录信息
   */
  function clearLoginMsg() {
    window.localStorage.clear();
  }

  window.clearLoginMsg = clearLoginMsg;
};

export const errHandler = (res) => {
  // 没网
  console.log(res);
  if (!res.body) {
     MessageBox.alert('请确认网络是否连通，否则会造成当前工作丢失', '掉线了？', {
     confirmButtonText: '好的，我知道了'
     });
     return false;
  }
};
