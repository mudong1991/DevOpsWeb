/**
 * Created by mudong on 2017/9/30 0030.
 */

const routes = [
  {
    path: '/',
    name: 'home',
    component: resolve => {
      require(['@/views/main'], resolve);
    }
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => {
      require(['@/views/login'], resolve);
    }
  },
  {
    path: '*',
    name: '404',
    component: resolve => {
      require(['@/views/base/404'], resolve);
    }
  }
];

export default routes;
