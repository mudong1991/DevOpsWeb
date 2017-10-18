/**
 * Created by mudong on //.
 */

import Vue from 'vue';
import util from '@/utils/util';
import store from '@/stores/store';
import {rootPath, errHandler, successHandler} from '@/config/config';

Vue.axios.defaults.headers.common['Content-Type'] = 'application/json';
Vue.axios.defaults.headers.common['Accept'] = 'application/json';
Vue.axios.defaults.withCredentials = true;
Vue.axios.defaults.timeout = 5000;

/**
 *  XMLHttpRequest
 * @param url
 * @param data get|post 传入的数据
 * @param method get|post
 * @param root 自定义域名，如果没有默认从 src/config/config.js > rootPath 获取
 * @param customOptions 自定义请求设置
 * @param diyError 自定义错误显示方式，目前根据实际业务存放有部分拦截代码
 * @param diyLoading 自定义loading方式，禁用默认loading
 * @return {Promise}
 */
export default ({url, method = 'get', data = {}, root, customOptions = {}, diyError = false, diyLoading = false}) => {
  // 处理url，末尾加/
  if (!url.endsWith('/')) {
    url += '/';
  }
  if (!root) {
    url = rootPath + url;
  } else {
    url = root + url;
  }
  return new Promise((resolve, reject) => {
    if (!diyLoading) {
      store.commit('addLoading', {
        key: 'http'
      });
    }
    if (method.toUpperCase() === 'GET') {
      url += ('?' + util.parseParam(data));
      data = {};
    } else {
      if (data.page || data.page_size) {
        url += ('?' + util.parseParam({
          page: data.page,
          page_size: data.page_size
        }));
      }
    }
    // axiso发出请求
    console.log(method);
    Vue.axios({
      url: url,
      method: method,
      data: data
    }).then((response) => {
      if (!diyLoading) {
        store.commit('removeLoading', 'http');
      }
      if (response.body.code === 200) {
        resolve(response);
      } else {
        reject(response);
      }

      if (!diyError) {
        successHandler(response);
      }
    }, (response) => {
      if (!diyLoading) {
        store.commit('removeLoading', 'http');
      }
      reject(response);
      if (!diyError) {
        errHandler(response);
      }
    });
  });
};
