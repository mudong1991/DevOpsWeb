<template>
  <el-container >
    <el-header class="main-content-header">
      <main-header :breadcrumbList="breadcrumbList"></main-header>
    </el-header>
    <el-main class="main-content-container">
      <div v-bar class="vuebar-element">
        <div>
          自动化运维
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  import mainHeader from '@/components/workbench/mainHeader';

  export default {
    created () {
      document.title = title;
    },
    data () {
      return {
        breadcrumbList: [
          {'name': '系统设置', 'linkObject': {name: 'wb_system'}}
        ]
      };
    },
    methods: {

    },
    components: {
      mainHeader
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
