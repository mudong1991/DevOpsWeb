<template>
  <div class="main-header clearfix">
    <div class="col-xs-12">
      <strong>位置:</strong>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {

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
    height: auto;
    line-height: 30px;
    text-align: left;
    border-bottom: 1px solid #DDDDDD;
  }
</style>
