<template>
  <el-container>
    <el-header class="main-content-header">
      <main-header></main-header>
    </el-header>
    <el-main class="main-content-container">
      <div v-bar class="vuebar-element">
        <div>

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
      return {};
    },
    methods: {

    },
    components: {
      mainHeader
  }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #user-manage-app{
    height: 100%;
    width: 100%;
  }
</style>
