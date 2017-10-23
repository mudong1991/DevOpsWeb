<template>
  <div id="app">
    <!-- 路由匹配到的组件将渲染在这里 -->
    <transition :name="transitionName">
      <router-view ></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  import {loginExpiresTime} from '@/config/config';

  export default {
    created () {
      document.title = title;
      // 更新用户信息
      let userInfoStr = this.$cookie.get('userInfo');
      if (userInfoStr !== null) {
        try {
          this.$cookie.set('userInfo', userInfoStr, {expires: window.localStorage.getItem('keepLogin') === 'true' ? '10Y' : loginExpiresTime});
        } catch (e) {}
      }
    },
    data () {
      return {
        transitionName: 'slide-left'
      };
    },
    methods: {

    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  #app{
    height: 100% !important;
  }
</style>
