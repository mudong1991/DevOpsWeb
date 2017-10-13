<template>
  <div id="login-app">
    <!--顶部开始-->
    <v-header2></v-header2>
    <!--顶部结束-->

    <!--登录区域start-->
    <div class="login-container">
      <div class="login-adv animated zoomIn hidden-sm hidden-xs">
        <h1 class="login-adv-title "><img src="/static/images/icon-ops-white.png" class="img-responsive" /><span>   四方开发云</span></h1>
        <p class="login-adv-content-1">一站式云端DevOps平台</p>
        <p class="login-adv-content-2">全生命周期的一站式研发服务，使软件开发更加简单高效</p>
      </div>
    </div>
    <!--登录区域end-->
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  import header2 from '@/components/index/header2';

  export default {
    created () {
      document.title = `欢迎登陆${title}`;
    },
    mounted () {

    },
    data () {
      return {};
    },
    methods: {

    },
    components: {
      vHeader2: header2
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #login-app{
    width: 100%;
    height: 100%;
    background: url("/static/images/login_bg.jpg") no-repeat center center;
  }
  .login-container{
    background: rgba(0, 0, 0, 0.2);
    height: 100%;
    position: relative;
    .login-adv{
      position: absolute;
      top: 30%;
      left: 10%;
      z-index: 9;
      color: white;
      .login-adv-title{
        font-family: 幼圆;
        font-weight: bold;
        font-size: 60px;
        img{
          display: inline-block;
          width: 60px;
          height: 60px;
        }
      }
      p{
        font-size: 18px;
      }
    }
  }
</style>
