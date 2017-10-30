<template>
  <div id="index" class="index">
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
          <img src="/static/images/banner_bg.jpg" alt="Bootstrap Touch Slider"  class="slide-image"/>
          <div class="bs-slider-overlay"></div>

          <div class="container">
            <div class="row">
              <!-- Slide Text Layer -->
              <div class="slide-text slide_style_left">
                <h1 data-animation="animated zoomInRight">提高企业运维能力</h1>
                <p data-animation="animated fadeInLeft">无人值守自动运维   |  快速达到基础运维支撑能力   |  提升技术人员DevOps能力</p>
                <a href="#" target="_blank" class="btn btn-default btn-sm" data-animation="animated fadeInLeft">观看视频</a>
                <a href="#" target="_blank"  class="btn btn-primary btn-sm" data-animation="animated fadeInRight">直接开始</a>
              </div>
            </div>
          </div>
        </div>
        <!-- End of Slide -->

        <!-- Second Slide -->
        <div class="item">

          <!-- Slide Background -->
          <img src="/static/images/banner_bg01.jpg" alt="Bootstrap Touch Slider"  class="slide-image"/>
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
          <img src="/static/images/banner_bg02.jpg" alt="Bootstrap Touch Slider"  class="slide-image"/>
          <div class="bs-slider-overlay"></div>
          <!-- Slide Text Layer -->
          <div class="slide-text slide_style_right">
            <h1 data-animation="animated zoomInLeft">软件开发云</h1>
            <p data-animation="animated fadeInRight">一站式云端DevOps平台，集成四方科技近10年研发实践和前沿理念</p>
            <a href="#" target="_blank" class="btn btn-default  btn-sm" data-animation="animated fadeInLeft">查看详情</a>
            <a href="#" target="_blank" class="btn btn-primary  btn-sm" data-animation="animated fadeInRight">立即体验</a>
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

    <div class="container" style="border: 1px solid red">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  import $ from 'jquery';
  import 'static/js/jquery.touchSwipe.min';
  import 'static/js/bootstrap-touch-slider';

  export default {
    data () {
      return {
        title: title,
        userInfo: null
      };
    },
    methods: {
    },
    created () {
      document.title = `首页 | ${title}`;
    },
    mounted () {
      // 轮播广告
      $('#bootstrap-touch-slider').bsTouchSlider();
      // 滚动后处理菜单
      let navTop = $(window).scrollTop();
      let topAction = () => {
        if (navTop > 60) {
          $('.header-bg').css({'height': '100%'});
        } else {
          $('.header-bg').css({'height': '0'});
        }
      };
      topAction();
      $(window).scroll(() => {
        navTop = $(window).scrollTop();
        topAction();
      });
    }
  };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '/static/css/bootstrap-touch-slider.css';
  #index{
    height: 100%;
  }
  /*轮播*/
  #bootstrap-touch-slider{
    max-height: 520px;
    min-height: 300px;
    img{
      max-height: 520px;
      min-height: 300px;
    }
  }
</style>
