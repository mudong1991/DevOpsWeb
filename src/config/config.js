/* eslint-disable camelcase */

import router from '@/routers/index';
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
 * 配置接口访问地址
 * */
export const rootPath = 'http://127.0.0.1:8810'; // 根据实际业务填写

export const errHandler = ({response}) => {
  let showAlert = true;
  let layerTitle = '信息';
  let layerBtnTxt = '确认';
  let layerContent = '服务器内部异常';

  // 没网
  if (response === undefined) {
    layerTitle = '掉线了？';
    layerBtnTxt = '好的，我知道了';
    layerContent = '请确认网络是否连通，否则当前工作将会丢失';
  } else if (response.status === 404) {
    showAlert = false;
    router.push({'name': '404'});
  } else if (response.status === 500) {
    layerTitle = '服务走神啦！';
    layerBtnTxt = '原谅你';
    layerContent = '服务器内部异常了，我们会尽快修复的哟';
  }

  // layui 弹窗
  if (showAlert) {
    layui.use('layer', () => {
      let layer = layui.layer;
      layer.alert(layerContent, {
        title: layerTitle,
        icon: 5,
        btn: [layerBtnTxt]
      });
    });
    return false;
  }
};
