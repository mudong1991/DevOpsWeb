<template>
  <div id="index-app">
    <!--顶部导航开始-->
    <v-header id="v-header" :userInfo="userInfo"></v-header>
    <!--顶部导航结束-->

    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {title, indexSessionExpiresAutoCheck} from 'config/config';
  import baseService from 'services/baseService';
  import {MessageBox} from '@/utils/util';
  import router from '@/routers/index';
  import header from 'components/index/header';

  export default {
    created () {
      document.title = title;

      // 获取用户信息
      this.getUserInfo(this.checkSessinId);
    },
    data () {
      return {
        userInfo: null
      };
    },
    methods: {
      // 获取用户信息
      getUserInfo (callBack) {
        baseService.checkUserInfo({}, true, true).then(({data}) => {
          if (data.result_code === 0) {
            this.userInfo = data.result_data;
          } else {
            this.userInfo = null;
            this.$cookie.delete('sessionid');
          }
          callBack(); //  定时检测用户信息，如果获取失败，则表示登录失效，提示重新登录。
        }, ({data}) => {
          this.userInfo = null;
          this.$cookie.delete('sessionid');
        });
      },

      // 检测用户sessionid信息。
      checkSessinId () {
        let keepLogin = window.localStorage.getItem('keepLogin') || null;

        if (keepLogin === null && this.userInfo !== null && indexSessionExpiresAutoCheck === true) {
          let checkUserInfo = () => {
            let sessionid = this.$cookie.get('sessionid');
            if (sessionid === null) {
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

          // 清除定时器
          clearInterval(this.checkUserInfoT);
          checkUserInfo();
          this.checkUserInfoT = setInterval(checkUserInfo, 5000);
        }
      }
    },
    components: {
      vHeader: header
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #index-app{
    height: 100%;
  }
</style>
