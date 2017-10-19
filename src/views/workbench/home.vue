<template>
  <div id="home-app">
    213123
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  import systemService from 'services/systemService';

  export default {
    created () {
      // 网页标题
      document.title = title;
      // 获取用户信息
      let userInfo = this.$store.commit('getUserInfo');
      console.log(userInfo);
      systemService.checkLogin().then(({data}) => {
        console.log(data);
      });
    },
    data () {
      return {};
    },
    methods: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #home-app{
    height: 100%;
  }
</style>
