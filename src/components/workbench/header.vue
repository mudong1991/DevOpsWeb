<template>
  <div id="workbench-header" class="clearfix">
    <div class="col-xs-12 col-sm-12 col-md-2 w-logo clearfix" >
      <router-link :to="{name: 'index'}" class="pull-left">
        <img src="/static/images/logo.png" class="img-responsive" />
      </router-link>

      <div class="sm-menu pull-right visible-xs visible-sm" @click="showHeaderMenu = !showHeaderMenu">
        <i class="fa fa-bars"></i>
      </div>
    </div>

    <div v-show="showHeaderMenu" id="header-menu" class="animated fadeInDown clearfix">
      <div class="col-xs-12 col-sm-12 col-md-6" style="z-index: 100">
        <el-menu
          :default-active="defaultMenu"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#324157"
          text-color="#fff"
          active-text-color="#20A0FF" >
          <el-menu-item index="wb_index" @click="goPage('wb_index')">首页</el-menu-item>
          <el-menu-item index="wb_project" @click="goPage('wb_project')">项目</el-menu-item>
          <el-menu-item index="3">待办</el-menu-item>
          <el-submenu index="4" id="el-submenu" >
            <template slot="title">服务</template>
            <el-menu-item index="2-1" >选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="5"><a href="https://www.ele.me" target="_blank">代码广场</a></el-menu-item>
          <el-menu-item index="6"><a href="https://www.ele.me" target="_blank">自动化运维</a></el-menu-item>
          <el-menu-item index="wb_system" @click="goPage('wb_system')">系统设置</el-menu-item>
        </el-menu>
      </div>

      <div class="col-xs-12 col-sm-12 col-md-4 tools clearfix">
          <ul>
            <li class="tools-item tools-alert">
              <a><i class="fa fa-bell-o"></i>提醒  <span class="badge">50</span></a>
            </li>
            <li class="tools-item tools-message">
              <a><i class="fa fa-comment-o"></i>消息  <span class="badge">50</span></a>
            </li>
            <li class="tools-item">
              <a  @click="fullScreen()" v-if="!isFullScreen"><i class="fa fa-arrows-alt"></i><span >开启全屏</span></a>
              <a  @click="exitFullScreen()" v-if="isFullScreen"><i class="fa fa-arrows-alt"></i><span >退出全屏</span></a>
            </li>
            <li class="user-options tools-item" v-if="userInfoObj !== null">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link clearfix">
                   <span class="user-info">
                     <img class="img-responsive img-circle avatar" src="/static/images/user01.png"/>
                      {{ userInfoObj.username !== undefined ? userInfoObj.username : '' }}
                   </span><i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>设置</el-dropdown-item>
                  <el-dropdown-item divided command="logout"><i class="fa fa-power-off"></i>  退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  import {MessageBox} from '@/utils/util';
  import systemService from '@/services/systemService';

  export default {
    props: {
      userInfoObj: {
        type: [Object, null],
        default: null
      }
    },
    data () {
      return {
        title: title,
        userInfo: null,
        showHeaderMenu: true,  // 显示头部菜单
        defaultMenu: this.$route.name,
        isFullScreen: this.$store.state.common.isFullScreen  // 是否全屏
      };
    },
    methods: {
      handleCommand(command) {
        // 退出登录
        if (command === 'logout') {
          MessageBox.confirm('确定要退出登录吗？', () => {
            systemService.logout({}, false, true).then(({data}) => {
              this.$cookie.delete('sessionid'); // 删除sessionid，重新登录
              this.$router.go(0);
            });
          });
        }
      },
      fullScreen() {
        let elem = document.body;
        if (elem.webkitRequestFullScreen) {
          this.isFullScreen = true;
          this.$store.state.common.isFullScreen = true;
          elem.webkitRequestFullScreen();
        } else if (elem.mozRequestFullScreen) {
          this.isFullScreen = true;
          this.$store.state.common.isFullScreen = true;
          elem.mozRequestFullScreen();
        } else if (elem.requestFullScreen) {
          this.isFullScreen = true;
          this.$store.state.common.isFullScreen = true;
          elem.requestFullscreen();
        } else {
          // 浏览器不支持全屏API或已被禁用
          MessageBox.alert('当前浏览器暂不支持全屏操作');
        }
      },
      exitFullScreen() {
        let elem = document;
        if (elem.webkitCancelFullScreen) {
          this.isFullScreen = false;
          this.$store.state.common.isFullScreen = false;
          elem.webkitCancelFullScreen();
        } else if (elem.mozCancelFullScreen) {
          this.isFullScreen = false;
          this.$store.state.common.isFullScreen = false;
          elem.mozCancelFullScreen();
        } else if (elem.cancelFullScreen) {
          this.isFullScreen = false;
          this.$store.state.common.isFullScreen = false;
          elem.cancelFullScreen();
        } else if (elem.exitFullscreen) {
          this.isFullScreen = false;
          this.$store.state.common.isFullScreen = false;
          elem.exitFullscreen();
        } else {
          //  浏览器不支持全屏API或已被禁用
          MessageBox.alert('当前浏览器暂不支持全屏操作');
        }
      },
      // page跳转
      goPage(name) {
        this.$router.push({name});
      },
      // 路由变化执行的方法
      fetchRoute () {
        this.defaultMenu = this.$route.name;  // 更新菜单选中
      }
    },
    created () {

    },
    mounted () {
      // 简单浏览器窗口大小
      let windowSizeChange = () => {
        let domWidth = $(document).width();
        if (domWidth > 991) {
          this.showHeaderMenu = true;
        } else {
          this.showHeaderMenu = false;
        }
      };
      windowSizeChange();
      $(window).resize(windowSizeChange);
    },
    watch: {
      // 如果路由有变化执行这个方法
      '$route': 'fetchRoute'
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #workbench-header{
    background-color: #324157;
  }
  .el-menu--horizontal{
    border: none;
  }
  .el-menu--horizontal > .el-menu-item.is-active{
    border-width: 4px;
  }
  .w-logo{
    text-align: left;
    height: 60px;
    padding: 10px 30px;
    z-index: 1000;
    a{
      width: 140px;
      height: 32px;
      display: inline-block;
    }
    .sm-menu{
      color: white;
      font-size: 22px;
      padding: 4px 10px;
      cursor: pointer;
      border: 1px solid white;
      border-radius: 4px;
    }
  }
  .tools{
    height: auto;
    margin: 10px 0 6px 0;
    text-align: left;
    .tools-item{
      display: inline-block;
      margin-left: 10px;
      float: left;
      a{
        display: block;
        padding: 10px;
        height: 100%;
        width: 100%;
        cursor: pointer;
        color: rgb(191, 203, 217);
        i{
          margin-right: 4px;
        }
      }
      a:hover{
        color: white;
      }
    }
    .tools-alert .badge{
      background-color: #20A0FF !important;
    }
    .tools-message .badge{
      background-color: #FF4949 !important;
    }
    .user-options{
      height: 40px;
    }
  }
  #header-menu{
    z-index: 500;
  }
  .el-dropdown-link{
    height: 100%;
    display: inline-block;
    cursor: pointer;
    color: rgb(191, 203, 217);
    margin-top: 4px;
    .user-info{
      max-width: 120px;
      overflow: hidden;
      display: inline-block;
      text-overflow: ellipsis;
      float: left;
      .avatar{
        width: 32px;
        height: 32px;
        display: inline-block;
      }
    }
    i{
      float: left;
      display: inline-block;
      padding-top: 8px;

    }
  }
  .el-dropdown-menu{
    margin-top: -2px;
  }
</style>

