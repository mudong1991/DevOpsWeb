<template>
  <div id="workbench-header" class="navbar-fixed-top animated fadeInDown clearfix el-menu--dark">
    <div class="col-xs-12 col-sm-12 col-md-2 w-logo clearfix">
      <router-link :to="{name: 'index'}" class="pull-left">
        <img src="/static/images/logo.png" class="img-responsive" />
      </router-link>

      <div class="sm-menu pull-right visible-xs visible-sm" @click="showHeaderMenu = !showHeaderMenu">
        <i class="fa fa-bars"></i>
      </div>
    </div>

    <el-collapse-transition>
      <div v-show="showHeaderMenu" id="header-menu">
        <div class="col-xs-12 col-sm-12 col-md-7" >
              <el-menu theme="dark"  class="el-menu-demo" mode="horizontal" >
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">项目</el-menu-item>
                <el-menu-item index="3">待办</el-menu-item>
                <el-submenu index="4">
                  <template slot="title">服务</template>
                  <el-menu-item index="2-1">选项1</el-menu-item>
                  <el-menu-item index="2-2">选项2</el-menu-item>
                  <el-menu-item index="2-3">选项3</el-menu-item>
                </el-submenu>
                <el-menu-item index="5"><a href="https://www.ele.me" target="_blank">代码广场</a></el-menu-item>
                <el-menu-item index="6"><a href="https://www.ele.me" target="_blank">自动化运维</a></el-menu-item>
                <el-menu-item index="7"><a href="https://www.ele.me" target="_blank">系统设置</a></el-menu-item>
              </el-menu>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-3 tools">
            <div class="user-options tools-item">
              <el-dropdown>
                <span class="el-dropdown-link">
                  下拉菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                  <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                  <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';

  export default {
    props: {

    },
    data () {
      return {
        title: title,
        userInfo: null,
        showHeaderMenu: true
      };
    },
    methods: {
      logout() {
      }
    },
    created () {

    },
    mounted () {
      // 简单浏览器窗口大小
      let windowSizeChange = () => {
        let domWidth = $(document).width();
        if (domWidth < 991) {
//          this.showHeaderMenu = false;
        } else {
          this.showHeaderMenu = true;
        }
      };
      windowSizeChange();
      $(window).resize(windowSizeChange);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped="">
  .w-logo{
    text-align: left;
    height: 60px;
    padding: 10px 12px;
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
    }
  }
  .el-menu-demo{
    .el-menu-item{
      transition: all .4s;
    }
    .el-menu-item:hover{
      color: white;
    }
  }
  .tools{
    border: 1px solid red;
    height: auto;
  }
</style>
