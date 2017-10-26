<template>
  <div id="workbench-header" class="navbar-fixed-top animated fadeInDown">
    <el-menu theme="dark"  class="el-menu-demo" mode="horizontal" >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">项目</el-menu-item>
        <el-menu-item index="3">待办</el-menu-item>
        <el-submenu index="4">
            <template slot="title">服务</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item index="5"><a href="https://www.ele.me" target="_blank">代码广场</a></el-menu-item>
        <el-menu-item index="6"><a href="https://www.ele.me" target="_blank">自动化运维</a></el-menu-item>
        <el-menu-item index="7"><a href="https://www.ele.me" target="_blank">系统设置</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';

  export default {
    props: {

    },
    data () {
      return {
        title: title,
        userInfo: null
      };
    },
    methods: {
      logout() {
      }
    },
    created () {
    },
    mounted () {

    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
