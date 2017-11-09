<template>
  <div id="system-app" class="clearfix">
    <div class="aside" id="aside"  :class="{'aside-overflow': !isCollapse}">
        <div class="handle-menu" @click="collapseMenu()">
          <i class="fa fa-reorder"></i>
        </div>


        <el-menu
           class="el-menu-vertical-demo"
           id="aside-menu"
           :collapse="isCollapse"
           background-color="#324157"
           text-color="#fff"
           active-text-color="white"
           :default-active="defaultMenu"
           :unique-opened="true" :style="{'margin-top': menuMarginTop + 'px'}">

          <div class="noneBlock"></div>

          <el-submenu index="wb_system_all" v-show="false">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title" >系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="wb_system" @click="goPage('wb_system')">系统设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="wb_user_all">
            <template slot="title">
              <i class="fa fa-users"></i>
              <span slot="title" >账户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="wb_userAdmin" @click="goPage('wb_userAdmin')"><i class="fa fa-user"></i>用户管理</el-menu-item>
              <el-menu-item index="wb_permissionAdmin" @click="goPage('wb_permissionAdmin')"><i class="fa fa-sitemap"></i>权限管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title" >日志管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/workbench/system/userLog">用户日志</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>

        <div class="move-menu-up" @click="moveMenu('up')" v-if="isCollapse">
          <i class="fa fa-chevron-up"></i>
        </div>
        <div class="move-menu-down" @click="moveMenu('down')" v-if="isCollapse">
          <i class="fa fa-chevron-down"></i>
        </div>
    </div>

    <div class="main">
      <el-container>
        <el-main>
          <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
        </el-main>
        <el-footer >
          <main-footer></main-footer>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  import mainFooter from '@/components/workbench/mainFooter';
  import mainHeader from '@/components/workbench/mainHeader';

  export default {
    created () {
      document.title = title;
    },
    data () {
      return {
        isCollapse: false,
        menuMarginTop: 0,
        asideHeight: 0,
        asideMenuHeight: 0,
        defaultMenu: this.$route.name
      };
    },
    methods: {
      fetchRoute () {
        this.defaultMenu = this.$route.name;
      },
      // page跳转
      goPage(name) {
        this.$router.push({name});
      },
      collapseMenu () {
        this.isCollapse = !this.isCollapse;
        if (!this.isCollapse) {
          this.menuMarginTop = 0;
        }
      },
      moveMenu(direction) {
        if (direction === 'up') {
          if ((-this.menuMarginTop) < (this.asideMenuHeight - 90)) {
            this.menuMarginTop -= 57;
          }
        } else if (direction === 'down') {
          if (this.menuMarginTop + this.asideMenuHeight + 70 < this.asideHeight) {
            this.menuMarginTop += 57;
          }
        }
      }
    },
    mounted () {
      // 监听浏览器窗口大小
      let windowSizeChange = () => {
        let asideHeight = $('#aside').height();
        let asideMenuHeight = $('#aside-menu').height();
        this.asideHeight = asideHeight;
        this.asideMenuHeight = asideMenuHeight;
      };
      windowSizeChange();
      $(window).resize(windowSizeChange);
    },
    components: {
      mainFooter,
      mainHeader
    },
    watch: {
      // 如果路由有变化执行这个方法
      '$route': 'fetchRoute'
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #system-app{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .noneBlock{
    width: 100%;
    height: 30px;
    background: #59677B !important;
  }
  .el-menu{
    border: none !important;
    z-index: 100;
    margin-top: 30px;
  }
  #aside-menu {
    transition: all .4s;
  }
  #aside-menu>li{
    border-top: 1px solid #59677B;
  }
  .el-submenu .el-menu{
    border-radius: 2px;
  }
  .el-menu-item-group__title{
    padding: 0 0 0 20px !important;
  }
  .el-container{
    height: 100%;
    _zoom: 1;
  }
  .aside{
    height: 100%;
    float: left;
    position: relative;
    background-color: #59677B;
  }
  .wrapper-menu{
    height: 100%;
    width: 100%;
  }
  .aside-overflow{
    overflow-x: hidden;
    overflow-y: auto;
  }
  .main {
    height: 100%;
  }
  .handle-menu{
    background-color: #283446;
    text-align: center;
    color: white;
    line-height: 30px;
    cursor: pointer;
    transition: all 0.4s;
    z-index: 1000;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .move-menu-up{
    background-color: #283446;
    text-align: center;
    color: white;
    line-height: 20px;
    height: 24px;
    cursor: pointer;
    transition: all 0.4s;
    z-index: 100;
    width: 100%;
    font-size: 14px;
    position: absolute;
    bottom: 22px;
    left: 0;
    border-bottom: 1px solid #59677B;
  }
  .move-menu-down{
    background-color: #283446;
    text-align: center;
    font-size: 14px;
    height: 22px;
    color: white;
    line-height: 20px;
    cursor: pointer;
    transition: all 0.4s;
    z-index: 100;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .handle-menu:hover, .move-menu-down:hover, .move-menu-up:hover{
    color: #20A0FF;
  }
  .el-menu-item.is-active{
    background-color: #20A0FF !important;
    color: white !important;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
  }
  .el-main{
    background: #F5F7F9;
    padding: 0 !important;
  }
  .el-footer{
    background: #F5F7F9;
    height: auto !important;
    padding: 0 !important;
  }
</style>
