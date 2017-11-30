/* eslint-disable no-unused-vars */
import Vue from 'vue';
import ElementUI from 'element-ui';
import axios from 'axios';
import VueAxios from 'vue-axios';   //  axios请求插件
import VueCookie from 'vue-cookie';   // cookie插件
import Vuebar from 'vuebar';  // 滚动条优化插件
import '../theme/index.css';
import config from 'webpack_config/index';

// 引入全局js
import 'bootstrap/js/bootstrap.min.js';  // bootstrap

// 引入全局css
import 'bootstrap/css/bootstrap.min.css';  // bootstrap 组件
import 'static/css/animate.css';
import 'static/css/animate-element.css';
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
Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(Vuebar);

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
