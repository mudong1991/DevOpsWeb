<template>
  <div id="home-app">
    <v-workbench-header></v-workbench-header>
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
//  import systemService from 'services/systemService';
  import Vue from 'vue';
  import router from '@/routers/index';
  import {MessageBox} from '@/utils/util';
  import {userNoOperationLogout} from '@/config/config';
  import workbenchHeader from '@/components/workbench/header.vue';

  export default {
    data () {
      return {};
    },
    methods: {
    },
    created () {
      // 网页标题
      document.title = title;
      // 定时检测用户信息，如果获取失败，则表示登录失效，提示重新登录。
      if (userNoOperationLogout) {
        let checkUserInfo = () => {
          let userInfoStr = Vue.cookie.get('userInfo');
          if (userInfoStr === null) {
            clearInterval(this.checkUserInfoT);  // 停止定时器
            MessageBox.alert('亲爱的用户，由于您的登录凭证已过期，为了账户的安全请重新登录！',
              {
                title: '登录失效',
                icon: 5,
                cancel: () => {
                  router.push({name: 'wb_login'});
                }
              }, () => {
                router.push({name: 'wb_login'});
                MessageBox.closeAll();
              });
          }
        };
        checkUserInfo();
        this.checkUserInfoT = setInterval(checkUserInfo, 5000);
      }
    },
    destroyed() {
      // 清除定时器
       clearInterval(this.checkUserInfoT);
    },
    components: {
      vWorkbenchHeader: workbenchHeader
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #home-app{
    height: 100%;
  }
</style>
