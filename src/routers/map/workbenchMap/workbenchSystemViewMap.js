/**
 * Created by mudong on 2017/10/11 0011.
 */

export default [
  {
    path: '',
    name: 'wb_system',
    component: resolve => {
      require(['@/views/workbench/system/index'], resolve);
    }
  },
  {
    path: 'userAdmin',
    name: 'wb_userAdmin',
    component: resolve => {
      require(['@/views/workbench/system/userManage'], resolve);
    }
  },
  {
    path: 'permissionAdmin',
    name: 'wb_permissionAdmin',
    component: resolve => {
      require(['@/views/workbench/system/permissionManage'], resolve);
    }
  },
  {
    path: 'userLog',
    name: 'wb_userLog',
    component: resolve => {
      require(['@/views/workbench/system/userLog'], resolve);
    }
  }
];
