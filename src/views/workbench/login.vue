<template>
  <div id="login-app">
    <!--顶部开始-->
    <v-header2></v-header2>
    <!--顶部结束-->

    <!--登录区域start-->
    <div class="login-container">
      <!--广告-->
      <div class="login-adv animated zoomIn hidden-sm hidden-xs">
        <h1 class="login-adv-title "><img src="/static/images/icon-ops-white.png" class="img-responsive" /><span>   四方开发云</span></h1>
        <p class="login-adv-content-1">一站式云端DevOps平台</p>
        <p class="login-adv-content-2">全生命周期的一站式研发服务，使软件开发更加简单高效</p>
      </div>

      <!--飘云-->
      <div class="cloud" id="cloud1"></div>
      <div class="cloud" id="cloud2"></div>

      <!--登录-->
      <div class="login-content">
        <div class="col-md-8 hidden-sm hidden-xs">
        </div>
        <div class="col-md-4 col-sm-12 login-form animated pulse">
          <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login-rule-form">
            <h2 class="title">用户登录</h2>
            <div class="login-form-content">
              <div class="login-form-error" v-show="showNotice">
                  <i class="fa fa-times-circle-o"></i><span v-text="noticeTxt"></span>
              </div>

              <el-form-item label="" prop="username" class="margin-bottom-30 margin-top-10">
                <el-input type="text" size="large" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
              </el-form-item>

              <el-form-item label="" prop="password" class="margin-bottom-30">
                <el-input type="password" size="large" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
              </el-form-item>

              <el-row :gutter="20" class="margin-bottom-10" v-if="needVerify">
                <el-col :span="12">
                  <el-form-item label="" prop="verifyCode">
                    <el-input type="text" size="large" v-model="loginForm.verifyCode" auto-complete="off" placeholder="验证码"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" >
                  <img src="/static/images/verifycode.jpg" class="img-responsive verify-code-image" title="点击重新获取验证码"/>
                </el-col>
              </el-row>

              <el-form-item class="margin-bottom-10" >
                <el-button type="primary" @click="loginSubmit('loginForm')" size="large" class="login-form-content-submit" v-show="!loginBtnLoading">登    录</el-button>
                <el-button type="primary" :loading="true" v-show="loginBtnLoading" size="large" class="login-form-content-submit">登    录   中...</el-button>
              </el-form-item>

              <el-form-item class="margin-0">
                <el-checkbox label="记住用户名" name="type"></el-checkbox>
              </el-form-item>

              <div class="help-block clearfix">
                <router-link :to="{name: ''}" class="pull-left">忘记密码？</router-link>
                <router-link :to="{name: ''}" class="pull-right">注册新账户</router-link>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <!--登录区域end-->
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  import header2 from '@/components/index/header2';
  import systemService from '@/services/systemService';
  import {loginExpiresTime} from '@/config/config';

  export default {
    created () {
      document.title = `欢迎登陆${title}`;
    },
    mounted () {
      // 两个云飘相关脚本
      let cloud1Position = 0;
      let cloud2Position = 600;
      let imgWith = 405;
      let maxPosition = $($('body')[0]).width();
      let speed = 50;
      let cloudMove = () => {
        $('#cloud1').css({'background-position': `${cloud1Position}px 60px`});
        $('#cloud2').css({'background-position': `${cloud2Position}px 200px`});
        if (cloud1Position < maxPosition) {
          cloud1Position += 1;
        } else {
          cloud1Position = -imgWith;
        }
        if (cloud2Position < maxPosition) {
          cloud2Position += 1;
        } else {
          cloud2Position = -imgWith;
        }
      };
      cloudMove();
      // 定义定时器
      this.loginCloudT = setInterval(cloudMove, speed);
    },
    destroyed() {
      // 清除定时器
      clearInterval(this.loginCloudT);
    },
    data () {
      return {
        showNotice: false,  // 显示提示信息
        noticeTxt: '',  // 提示信息
        needVerify: false,  // 显示验证码
        loginBtnLoading: false,  // 显示登录中按钮
        loginForm: {
          username: '',
          password: '',
          verifyCode: ''
        },
        loginRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
          verifyCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      loginSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 改变按钮状态
            this.loginBtnLoading = true;

            // 登录API
            let loginData = {'username': this.loginForm.username, 'password': this.loginForm.password, 'verifyCode': this.loginForm.verifyCode};
            systemService.login(loginData, false, true).then(({data}) => {
                this.loginBtnLoading = false;
                if (data.result_code === 0) { // 登录成功
                  this.showNotice = false;
                  // 保存用户信息
                  this.$cookie.set('userInfo', JSON.stringify(data.result_data), {expires: loginExpiresTime});  // 直接设置，不要直接调用store方法，这里要强制刷新cookies中的值
                  // 跳转
                  this.$router.push({name: 'wb_home'});
                } else {  // 登录失败
                  this.showNotice = true;
                  this.noticeTxt = data.result_data;
                }
            }, ({data}) => {
              this.loginBtnLoading = false;
            });
          } else {
            return false;
          }
        });
      }
    },
    components: {
      vHeader2: header2
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #login-app{
    width: 100%;
    height: 100%;
    min-height: 700px;
    background: url("/static/images/login_bg.jpg") no-repeat center center;
  }
  .login-container{
    background: rgba(0, 0, 0, 0.2);
    height: 100%;
    position: relative;
    .cloud{
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 4;
      background: url("/static/images/cloud.png") no-repeat;
    }
    .login-adv{
      position: absolute;
      top: 30%;
      left: 10%;
      z-index: 9;
      color: white;
      .login-adv-title{
        font-family: 幼圆;
        font-weight: bold;
        font-size: 60px;
        img{
          display: inline-block;
          width: 60px;
          height: 60px;
        }
      }
      p{
        font-size: 18px;
      }
    }
    .login-content{
      width: 100%;
      position: absolute;
      right: 0;
      top: 20%;
      z-index: 66;
      .login-form{
        height: auto;

        .login-rule-form{
          width: 80%;
          margin: 0 auto;
          height: 100%;
          display: block;
          max-width: 400px;
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(228,228,228,1);
          border-radius: 4px;
          box-shadow: 0 0 18px rgba(129,132,149,1);
          padding: 14px;
          .title{
            border-bottom: 2px solid #20a0ff;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .login-form-content{
            position: relative;
            .login-form-content-submit{
              width: 100%;
              margin: 0;
            }
            .verify-code-image{
              margin-top: 4px;
              cursor: pointer;
            }
            .login-form-error{
              width: 100%;
              color: #ff4949;
              border: 1px solid #ff4949;
              padding: 6px;
              background: #FEEEEB;
              i{
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
</style>
