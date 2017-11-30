<template>
  <div class="main-header clearfix">
    <div class="col-xs-12 clearfix">
      <div class="pull-left">
        <strong>位置：</strong>
      </div>
      <el-breadcrumb separator="/" class="pull-left">
        <el-breadcrumb-item v-for="breadcrumb in breadcrumbList" :key="breadcrumb.id" :to="breadcrumb.linkObject">
          <span><i :class="breadcrumb.icon"></i> {{ breadcrumb.name }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      breadcrumbList: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
      };
    },
    methods: {

    },
    created () {

    },
    destroyed () {
    },
    mounted () {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .main-header{
    width: 100%;
    height: 41px;
    line-height: 31px;
    text-align: left;
    padding-top: 10px;
    background: white;
  }
  .el-breadcrumb{
    margin-top: 8px;
  }
</style>

