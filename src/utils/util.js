/**
 * Created by mudong on 2016/12/30.
 * 包含了一些封装
 */

/**
 * 工具函数
 * */
class Util {
  parseParam(param) {
    if (param) {
      let arr = [];
      for (let key in param) {
        if (param[key] !== undefined && (param[key] + '')) {
          arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(param[key]));
        }
      }
      return arr.join('&');
    }
    return '';
  }

  cloneObject(obj) {
    if (typeof obj === 'object') {
      if (obj instanceof Array) {
        let newArr = [];
        for (let i = 0; i < obj.length; i++) newArr.push(obj[i]);
        return newArr;
      } else {
        let newObj = {};
        for (let key in obj) {
          newObj[key] = this.cloneObject(obj[key]);
        }
        return newObj;
      }
    } else {
      return obj;
    }
  };
}
export default new Util();

/**
 * 弹窗组件封装
 * */
export const MessageBox = {
  alert(content, extraParams = {}) {
    layui.use('layer', () => {
      let layer = layui.layer;
      layer.alert(
        content,
        extraParams,
        ...Array.from(arguments).slice(2)
      );
    });
  },
  confim(content, extraParams = {}) {
    layui.use('layer', () => {
      let layer = layui.layer;
      layer.confirm(
        content,
        extraParams,
        ...Array.from(arguments).slice(2)
      );
    });
  },
  open(params = {}) {
    layui.use('layer', () => {
      let layer = layui.layer;
      layer.open(params);
    });
  },
  close(index) {
    layui.use('layer', () => {
      let layer = layui.layer;
      layer.close(index);
    });
  },
  closeAll() {
    layui.use('layer', () => {
      let layer = layui.layer;
      layer.closeAll();
    });
  }
};
