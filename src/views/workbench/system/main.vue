<template>
  <div id="workbench-app">
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  export default {
    created () {
      document.title = title;
    },
    data () {
      return {};
    },
    methods: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #workbench-app{
    height: 100%;
  }
</style>
