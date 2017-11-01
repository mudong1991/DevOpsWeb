<template>
  <div class="main-footer">
    <img src="/static/images/jc.png"/>{{ copyright }}
  </div>
</template>

<script type="text/ecmascript-6">
  import {copyright} from '@/config/config';

  export default {
    props: {

    },
    data () {
      return {
        copyright
      };
    },
    methods: {

    },
    mounted () {

    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .main-footer{
    width: 100%;
    height: 100%;
    line-height: 40px;
    text-align: center;
    border-top: 1px solid #DDDDDD;
  }
</style>
