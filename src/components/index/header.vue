<template>
  <div id="header" class="navbar-fixed-top animated fadeInDown">
    <div class="header layui-header header-index">
      <div class="layui-main">
        <router-link :to="{name: 'index'}" class="logo">
          <img src="static/images/logo.png" :alt="title" />
        </router-link>
        <ul class="layui-nav hidden-xs" lay-filter="">
          <li class="layui-nav-item"><a href="">首页</a></li>
          <li class="layui-nav-item layui-this"><a href="">产品</a></li>
          <li class="layui-nav-item"><a href="">大数据</a></li>
          <li class="layui-nav-item">
            <a href="javascript:;">解决方案</a>
          </li>
          <li class="layui-nav-item"><a href="">社区</a></li>
        </ul>
        <div class="visible-xs">

        </div>
      </div>

      <div class="header-bg"></div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';

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
      layui.use('element', function () {

      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .header-index{
    background-color: rgba(0, 0, 0, 0.2);
    width: 100%;
    padding-left: 10%;
    position: relative;
    .header-bg{
      height: 0;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.8);
      transition: all .4s;
      z-index: 10;
    }
  }
  .header-index:hover .header-bg{
    height: 100%
  }
  .layui-main{
    width: 100%;
    height: 100%;
    padding-left: 20%;
    z-index: 1000;
  }
  .logo {
    position: absolute;
    left: 0;
    top: 10px;
    margin-left: 10px;
  }
  .layui-nav{
    background: transparent;
  }
  .layui-nav-item{
    width: 96px;
    text-align: center;
    margin-left: 4px;
  }
  .layui-this::after, .layui-nav-bar{
    background-color: #20a0ff !important;
    height: 3px !important;
  }
  .layui-nav-bar{
    top: 57px !important;
  }
</style>
