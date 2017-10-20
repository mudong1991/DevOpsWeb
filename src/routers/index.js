/* eslint-disable no-global-assign */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/stores/store';
import routes from './map/index';
import webpackConfig from 'webpack_config/index';
import {routerChangeTime} from 'config/config';

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history',
  routes // （缩写）相当于 routes: routes
});

router.beforeEach((to, from, next) => {
  let toPath = to.path;
  let fromPath = from.path;
  if (webpackConfig.__DEV__) {
    console.log(`to: ${toPath} from: ${fromPath}`);
  }

  // 判断用户是否登录，没有登录重定向到登录页面（只过滤workench后台的路由）
  if (toPath.startsWith('/workbench') && toPath !== '/workbench/login' && toPath !== '/workbench/login/') {
    // 获取用户信息
    try {
      let userInfoStr = Vue.cookie.get('userInfo');
      if (userInfoStr === null) {
        router.push({name: 'wb_login'});
      } else {
        // 太快了反应不过来
        setTimeout(next, routerChangeTime);
      }
    } catch (e) {
      router.push({name: 'wb_login'});
    }
  } else {
    store.commit('addLoading', {
      key: 'view',
      text: '加载页面中...'
    });
    // 太快了反应不过来
    setTimeout(next, routerChangeTime);
  }
});

router.afterEach((to, from, next) => {
  if (webpackConfig.__DEV__) {
    console.log(`成功浏览到: ${to.path}`);
  }
  store.commit('removeLoading', 'view');
});

export default router;
