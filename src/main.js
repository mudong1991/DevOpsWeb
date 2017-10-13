import Vue from 'vue';
import ElementUI from 'element-ui';
import VueResource from 'vue-resource';
import 'element-ui/lib/theme-default/index.css';
import config from 'webpack_config/index';

// 引入全局css和js
import 'bootstrap/js/bootstrap.min.js';
import 'bootstrap/css/bootstrap.min.css';
import 'static/css/bootstrap-touch-slider.css';
import 'static/css/font-awesome.min.css';
import 'static/css/base.css';

// 导入组件
import './components/registerGlobalComponents';

// 路由vue-router
import router from './routers/index';
// 状态管理Vux
import store from './stores/store';
// 视图
import App from './App.vue';

Vue.use(ElementUI);
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#vue-app');

if (config.__DEV__) {
  console.info('[当前环境] 开发环境');
  Vue.config.devtools = true;
  Vue.config.productionTip = false;
}

if (config.__PROD__) {
  console.info('[当前环境] 生产环境');
  Vue.config.devtools = false;
}
