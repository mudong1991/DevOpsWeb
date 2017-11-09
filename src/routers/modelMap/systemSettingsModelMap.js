/**
 * 系统设置弹窗路由
 * Created by mudong on 2017/11/9 0009.
 */

export default [
  {
    path: 'addUser',
    name: 'addUser',
    component: resolve => {
      require(['@/views/model/systemSettings/addUser'], resolve);
    }
  }
];
