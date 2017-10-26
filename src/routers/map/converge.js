/**
 * Created by mudong on 2017/9/30 0030.
 */
import workbenchViewMap from './workbenchViewMap';
import indexViewMap from './indexViewMap';

const routes = [
  {
    path: '/',
    name: 'index',
    component: resolve => {
      require(['@/views/index/index'], resolve);
    }
  },
  // 首页相关路由
  {
    path: '/index',
    component: resolve => {
      require(['@/views/index/main'], resolve);
    },
    children: indexViewMap
  },
  // 工作台相关路由
  {
    path: '/workbench',
    component: resolve => {
      require(['@/views/workbench/main'], resolve);
    },
    children: workbenchViewMap
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
