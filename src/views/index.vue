<template>
  <div id="index" class="index">
    <!--顶部导航开始-->
    <div class="index-top">
      <div class="index-header navbar-fixed-top clearfix animated fadeInDown">
        <div class="index-header-bg"></div>

        <el-row class="index-header-container">
          <el-col :span="6" class="index-header-logo text-center">
            <router-link :to="{ path: 'index' }">
              <img src="static/images/logo.png" />
            </router-link>
          </el-col>
          <el-col :span="12" class="index-header-nav">
            <el-row>
              <el-col :span="6" class="header-nav-item">
                <router-link :to="{ path: 'index' }" class="active">
                  首页
                </router-link>
              </el-col>
              <el-col :span="6" class="header-nav-item">
                <router-link :to="{ path: 'workbench/login' }">
                  产品
                </router-link>
              </el-col>
              <el-col :span="6" class="header-nav-item">
                <router-link :to="{ path: 'index' }">
                  合作伙伴
                </router-link>
              </el-col>
              <el-col :span="6" class="header-nav-item">
                <router-link :to="{ path: 'index' }">
                  更多
                </router-link>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6" class="text-center header-info">
            <el-button type="primary" size="small">
              <i class="fa fa-laptop"></i>  工作台
            </el-button>

            <el-button type="primary" v-show="!isLogin" @click="goLogin()" size="small">
              <i class="fa fa-user-circle"></i>   登录
            </el-button>

            <el-dropdown v-show="isLogin" class="header-info-user">
                <el-button type="primary">
                  更多菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                  <el-dropdown-item>双皮奶</el-dropdown-item>
                  <el-dropdown-item>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--顶部导航结束-->

    <!--轮播开始-->
    <div id="bootstrap-touch-slider" class="carousel animated fadeIn bs-slider fade  control-round indicators-line" data-ride="carousel" data-pause="hover" data-interval="6000" >
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li data-target="#bootstrap-touch-slider" data-slide-to="0" class="active"></li>
        <li data-target="#bootstrap-touch-slider" data-slide-to="1"></li>
        <li data-target="#bootstrap-touch-slider" data-slide-to="2"></li>
      </ol>

      <!-- Wrapper For Slides -->
      <div class="carousel-inner" role="listbox">

        <!-- Third Slide -->
        <div class="item active">

          <!-- Slide Background -->
          <img src="static/images/banner_bg.jpg" alt="Bootstrap Touch Slider"  class="slide-image"/>
          <div class="bs-slider-overlay"></div>

          <div class="container">
            <div class="row">
              <!-- Slide Text Layer -->
              <div class="slide-text slide_style_left">
                <h1 data-animation="animated zoomInRight">提高企业运维能力</h1>
                <p data-animation="animated fadeInLeft">无人值守自动运维   |  快速达到基础运维支撑能力   |  提升技术人员DevOps能力</p>
                <a href="#" target="_blank" class="btn btn-default" data-animation="animated fadeInLeft">观看视频</a>
                <a href="#" target="_blank"  class="btn btn-primary" data-animation="animated fadeInRight">直接开始</a>
              </div>
            </div>
          </div>
        </div>
        <!-- End of Slide -->

        <!-- Second Slide -->
        <div class="item">

          <!-- Slide Background -->
          <img src="static/images/banner_bg01.jpg" alt="Bootstrap Touch Slider"  class="slide-image"/>
          <div class="bs-slider-overlay"></div>
          <!-- Slide Text Layer -->
          <div class="slide-text slide_style_center">
            <h1 data-animation="animated flipInX">{{ title }}</h1>
            <p data-animation="animated lightSpeedIn">基于Vue和Django实现前后端分离</p>
          </div>
        </div>
        <!-- End of Slide -->

        <!--  Third Slide -->
        <div class="item">

          <!-- Slide Background -->
          <img src="static/images/banner_bg02.jpg" alt="Bootstrap Touch Slider"  class="slide-image"/>
          <div class="bs-slider-overlay"></div>
          <!-- Slide Text Layer -->
          <div class="slide-text slide_style_right">
            <h1 data-animation="animated zoomInLeft">全民DevOps专家</h1>
          </div>
        </div>
        <!-- End of Slide -->


      </div><!-- End of Wrapper For Slides -->

      <!-- Left Control -->
      <a class="left carousel-control" href="#bootstrap-touch-slider" role="button" data-slide="prev">
        <span class="fa fa-angle-left" aria-hidden="true"></span>
        <span class="sr-only">上一个</span>
      </a>

      <!-- Right Control -->
      <a class="right carousel-control" href="#bootstrap-touch-slider" role="button" data-slide="next">
        <span class="fa fa-angle-right" aria-hidden="true"></span>
        <span class="sr-only">下一个</span>
      </a>
    </div> <!-- End  bootstrap-touch-slider Slider -->
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  import $ from 'jquery';
  import 'static/js/jquery.touchSwipe.min';
  import 'bootstrap/js/bootstrap.min.js';
  import 'static/js/bootstrap-touch-slider';

  export default {
    created () {
      document.title = `首页 | ${title}`;
    },
    mounted () {
      // 轮播广告
      $('#bootstrap-touch-slider').bsTouchSlider();
    },
    data () {
      return {
        title: title,
        isLogin: false
      };
    },
    methods: {
      goLogin() {
        this.$router.push({name: 'wb_login'});
      }
    }
  };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '/static/css/animate.css';
  @import '/static/css/animate-element.css';
  @import "/static/css/bootstrap-touch-slider.css";

  .index{
    min-width: 998px !important;
  }
  /*顶部导航*/
  .index-top{
    min-width: 998px !important;
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    z-index: 10;
    ;
  }
  .index-header{
    width: 100%;
    height: 70px;
    position: relative;
    .index-header-bg{
      position: absolute;
      z-index: 0;
      height: 0;
      width: 100%;
      transition: all .5s;
      background: transparent;
    }
    .index-header-container{
      z-index: 100;
      height: 100%;
    }
    .index-header-logo img{
      margin-top: 14px;
    }
    .index-header-nav{
      height: 100%;
      .header-nav-item{
        height: 70px;
        text-align: center;
        padding: 14px 0%;
        a{
          display: inline-block;
          width: 50%;
          height: 40px;
          text-decoration: none;
          line-height: 40px;
          text-align: center;
          color: #9b9ca8;
          transition: all 0.5s;
        }
        a:hover{
          color: white !important;
        }
        .active{
          color: white !important;
        }
      }
    }
    .header-info{
      padding: 20px 0;
    }
  }
  .index-header:hover .index-header-bg{
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
  }

  /*轮播*/
  #bootstrap-touch-slider{
    height: 520px;
    img{
      height: 520px;
    }
  }
</style>
