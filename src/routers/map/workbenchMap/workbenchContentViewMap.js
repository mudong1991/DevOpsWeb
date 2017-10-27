/**
 * Created by mudong on 2017/10/11 0011.
 */

export default [
  {
    path: '',
    component: resolve => {
      require(['@/views/workbench/index'], resolve);
    }
  },
  {
    path: 'index',
    name: 'wb_index',
    component: resolve => {
      require(['@/views/workbench/index'], resolve);
    }
  }
];
