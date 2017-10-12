/**
 * Created by mudong on 2017/9/30 0030.
 */
import workbenchViewMap from './workbenchViewMap';

const routes = [
  {
    path: '/',
    name: 'index',
    component: resolve => {
      require(['@/views/index/index'], resolve);
    }
  },
  {
    path: '/index',
    component: resolve => {
      require(['@/views/index/index'], resolve);
    }
  },
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
