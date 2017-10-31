/**
 * Created by mudong on 2017/10/11 0011.
 */

export default [
  {
    path: '',
    name: 'wb_system',
    component: resolve => {
      require(['@/views/workbench/system/userManage'], resolve);
    }
  }
];
