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
  import {title} from 'config/config';
  import systemService from '@/services/systemService';
  import {MessageBox} from '@/utils/util';

  import header from 'components/index/header';

  export default {
    created () {
      document.title = title;

      // 获取用户信息
      this.getUserInfo();
    },
    data () {
      return {
        userInfo: null
      };
    },
    methods: {
      // 获取用户信息
      getUserInfo () {
        // 保持登录
        let keepLogin = window.localStorage.getItem('keepLogin') || null;

        let getUserInfoAction = () => {
          systemService.checkUserInfo({}, false, true).then(({data}) => {
            if (data.result_code === 0) {
              this.userInfo = data.result_data;
            } else {
              this.userInfo = null;
            }
          }, ({data}) => {
            this.userInfo = null;
          });
        };

        if (keepLogin === 'false') { // 没有保持登录，验证单点登录
          systemService.checkUserIsLogin({}, false, true).then(({data}) => {
            if (data.result_code === 1) {
              this.$cookie.delete('sessionid'); // 删除sessionid，重新登录
              window.localStorage.removeItem('keepLogin');
              MessageBox.alert('亲爱的用户，您已经在其他终端登录！', {'cancel': () => {
                this.$router.go(0);
              }}, () => {
                this.$router.go(0);
              });
            } else {
              getUserInfoAction();
            }
          }, ({data}) => { // 接口出错，删除keepLogin，获取用户信息
            window.localStorage.removeItem('keepLogin');
            getUserInfoAction();
          });
        } else {
          getUserInfoAction();
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
