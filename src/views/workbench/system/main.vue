<template>
  <div id="system-app" class="clearfix">
    <div class="aside"  :class="{'aside-overflow': !isCollapse}">
      <div class="handle-menu" @click="collapseMenu()">
        <i class="fa fa-reorder"></i>
      </div>
      <el-menu default-active="1-4-1"
                 class="el-menu-vertical-demo"
                 :collapse="isCollapse"
                 background-color="#324157"
                 text-color="#fff"
                 active-text-color="white"
                 :unique-opened="true">
        <el-submenu style="border-bottom: 1px solid #59677B; border-top: 1px solid #59677B" index="1">
            <template slot="title" style="background-color: red !important;">
              <i class="el-icon-location"></i>
              <span slot="title" >导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
        <el-submenu style="border-bottom: 1px solid #59677B" index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="4-1">选项1</el-menu-item>
            <el-menu-item index="4-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="4-3">选项3</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item style="border-bottom: 1px solid #59677B"  index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
        <el-menu-item  index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
        </el-menu>
    </div>

      <div class="main">
        <el-container>
          <el-main>
            <el-container>
              <el-header style="height: auto !important; padding: 0 !important;"><main-header></main-header></el-header>
              <el-main style="overflow: auto; padding: 15px !important; background-color: white">
                <!-- 路由匹配到的组件将渲染在这里 -->
                <router-view></router-view>
              </el-main>
            </el-container>
          </el-main>
          <el-footer>
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
        isCollapse: false
      };
    },
    methods: {
      collapseMenu () {
        this.isCollapse = !this.isCollapse;
      }
    },
    components: {
      mainFooter,
      mainHeader
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #system-app{
    height: 100%;
    width: 100%;
    padding: 0 0 60px;
  }
  .el-menu{
    border: none !important;
  }
  .el-submenu .el-menu{
    border-radius: 2px;
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
    z-index: 100;
    width: 100%;
  }
  .handle-menu:hover{
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
    height: 40px !important;
    padding: 0 !important;
  }
</style>
