<template>
  <div id="header" class="navbar-fixed-top animated fadeInDown">
    <div class="header layui-header header-index">
      <div class="custom-layui-main container">
        <router-link :to="{name: 'index'}" class="logo">
          <img src="/static/images/logo.png" :alt="title" />
        </router-link>

        <ul class="layui-nav  hidden-xs" lay-filter="">
          <li class="layui-nav-item layui-this"><a href="">首页</a></li>
          <li class="layui-nav-item"><a href="">产品</a></li>
          <li class="layui-nav-item"><a href="">大数据</a></li>
          <li class="layui-nav-item">
            <a href="javascript:;">解决方案</a>
          </li>
        </ul>

        <div class="header-tools clearfix">
          <div class="header-tools-item pull-left">
            <router-link :to="{name: 'wb_home'}" class="header-tools-workbench">工作台</router-link>
          </div>

          <div class="header-tools-item pull-left" v-if="userInfo === null">
            <router-link :to="{name: 'wb_login'}" class="header-tools-login" target="_blank">登录</router-link>
          </div>

          <div class="header-tools-item pull-left" v-if="userInfo !== null">
            <el-dropdown class="header-tools-item-content" @command="handleCommand">
              <span class="el-dropdown-link clearfix">
                 <span class="user-info">
                   <img class="img-responsive img-circle avatar" src="/static/images/user01.png"/>
                   <span>{{ userInfo.username !== undefined ? userInfo.username : '' }}</span>
                 </span><i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="header-tools-item-content-dropdown">
                <el-dropdown-item >个人中心</el-dropdown-item>
                <el-dropdown-item divided>个人中心</el-dropdown-item>
                <el-dropdown-item command="logout"><i class="fa fa-power-off"></i>  退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>

        <div class="visible-xs">

        </div>
      </div>

      <div class="header-bg"></div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  import {MessageBox} from '@/utils/util';
  import baseService from '@/services/baseService';

  export default {
    props: {
      userInfo: {
        type: [Object, null],
        default: null
      }
    },
    data () {
      return {
        title: title
      };
    },
    methods: {
      handleCommand(command) {
        // 退出登录
        if (command === 'logout') {
          MessageBox.confirm('确定要退出登录吗？', () => {
            baseService.logout({}, false, true).then(({data}) => {
              this.$cookie.delete('sessionid'); // 删除sessionid，重新登录
              this.$router.go(0);
            });
          });
        }
      }
    },
    created () {

    },
    mounted () {
      layui.use('element', function () {
        let element = layui.element;
        element.init();  //  这样element对动态生成的元素才会重新有效
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .header-index{
    background-color: rgba(0, 0, 0, 0.2);
    width: 100%;
    position: relative;
    .header-bg{
      height: 0;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.8);
      transition: all .4s;
      z-index: 10;
    }
  }
  .header-index:hover .header-bg{
    height: 100% !important;
  }

  .header-tools-item-content-dropdown{
    margin: 0 !important;
    width: 160px !important;
  }

  .custom-layui-main{
    height: 100%;
    padding-left: 16%;
    z-index: 1000;
    position: relative;
    .logo {
      position: absolute;
      left: 0;
      top: 10px;
      margin-left: 10px;
    }
    .layui-nav{
      background: transparent;
    }
    .layui-nav-item{
      width: 96px;
      text-align: center;
      margin-left: 4px;
    }
    .layui-this::after, .layui-nav-bar{
      background-color: #20a0ff !important;
      height: 3px !important;
    }
    .layui-nav-bar{
      top: 57px !important;
    }
    .header-tools{
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        .header-tools-item{
          height: 100%;
          margin-right: 10px;
          .header-tools-workbench{
            height: 40px;
            padding: 8px 10px;
            width: 100%;
            margin-top: 12px;
            color: rgba(255,255,255,.7);
            display: block !important;
            transition: all 0.5s;
          }
          .header-tools-login{
            height: 30px;
            padding: 4px 24px;
            width: 100%;
            margin-top: 16px;
            color: white;
            display: block !important;
            transition: all 0.5s;
            border: 1px solid #20a0ff;
            border-radius: 12px;
          }
          .header-tools-item-content{
            margin-top: 12px;
            cursor: pointer;
            width: 100%;
            color: rgba(255,255,255,.7);
            transition: all 0.5s;
          }
          .header-tools-workbench:hover, .header-tools-item-content:hover{
            color: white !important;
          }
          .header-tools-login:hover{
            color: white;
            background: #20a0ff;
          }
          .el-dropdown-link{
            height: 100%;
            display: inline-block;
            cursor: pointer;
            color: rgb(191, 203, 217);
            margin-top: 4px;
            .user-info{
              max-width: 120px;
              float: left;
              .avatar{
                height: 32px;
                float: left;
                width: 32px;
                display: inline-block;
              }
              span{
                float: left;
                max-width: 88px;
                display: inline-block;
                padding-top: 4px;
                padding-right: 4px;
                padding-left: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            i{
              float: left;
              display: inline-block;
              padding-top: 7px;
            }
          }
        }
    }
  }

</style>
