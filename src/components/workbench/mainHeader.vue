<template>
  <div class="main-header clearfix">
    <div class="col-xs-12">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="breadcrumb in breadcrumbList" :key="breadcrumb.id">
          <router-link  :to="breadcrumb.linkObject" v-if="breadcrumb.linkObject" v-text="breadcrumb.name"></router-link>
          <span v-else v-text="breadcrumb.name"></span>
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
    height: 31px;
    line-height: 31px;
    text-align: left;
    padding: 8px 0;
    border-bottom: 1px solid #DDDDDD;
  }
</style>

