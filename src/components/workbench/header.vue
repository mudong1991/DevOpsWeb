<template>
  <div id="workbench-header" class="clearfix">
    <div class="w-logo clearfix pull-left animated fadeInDown" id="w-logo">
      <router-link :to="{name: 'index'}" class="pull-left">
        <img src="/static/images/logo.png" class="img-responsive" />
      </router-link>

      <div class="sm-menu pull-right " v-show="showSmMenu" @click="showHeaderMenu = !showHeaderMenu">
        <i class="fa fa-bars"></i>
      </div>
    </div>

    <div v-show="showHeaderMenu" id="header-menu" class="animated fadeInDown clearfix padding-0 ">
      <div class="col-xs-12 col-sm-12 col-md-6 padding-0" >
        <el-menu
          :default-active="defaultMenu"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#324157"
          text-color="#FFF"
          active-text-color="#20A0FF">
          <el-menu-item index="wb_index" @click="goPage('wb_index')"><i class="fa fa-home" ></i>  首页</el-menu-item>
          <el-menu-item index="wb_project" @click="goPage('wb_project')"><i class="fa fa-file-powerpoint-o"></i>  项目</el-menu-item>
          <el-menu-item index="3"><i class="fa fa-tasks"></i>  待办</el-menu-item>
          <el-submenu index="4" id="el-submenu" >
            <template slot="title"><i class="fa fa-hdd-o"></i>  服务</template>
            <el-menu-item index="2-1" >选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="5"><a href="https://www.ele.me" target="_blank"><i class="fa fa-code-fork"></i>  代码广场</a></el-menu-item>
          <el-menu-item index="wb_maintain" @click="goPage('wb_maintain')"><i class="fa fa-wrench" aria-hidden="true"></i>  自动化运维</a></el-menu-item>
          <el-menu-item index="wb_system" @click="goPage('wb_system')"><i class="fa fa-cogs"></i>  系统设置</el-menu-item>
        </el-menu>
      </div>

      <div class="col-xs-12 col-sm-12 col-md-4 padding-0 tools clearfix" >
          <ul class="clearfix">
            <li class="tools-item tools-alert" >
              <a><i class="fa fa-bell-o"></i>提醒  <span class="badge">50</span></a>
            </li>
            <li class="tools-item tools-message">
              <a><i class="fa fa-comment-o"></i>消息  <span class="badge">50</span></a>
            </li>
            <li class="tools-item">
              <a  @click="fullScreen()" v-if="!isFullScreen"><i class="fa fa-arrows-alt"></i><span >开启全屏</span></a>
              <a  @click="exitFullScreen()" v-if="isFullScreen"><i class="fa fa-arrows-alt"></i><span >退出全屏</span></a>
            </li>
            <li class="tools-item">
              <a @click="lockScreen()"><i class="fa fa-lock"></i>锁屏</a>
            </li>
            <li class="user-options tools-item" v-if="userInfoObj !== null">
              <a >
                  <el-dropdown @command="handleCommand" >
                  <span class="el-dropdown-link clearfix">
                     <span class="user-info">
                       <img class="img-responsive img-circle avatar" src="/static/images/user01.png"/>
                        <span>{{ userInfoObj.username !== undefined ? userInfoObj.username : '' }}</span>
                     </span><i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>个人中心</el-dropdown-item>
                      <el-dropdown-item>设置</el-dropdown-item>
                      <el-dropdown-item divided command="logout"><i class="fa fa-power-off"></i>  退出</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
              </a>
            </li>
          </ul>
      </div>
    </div>

    <transition name="lock">
      <div class="lock_action" v-if="showUnlock"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  import {MessageBox} from '@/utils/util';
  import baseService from '@/services/baseService';
  import workbenchSystemViewMap from 'routers/map/workbenchMap/workbenchSystemViewMap';
  import workbenchMaintainViewMap from 'routers/map/workbenchMap/workbenchMaintainViewMap';

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
        showSmMenu: false,
        defaultMenu: this.$route.name,
        isFullScreen: this.$store.state.common.isFullScreen,  // 是否全屏
        showUnlock: false // 是否锁屏
      };
    },
    methods: {
      handleCommand(command) {
        // 退出登录
        if (command === 'logout') {
          MessageBox.confirm('确定要退出登录吗？', () => {
            baseService.logout({}, false, true).then(({data}) => {
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
      lockScreen () {
        this.showUnlock = true;
        this.$cookie.set('last_page_name', this.$route.name, {expires: '1Y'}); // 本地存储锁屏之前打开的页面以便解锁后打开
        setTimeout(() => {
          this.$router.push({
            name: 'locking'
          });
        }, 700);
        this.$cookie.set('locking', '1');
      },
      // page跳转
      goPage(name) {
        this.$router.push({name});
      },
      // 路由变化执行的方法
      fetchRoute () {
        // 更新菜单选中状态
        let systemRouteList = workbenchSystemViewMap.map((item) => item.name);
        let presentRoute = this.$route.name;

        if (systemRouteList.includes(presentRoute)) {
          this.defaultMenu = 'wb_system';
        }

        if (workbenchMaintainViewMap.includes(presentRoute)) {
          this.defaultMenu = 'wb_maintain';
        }
      }
    },
    created () {
      this.fetchRoute();  // 初始化菜单选中
    },
    mounted () {
      // 简单浏览器窗口大小
      let windowSizeChange = () => {
        let domWidth = $(document).width();
        if (domWidth > 1300) {
          this.showHeaderMenu = true;
          this.showSmMenu = false;
          $('#header-menu').css('float', 'none');
          $('#w-logo').css('width', '220px');
          $('.tools ul').css('float', 'right');
        } else {
          this.showHeaderMenu = false;
          this.showSmMenu = true;
          $('#header-menu').css('float', 'left');
          $('#w-logo').css('width', '100%');
          $('.tools ul').css('float', 'left');
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
  .lock_action{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
    transition: all .8s;
    box-shadow: 0 0 0 500px #667aa6 inset;
  }
  .lock-enter{
    box-shadow: 0 0 0 0 #667aa6 inset;
  }
  .lock-enter-to{
    box-shadow: 0 0 0 500px #667aa6 inset;
  }
  .lock-enter-active{
    transition: all .8s;
  }

  .tools-item{
    margin-left: 2px !important;
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
  #header-menu{
    z-index: 500;
    width: 100%;
  }
  .tools{
    height: auto;
    margin: 10px 0 6px 0;
    float: right;
    ul{
      display: inline-block;
      float: right;
    }
    .tools-item{
      display: inline-block;
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
      a{
        height: 40px;
        padding-top: 0px;
      }
    }
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
        float: left;
        display: inline-block;
      }
      span{
        float: left;
        max-width: 88px;
        display: inline-block;
        padding-top: 6px;
        padding-right: 4px;
        padding-left: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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

