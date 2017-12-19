/* eslint-disable camelcase */

// import router from '@/routers/index';
// import {MessageBox} from 'element-ui';
/**
 * 项目全局配置文件
 * Created by mudong on 2017/9/30 0030.
 */

/**
 * 网站页面相关配置
 * */
export const title = '阿东开发云'; // 页面标题
export const copyright = '东风残雪@版权所有';  // 页面版权

/**
 * 登录认证控制
 * */
export const loginExpiresTime = '10m';  // 如果用户没有选择保持登录，前端设置登录超时时长（后端会设置会话超时时长，一般为1天，主要看后端设置）
export const indexSessionExpiresAutoCheck = false;  // 介绍系列网页，是否启动登录session自动检测，后端默认是有的。
export const uniqueLogin = true;  // 是否启用用户单点登录

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
  let parseErrorResponse = (response) => {
    let errorData = parseErrorMessage(response);
    if (errorData instanceof Array) {
      return Array.map(errorData, (item) => {
        if (item === Array) {
          item = item[0];
        }

        let errorKeyItem = Object.values(item);

        return Array.map(errorKeyItem, (keyItem) => {
          return `<span style="color: red">${keyItem}</span><br>`;
        }).join('');
      }).join('');
    } else if (errorData instanceof Object) {
      return Array.map(Object.values(errorData), (item) => {
        return `<span style="color: red">${item}</span><br>`;
      }).join('');
    } else {
      return errorData;
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
  } else if (response.status === 403) {  // 没有权限访问接口
    layerTitle = '权限不足！';
    layerBtnTxt = '好的';
    layerContentCode = '响应403';
    layerContent = '您没有权限访问该接口，请联系管理员！';
  } else if (response.status === 404) {  // 接口访问错误
    layerTitle = '接口错误！';
    layerBtnTxt = '原谅你';
    layerContentCode = '响应404';
    layerContent = '没有该接口，我们会尽快修复的哟';
  } else if (response.status === 500) {  // 接口异常
    layerTitle = '操作失败！';
    layerBtnTxt = '好的';
    layerContent = `<span style="color: red">${parseErrorMessage(response)}</span>`;

    showAlert = false;
    layui.use('layer', () => {
      let layer = layui.layer;

      layer.alert(`操作失败, 错误原因: <br/>${layerContent}`, {
        title: '操作失败！',
        icon: 5,
        btn: ['确定']
      });
    });

    // layerTitle = '服务走神啦！';
    // layerBtnTxt = '原谅你';
    // layerContentCode = '响应500';
    // layerContent = '服务器内部异常了，我们会尽快修复的哟';
    // layui.use('layer', () => {
    //   let layer = layui.layer;
    //
    //   layer.confirm(`服务器内部异常了，我们会尽快修复的哟<br />错误原因: <span style="color: red">${layerContentCode}</span>`, {
    //     title: '服务器走神啦！',
    //     skin: 'layui-more-btn-custom',
    //     btn: ['查看详情', '原谅你一次']
    //   }, () => {
    //     layer.closeAll();
    //     layer.open({
    //       type: 1,
    //       title: '错误详情',
    //       area: ['70%; max-width: 480px', 'auto; max-height: 360px'],
    //       content: `<pre style="padding: 10px 20px; border: none; background: transparent">${parseErrorMessage(response)}</pre>`,
    //       btn: ['请尽快解决']
    //     });
    //   });
    // });
  } else {
    layerTitle = '操作失败！';
    layerBtnTxt = '好的';
    layerContent = parseErrorResponse(response);

    showAlert = false;
    layui.use('layer', () => {
      let layer = layui.layer;

      layer.alert(`操作失败, 错误原因: <br/>${layerContent}`, {
        title: '操作失败！',
        icon: 5,
        btn: ['好的']
      });
    });
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

/**
 * 和风天气接口和密钥
 * */
export const locationIP = returnCitySN.cip;

/**
 * 数据表格相关设置
 * */
export const defaultPageSize = 10;
export const defaultPageSizeList = [6, 10, 15, 20];
export const defaultPageModel = {pageNo: 1, pageSize: 10, totalCount: 0};
