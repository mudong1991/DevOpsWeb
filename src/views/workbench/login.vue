<template>
  <div id="login-app">
    <!--顶部导航开始-->
    <div>

    </div>
    <!--顶部导航结束-->
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';

  export default {
    created () {
      document.title = `欢迎登陆${title}`;
    },
    mounted () {

    },
    data () {
      return {};
    },
    methods: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
