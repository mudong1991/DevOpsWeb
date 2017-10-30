/**
 * Created by mudong on 2017/10/11 0011.
 */

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
    path: 'system',
    name: 'wb_system',
    component: resolve => {
      require(['@/views/workbench/system/main'], resolve);
    }
  }
];