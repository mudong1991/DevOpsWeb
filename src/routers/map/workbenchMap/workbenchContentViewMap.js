/**
 * Created by mudong on 2017/10/11 0011.
 */
import workbenchSystemViewMap from './workbenchSystemViewMap';
import workbenchMaintainViewMap from './workbenchMaintainViewMap';

export default [
  {
    path: '',
    name: 'wb_home',
    component: resolve => {
      require(['@/views/workbench/index/index'], resolve);
    }
  },
  {
    path: 'index',
    name: 'wb_index',
    component: resolve => {
      require(['@/views/workbench/index/index'], resolve);
    }
  },
  {
    path: 'project',
    name: 'wb_project',
    component: resolve => {
      require(['@/views/workbench/project/main'], resolve);
    }
  },
  {
    path: 'maintain',
    component: resolve => {
      require(['@/views/workbench/maintain/main'], resolve);
    },
    children: workbenchMaintainViewMap
  },
  {
    path: 'system',
    component: resolve => {
      require(['@/views/workbench/systemSettings/main'], resolve);
    },
    children: workbenchSystemViewMap
  }
];
