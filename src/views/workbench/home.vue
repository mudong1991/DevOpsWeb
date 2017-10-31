<template>
  <div id="home-app">
    <v-workbench-header :userInfoObj="userInfoObj"></v-workbench-header>

    <el-container>
      <el-header>
        123
      </el-header>
      <el-container>
        <!--子路由视图显示区-->
        <transition :name="transitionName">
          <router-view></router-view>
        </transition>
      </el-container>
    </el-container>

  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  import systemService from 'services/systemService';
  import router from '@/routers/index';
  import {MessageBox} from '@/utils/util';
  import {userNoOperationLogout} from '@/config/config';
  import workbenchHeader from '@/components/workbench/header.vue';

  export default {
    data () {
      return {
        transitionName: 'el-fade-in-linear',
        userInfoObj: null
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
              this.userInfoObj = data.result_data;
            } else {
              this.userInfoObj = null;
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
    created () {
      // 网页标题
      document.title = title;

      // 获取用户信息
      this.getUserInfo();

      // 定时检测用户信息，如果获取失败，则表示登录失效，提示重新登录。
      if (userNoOperationLogout) {
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
    overflow: hidden;
    background: transparent url("/static/images/workbench-bg.jpg") center center;
  }
  .el-container{
    height: 100%;
  }
  .el-header{
    height: 32px !important;
    line-height: 32px;
  }
</style>
