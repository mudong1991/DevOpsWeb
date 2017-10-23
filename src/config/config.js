/* eslint-disable camelcase */

// import router from '@/routers/index';
// import {MessageBox} from 'element-ui';
/**
 * 项目全局配置文件
 * Created by mudong on 2017/9/30 0030.
 */

export const routerChangeTime = 100; // 路由切换延迟时间

/**
 * 网站页面相关配置
 * */
export const title = '四方开发云'; // 页面标题
export const copyright = '东风残雪@版权所有';  // 页面版权

/**
 * 登录有效时间
 * */
export const loginExpiresTime = '20m';  // Y M D h m s 单位
export const userNoOperationLogout = true; // 配置该项表示，监听用户认证是否过期，弹窗退出。

/**
 * 配置接口访问地址
 * */
export const rootPath = 'http://127.0.0.1:8810'; // 根据实际业务填写

export const errHandler = ({response}) => {  // API错误处理函数
  let showAlert = true;
  let layerTitle = '信息';
  let layerBtnTxt = '确认';
  let layerContentCode = '未知';
  let layerContent = '服务器内部异常';

  /*
   * 解析后台传给前端的错误信息
   * 这里可以根据自己后台的错误信息来进行自定义
   * */
  let parseErrorMessage = (response) => {
    if (response.hasOwnProperty('data')) {
      return response.data;
    }
    if (response.hasOwnProperty('responseText')) {
      let data = $.parseJSON(response.responseText);
      if (data.hasOwnProperty('msg')) {
        return data.msg;
      }
      if (data.hasOwnProperty('detail')) {
        return data.detail;
      }
      if (data.hasOwnProperty('message')) {
        return data.message;
      }
    }
  };

  if (response === undefined) { // 没网
    layerTitle = '掉线了？';
    layerBtnTxt = '好的，我知道了';
    layerContentCode = '服务连接失败！';
    layerContent = '请确认网络是否连通，否则当前工作将会丢失';
  } else if (response.status < 200) {
    layerTitle = '接口未响应！';
    layerBtnTxt = '确认';
    layerContentCode = `响应${response.status}`;
    layerContent = '接口未响应';
  } else if (response.status === 404) {  // 接口访问错误
    layerTitle = '接口错误！';
    layerBtnTxt = '原谅你';
    layerContentCode = '响应404';
    layerContent = '接口访问失败啦，我们会尽快修复的哟';
  } else if (response.status === 500) {  // 接口异常
    layerTitle = '服务走神啦！';
    layerBtnTxt = '原谅你';
    layerContentCode = '响应500';
    layerContent = '服务器内部异常了，我们会尽快修复的哟';

    showAlert = false;
    layui.use('layer', () => {
      let layer = layui.layer;

      layer.confirm(`服务器内部异常了，我们会尽快修复的哟<br />错误原因: <span style="color: red">${layerContentCode}</span>`, {
        title: '服务器走神啦！',
        skin: 'layui-more-btn-custom',
        btn: ['查看详情', '原谅你一次']
      }, () => {
        layer.closeAll();
        layer.open({
          type: 1,
          title: '错误详情',
          area: ['70%; max-width: 480px', 'auto; max-height: 360px'],
          content: `<pre style="padding: 10px 20px; border: none; background: transparent">${parseErrorMessage(response)}</pre>`,
          btn: ['请尽快解决']
        });
      });
    });
  } else {
    layerTitle = '接口响应错误！';
    layerBtnTxt = '确认';
    layerContentCode = `响应${response.status}`;
    layerContent = '接口响应错误';
  }

  // layui 弹窗
  if (showAlert) {
    layui.use('layer', () => {
      let layer = layui.layer;
      layer.alert(`${layerContent}<br />错误原因: <span style="color: red">${layerContentCode}</span>`, {
        title: `${layerTitle}`,
        icon: 5,
        btn: [layerBtnTxt]
      });
    });
    return false;
  }
};
