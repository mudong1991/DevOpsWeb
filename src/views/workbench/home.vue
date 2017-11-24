<template>
  <div id="home-app" class="clearfix">
    <el-container >
      <el-header class="padding-0">
        <v-workbench-header :userInfoObj="userInfoObj"></v-workbench-header>
      </el-header>
      <el-main class="padding-0">
        <!--子路由视图显示区-->
        <transition :name="transitionName">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  import baseService from 'services/baseService';
  import router from '@/routers/index';
  import {MessageBox} from '@/utils/util';
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
      getUserInfo (callBack) {
        baseService.checkUserInfo({}, false, true).then(({data}) => {
          if (data.result_code === 0) {
            this.userInfoObj = data.result_data;
            // 保存用户头像到localStorage
            window.localStorage.setItem('avatorImgPath', this.userInfoObj.avatar);
          } else {
            this.userInfoObj = null;
            this.$cookie.delete('sessionid'); // 删除sessionid，重新登录
            window.localStorage.removeItem('avatorImgPath');
          }
          callBack();  //  定时检测用户信息，如果获取失败，则表示登录失效，提示重新登录。
        }, ({data}) => {
          this.userInfoObj = null;
          this.$cookie.delete('sessionid'); // 删除sessionid，重新登录
          window.localStorage.removeItem('avatorImgPath');
        });
      },

      // 检测用户sessionid信息。
      checkSessinId () {
        if (this.userInfoObj !== null) {
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
    created () {
      // 网页标题
      document.title = title;

      // 获取用户信息
      this.getUserInfo(this.checkSessinId);
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
    position: relative;
    overflow: auto;
    background: transparent url("/static/images/workbench-bg.jpg") center center;
  }
  .el-container{
    height: 100%;
  }
  .el-header{
    height: auto !important;
  }
  .el-main{
    height: 100% !important;
  }
</style>
