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

      };
    },
    methods: {
      // 获取用户信息
      getUserInfo () {
          // 保持登录
          let keepLogin = window.localStorage.getItem('keepLogin') || null;
          let sessionid =
          systemService.checkUserInfo({}, false, true).then(({data}) => {
            if (data.result_code === 0) {
              this.userInfo = data.result_data;
            } else {
              MessageBox.alert('亲爱的用户，您已经在其他终端登录！', {'cancel': () => {
                this.$router.go(0);
              }}, () => {
                this.$router.go(0);
              });
            }
          });
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
