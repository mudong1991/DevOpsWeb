/**
 * Created by mudong on 2017/9/30 0030.
 */
import workbenchViewMap from './map/workbenchViewMap';
import indexViewMap from './map/indexViewMap';
import modelViewMap from './modelMap/modelViewMap';

const routes = [
  // 首页相关路由
  {
    path: '/',
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
  // 弹出框相关路由
  {
    path: '/model',
    component: resolve => {
      require(['@/views/model/main'], resolve);
    },
    children: modelViewMap
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
