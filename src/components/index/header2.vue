<template>
  <div class="header">
    <div class="header-top navbar-fixed-top clearfix animated fadeInDown">
      <!--<div class="index-header-bg"></div>-->
      <div class="header-top-bg-show "></div>
      <div class="col-xs-12 header-top-container clearfix" >
        <router-link :to="{name: 'index'}"><img src="static/images/logo.png" :title="title" class="img-responsive pull-left" /></router-link>
        <ul class="pull-right">
          <li>
            <span class="hidden-xs hidden-xs">已有账号,立即  </span><router-link :to="{name: 'wb_login'}" class="theme-color-main">登录</router-link>
          </li>
          <li>
            <router-link :to="{name: 'index'}">回首页</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';

  export default {
    props: {

    },
    data () {
      return {
        title
      };
    },
    methods: {

    },
    mounted () {

    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '/static/css/animate.css';
  @import '/static/css/animate-element.css';

  /*顶部导航*/
  .header{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  .header-top{
    width: 100%;
    height: 50px;
    position: relative;

    /*导航背景*/
    .header-top-bg{
      position: absolute;
      z-index: 0;
      height: 0;
      width: 100%;
      transition: all .5s;
      background: transparent;
    }
    .header-top-bg-show{
      position: absolute;
      z-index: 0;
      width: 100%;
      transition: all .5s;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
    }

    /*logo*/
    .header-top-container{
      padding-left: 6%;
      padding-right: 6%;
      height: 100%;
      img{
        display: block;
        height: 30px;
        margin: 8px auto;
      }
      ul{
        height: 100%;
        li{
          display: inline-block;
          height: 50px;
          line-height: 50px;
          margin-left: 20px;
          color: white;
          a{
            cursor: pointer;
            color: white;
          }
          a:hover{
            color: #ff0000;
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
