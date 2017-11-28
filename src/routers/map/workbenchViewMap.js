/**
 * Created by mudong on 2017/10/11 0011.
 */
import workbenchContentViewMap from './workbenchMap/workbenchContentViewMap';

export default [
  {
    path: '',
    component: resolve => {
      require(['@/views/workbench/home'], resolve);
    },
    children: workbenchContentViewMap
  },
  {
    path: 'login',
    name: 'wb_login',
    component: resolve => {
      require(['@/views/workbench/login'], resolve);
    }
  },
  {
    path: 'locking',
    name: 'locking',
    component: resolve => {
      require(['@/components/workbench/lockscreen/locking-page.vue'], resolve);
    }
  }
];
