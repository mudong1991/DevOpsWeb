/**
 * Created by mudong on //.
 */

import Vue from 'vue';
import util from '@/utils/util';
import store from '@/stores/store';
import {rootPath, errHandler} from '@/config/config';

Vue.axios.defaults.headers.common['Content-Type'] = 'application/json';
Vue.axios.defaults.headers.common['Accept'] = 'application/json';
Vue.axios.defaults.withCredentials = true;  // 带上cookie中的信息
Vue.axios.defaults.timeout = 5000;

/**
 *  XMLHttpRequest
 * @param url
 * @param data get|post 传入的数据
 * @param method get|post
 * @param root 自定义域名，如果没有默认从 src/config/config.js > rootPath 获取
 * @param extraParams 自定义请求参数
 * @param diyError 自定义错误显示方式，目前根据实际业务存放有部分拦截代码
 * @param diyLoading 自定义loading方式，禁用默认loading
 * @return {Promise}
 */
export default ({url, method = 'get', data = {}, root, extraParams = {}, diyError = false, diyLoading = false}) => {
  // 处理url，末尾加/
  if (!url.endsWith('/') && url) {
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
      if (Object.keys(data).length !== 0) {
        url += ('?' + util.parseParam(data));
        data = {};
      }
    } else {
      if (data.page || data.page_size) {
        url += ('?' + util.parseParam({
          page: data.page,
          page_size: data.page_size
        }));
      }
    }

    // axiso发出请求
    Vue.axios(Object.assign(
      {
        url: url,
        method: method,
        data: data,
        headers: {'sessionid': Vue.cookie.get('sessionid'),
                  'X-CSRFToken': Vue.cookie.get('csrftoken')}
      },
      extraParams
    )).then((response) => { // 正常
      if (!diyLoading) {
        store.commit('removeLoading', 'http');
      }
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(response);
      }
    }).catch((response) => { // 捕获异常
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
