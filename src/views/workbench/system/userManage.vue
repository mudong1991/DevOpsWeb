<template>
  <div id="user-manage-app">
    456
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
  #user-manage-app{
    height: 100%;
    width: 100%;
  }
</style>
