/**
 * Created by mudong on 2017/9/30 0030.
 */

const routes = [
  {
    path: '',
    component: resolve => {
      require(['@/views/index/index'], resolve);
    }
  },
  {
    path: 'index',
    name: 'index',
    component: resolve => {
      require(['@/views/index/index'], resolve);
    }
  }
];

export default routes;
