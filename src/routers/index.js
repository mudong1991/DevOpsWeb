/* eslint-disable no-global-assign */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './converge';
import NProgress from 'nprogress';  // Progress 进度条
import 'nprogress/nprogress.css';  // Progress 进度条样式
import webpackConfig from 'webpack_config/index';
import {loginExpiresTime} from '@/config/config';

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

  NProgress.start();
  // store.commit('addLoading', {
  //   key: 'view',
  //   text: '加载页面中...'
  // });

  let sessionid = Vue.cookie.get('sessionid');
  let keepLogin = window.localStorage.getItem('keepLogin') || null;
  // 更新超时时间
  if (sessionid !== null && keepLogin === null) {
    Vue.cookie.set('sessionid', sessionid, {expires: loginExpiresTime});
  }
  // 是否锁屏
  let lockScreen = Vue.cookie.get('locking');

  // 判断用户是否登录，没有登录重定向到登录页面（只过滤workench后台的路由）
  if (toPath.startsWith('/workbench') && to.name !== 'wb_login') {
    // 获取用户信息
    try {
      if (sessionid === null) {
        next({
          replace: true,
          name: 'wb_login'
        });
      } else if ((lockScreen === '1' || lockScreen === 1) && to.name !== 'locking') {
        next({
          replace: true,
          name: 'locking'
        });
      } else {
        next();
      }
    } catch (e) {
      next({
        replace: true,
        name: 'wb_login'
      });
    }
   } else {
    next();
  }
});

router.afterEach((to, from, next) => {
  if (webpackConfig.__DEV__) {
    console.log(`成功浏览到: ${to.path}`);
  }

  NProgress.done();
  // store.commit('removeLoading', 'view');
});

export default router;
