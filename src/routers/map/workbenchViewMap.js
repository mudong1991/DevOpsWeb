/**
 * Created by mudong on 2017/10/11 0011.
 */

export default [
  {
    path: '',
    name: 'wb_home',
    component: resolve => {
      require(['@/views/workbench/home'], resolve);
    }
  },
  {
    path: 'login',
    name: 'wb_login',
    component: resolve => {
      require(['@/views/workbench/login'], resolve);
    }
  }
];
