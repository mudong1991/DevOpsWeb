<template>
  <div id="home-app">
    <v-workbench-header :userInfoObj="userInfoObj"></v-workbench-header>

    <!--子路由视图显示区-->
    <transition :name="transitionName">
      <router-view ></router-view>
    </transition>
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
        transitionName: 'el-zoom-in-top',
        userInfoObj: null
      };
    },
    methods: {
      // 获取用户信息
      getUserInfo () {
        let userId = window.localStorage.getItem('userId');
        let userSession = window.localStorage.getItem('userSession');

        if (userSession !== null) {
          systemService.getUserInfoBySession({session_id: userSession}, false, true).then(({data}) => {
            if (data.result_code === 0) {
              this.userInfoObj = data.result_data;
              this.$store.commit('setUserInfo', this.userInfoObj);
            } else {  // 登录的session失效，删除session
              MessageBox.alert('亲爱的用户，您已经在其他终端登录！', {'cancel': () => {
                window.localStorage.removeItem('userSession');
                this.$router.go(0);
              }}, () => {
                window.localStorage.removeItem('userSession');
                this.$router.go(0);
              });
            }
          });
        } else if (userId !== null) {
          systemService.getUserInfoById({user_id: userId}, false, true).then(({data}) => {
            if (data.result_code === 0) {
              this.userInfoObj = data.result_data;
              this.$store.commit('setUserInfo', this.userInfoObj);
            } else {
              MessageBox.alert('查询用户信息失败！', {'cancel': () => {
                window.localStorage.removeItem('userId');
                this.$router.go(0);
              }}, () => {
                window.localStorage.removeItem('userId');
                this.$router.go(0);
              });
            }
          });
        } else {
          this.userInfoObj = null;
          this.$store.commit('setUserInfo', null);
        }
      }
    },
    created () {
      // 网页标题
      document.title = title;

      // 定时检测用户信息，如果获取失败，则表示登录失效，提示重新登录。
      if (userNoOperationLogout) {
        let checkUserInfo = () => {
          let userTimeOut = window.localStorage.getItem('userTimeOut');
          if (userTimeOut !== null && (parseInt(new Date().getTime()) > parseInt(userTimeOut))) {
            clearInterval(this.checkUserInfoT);  // 停止定时器
            window.localStorage.removeItem('userId');
            window.localStorage.removeItem('userSession');
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

      // 获取用户信息
      this.getUserInfo();
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
    padding-top: 60px;
    background: transparent url("/static/images/workbench-bg.jpg") center center;
  }
</style>
