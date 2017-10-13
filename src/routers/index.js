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
  store.commit('addLoading', {
    key: 'view',
    text: '加载页面中...'
  });

  // 太快了反应不过来
  setTimeout(next, routerChangeTime);
});

router.afterEach((to, from, next) => {
  if (webpackConfig.__DEV__) {
    console.log(`成功浏览到: ${to.path}`);
  }
  store.commit('removeLoading', 'view');
});

export default router;
