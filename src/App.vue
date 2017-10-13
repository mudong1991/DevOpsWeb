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
  export default {
    created () {
      document.title = title;
    },
    data () {
      return {
        transitionName: 'slide-left'
      };
    },
    methods: {

    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  #app{
    height: 100%;
  }
</style>
