<template>
  <el-container>
    <el-header class="main-content-header">
      <main-header :breadcrumbList="breadcrumbList"></main-header>
    </el-header>
    <el-main class="main-content-container">
      <div v-bar class="vuebar-element">
        <div>
            dsafdasdfasdfasdf
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
          {'name': '系统设置', 'linkObject': {name: 'wb_system'}, 'icon': 'fa fa-cogs'},
          {'name': '账户管理', 'icon': 'fa fa-users'},
          {'name': '权限管理', 'linkObject': {name: 'wb_userAdmin'}, 'icon': 'fa fa-sitemap'}
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
