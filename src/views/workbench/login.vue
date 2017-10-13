<template>
  <div id="login-app">
    <!--顶部导航开始-->
    <v-header2></v-header2>
    <!--顶部导航结束-->
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

</style>
