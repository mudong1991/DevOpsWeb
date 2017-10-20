<template>
  <div id="home-app" @click="updateUserInfo()">
    213123
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
//  import systemService from 'services/systemService';
  import Vue from 'vue';
  import router from '@/routers/index';
  import {MessageBox} from '@/utils/util';
  import {userNoOperationLogout, loginExpiresTime} from '@/config/config';

  export default {
    data () {
      return {};
    },
    methods: {
      // 界面有点击，表示用户活跃，更新用户信息
      updateUserInfo() {
        let userInfoStr = this.$cookie.get('userInfo');
        if (userInfoStr !== null) {
          try {
            this.$cookie.set('userInfo', userInfoStr, {expires: loginExpiresTime});
          } catch (e) {}
        }
      }
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
            MessageBox.alert('亲爱的用户，由于您长时间未操作，为了账户的安全请重新登录！',
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
        this.checkUserInfoT = setInterval(checkUserInfo, 5000);
      }
    },
    destroyed() {
      // 清除定时器
       clearInterval(this.checkUserInfoT);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #home-app{
    height: 100%;
  }
</style>
