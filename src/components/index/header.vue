<template>
  <div  id="header" class="navbar-fixed-top">
    <div class="header layui-header header-index">
      <div class="layui-main">
        <router-link :to="{name: 'index'}" class="logo">
          <img src="static/images/logo.png" :alt="title" />
        </router-link>
        <ul class="layui-nav layui-bg-cyan" pc="">
          <li class="layui-nav-item"><a href="">最新活动</a></li>
          <li class="layui-nav-item layui-this"><a href="">产品</a></li>
          <li class="layui-nav-item"><a href="">大数据</a></li>
          <li class="layui-nav-item">
            <a href="javascript:;">解决方案</a>
            <dl class="layui-nav-child"> <!-- 二级菜单 -->
              <dd><a href="">移动模块</a></dd>
              <dd><a href="">后台模版</a></dd>
              <dd><a href="">电商平台</a></dd>
            </dl>
          </li>
          <li class="layui-nav-item" mobile="">
            <a href="javascript:;">更多<span class="layui-nav-more"></span></a>
            <dl class="layui-nav-child layui-anim layui-anim-upbit">
              <dd><a href="http://fly.layui.com/" target="_blank">社区</a></dd>
            </dl>
          </li>
          <li class="layui-nav-item"><a href="">社区</a></li>
        </ul>
      </div>
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
    background-color: rgba(0, 0, 0, 0.8);
  }
  .logo {
    position: absolute;
    left: 0;
    top: 10px;
    margin-left: 10px;
  }
</style>
