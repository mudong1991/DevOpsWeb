<template>
  <div id="login-app">
    <!--顶部导航开始-->
    <div class="index-top">
      <div class="index-header navbar-fixed-top clearfix animated fadeInDown">
        <!--<div class="index-header-bg"></div>-->
        <div class="index-header-bg-show "></div>
        <div class="col-sm-8 col-xs-8 col-md-3 index-logo clearfix" >
          <el-button class="visible-sm visible-xs index-logo-caret" >
            <i class="fa fa-list-ul"></i>
          </el-button>
          <img src="static/images/logo.png" :title="title" class="img-responsive" />
        </div>
        <div id="index-header-container" class=" hidden-sm hidden-xs  col-md-6">
          <ul class="index-header-nav" id="index-header-nav">
            <li><a href="#">首　　页</a></li>
            <li><a href="#">企业文化</a></li>
            <li><a href="#">产品展示</a></li>
            <li><a href="#">新闻中心</a></li>
            <li><a href="#">阳光服务</a></li>
          </ul>
        </div>
        <div class="col-sm-4 col-xs-4 col-md-3 padding-0 index-header-tools" >
          <div class="visible-sm visible-xs index-header-user">
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="fa fa-user"></i>  用户中心
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>登录</el-dropdown-item>
                <el-dropdown-item>注册</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <ul class="padding-0 hidden-sm hidden-xs">
            <li>
              <a  @click="goLogin()">登录</a>
            </li>
            <li>
              <a class="active" @click="goLogin()">注册</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--顶部导航结束-->
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';

  export default {
    created () {
      document.title = `欢迎登陆${title}`;
    },
    mounted () {

    },
    data () {
      return {};
    },
    methods: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
