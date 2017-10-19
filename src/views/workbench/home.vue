<template>
  <div id="home-app">
    213123
  </div>
</template>

<script type="text/ecmascript-6">
  import {title, MessageBox} from 'config/config';

  export default {
    created () {
      MessageBox.alert('neirong', '标题', {}, ['确认'], (index) => {
        MessageBox.close(index);
      });
      // 网页标题
      document.title = title;
      // 获取用户信息
//      let userInfo = {};
//      try {
//        userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
//        this.$store.commit('setUserInfo', userInfo);
//      } catch (e) {
//
//      }
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
