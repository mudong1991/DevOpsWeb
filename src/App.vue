<template>
  <div id="app">
    <!-- 路由匹配到的组件将渲染在这里 -->
    <transition :name="transitionName">
      <router-view ></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {title} from 'config/config';
  import Vue from 'vue';
  import {MessageBox} from '@/utils/util';
  import {uniqueLogin, rootPath} from '@/config/config';

  export default {
    created () {
      document.title = title;
    },
    data () {
      return {
        transitionName: 'el-fade-in'
      };
    },
    methods: {
      fetchRoute () {
        // 检测单点登录
        let sessionid = this.$cookie.get('sessionid') || null;
        if (uniqueLogin && sessionid !== null) {
          // 不能使用systemService中的接口，所以直接调用
          Vue.axios.defaults.headers.common['Content-Type'] = 'application/json';
          Vue.axios.defaults.headers.common['Accept'] = 'application/json';
          Vue.axios.defaults.withCredentials = true;  // 带上cookie中的信息
          Vue.axios.defaults.timeout = 5000;
          Vue.axios({
            url: rootPath + '/api/checkUserIsLogin/',
            method: 'get',
            data: {},
            headers: {'sessionid': Vue.cookie.get('sessionid'), 'X-CSRFToken': Vue.cookie.get('csrftoken')}
          }).then(({data}) => {
            if (data.result_code === 1) {
              MessageBox.alert('亲爱的用户，您已经在其他终端登录！', {'cancel': () => {
                this.$cookie.delete('sessionid'); // 删除sessionid，重新登录
                this.$router.go(0);
              }}, () => {
                this.$cookie.delete('sessionid'); // 删除sessionid，重新登录
                this.$router.go(0);
              });
            }
          });
        }
      }
    },
    watch: {
      // 如果路由有变化执行这个方法
      '$route': 'fetchRoute'
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  #app{
    height: 100% !important;
  }
</style>
