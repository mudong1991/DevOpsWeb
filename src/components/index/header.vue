<template>
  <div class="index-top">
    <div class="index-header navbar-fixed-top clearfix animated fadeInDown">
      <!--<div class="index-header-bg"></div>-->
      <div class="index-header-bg-show "></div>
      <div class="col-sm-8 col-xs-8 col-md-3 index-logo clearfix" >
        <el-button class="visible-sm visible-xs index-logo-caret" v-if="show_menu">
          <i class="fa fa-list-ul"></i>
        </el-button>
        <router-link :to="{name: 'index'}"><img src="static/images/logo.png" :title="title" class="img-responsive" /></router-link>
      </div>
      <div id="index-header-container" class=" hidden-sm hidden-xs  col-md-6" v-if="show_menu">
        <ul class="index-header-nav" id="index-header-nav">
          <li><a href="#">首　　页</a></li>
          <li><a href="#">企业文化</a></li>
          <li><a href="#">产品展示</a></li>
          <li><a href="#">新闻中心</a></li>
          <li><a href="#">阳光服务</a></li>
        </ul>
      </div>
      <div class="col-sm-4 col-xs-4 col-md-3 padding-0 index-header-tools" >
        <div class="visible-sm visible-xs index-header-user" v-show="show_user">
          <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="fa fa-user"></i>  用户中心
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="xsLogin">登录</el-dropdown-item>
              <el-dropdown-item>注册</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <ul class="padding-0 hidden-sm hidden-xs" v-show="show_user">
          <li>
            <router-link  :to="{name: 'wb_login'}">登录</router-link>
          </li>
          <li>
            <router-link class="active"  :to="{name: 'wb_login'}">注册</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  import $ from 'jquery';
  import 'static/js/jquery.easing.min';
  import 'static/js/jquery.lavalamp.min';

  export default {
    props: {
      show_menu: {
        type: Boolean,
        default: true
      },
      show_user: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        title: title
      };
    },
    methods: {
      handleCommand(command) {
        if (command === 'xsLogin') {
          this.$router.push({name: 'wb_login'});
        }
      }
    },
    mounted () {
      // 导航栏
      $('#index-header-nav').lavaLamp({
        fx: 'backout',
        speed: 600,
        click: function(event, menuItem) {
          return false;
        }
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '/static/css/animate.css';
  @import '/static/css/animate-element.css';

  /*顶部导航*/
  .index-top{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  .index-header{
    width: 100%;
    height: 50px;
    position: relative;

    /*导航背景*/
    .index-header-bg{
      position: absolute;
      z-index: 0;
      height: 0;
      width: 100%;
      transition: all .5s;
      background: transparent;
    }
    .index-header-bg-show{
      position: absolute;
      z-index: 0;
      width: 100%;
      transition: all .5s;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
    }

    /*logo*/
    .index-logo{
      padding: 10px 0px;
      padding-left: 6%;
      .index-logo-caret{
        height: 30px;
        width: 40px;
        margin-right: 10px;
        padding: 5px;
        float: left;
      }
      img{
        float: left;
        height: 30px;
      }
    }

    /*导航容器*/
    #index-header-container {
      padding: 0px;
      margin-top: 0px;
      margin-right: auto;
      margin-bottom: 0px;
      margin-left: auto;
      /*导航*/
      .index-header-nav {
        height: 50px;
        padding: 0px;
        list-style-image: none;
        list-style-type: none;
        margin: 0px;
        position: relative;
      }
      .index-header-nav li {
        float: left;
        list-style: none;
        margin-right: 6%;
        padding: 0px;
        margin-top: 0px;
        margin-bottom: 0px;
        margin-left: 0px;
      }
      .index-header-nav li a {
        text-decoration: none;
        color: white;
        outline: none;
        text-align: center;
        z-index: 10;
        padding-top: 14px;
        display: block;
        float: left;
        height: 50px;
        position: relative;
        overflow: hidden;
        margin-right: 4px;
        margin-left: 4px;
        width: auto;
      }
      .index-header-nav  li.back {
        height: 40px;
        z-index: 8;
        left:0 ;
        width: 64px !important;
        position: absolute;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #FF0000;
        color: #999999;
      }
      .index-header-nav li a:hover{
        border: none;
        color: #FF0000;
        font-weight: bold;
      }
    }

    /*头部信息*/
    .index-header-tools{
      height: 100%;
      .index-header-user{
        color: white !important;
        padding-top: 14px;
        span{
          color: white;
          cursor: pointer;
        }
      }
      ul{
        height: 100%;
        li{
          display: inline-block;
          width: 60px;
          height: 100%;
          margin-top: 8px;
          a{
            display: block;
            width: 100%;
            height: 30px;
            text-align: center;
            padding-top: 6px;
            color: white;
            border-radius: 15px;
            transition: all .5s;
            cursor: pointer;
          }
          a:hover{
            text-decoration: none;
            background: #e41f2b;
            font-weight: bold;
          }
          .active{
            background: #e41f2b;
          }
        }
      }
    }
  }
  .index-header:hover .index-header-bg{
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
  }
</style>
