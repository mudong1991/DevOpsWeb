/**
 * Created by mudong on 2017/10/18 0018.
 */
import xhr from './xhr/xhr';

class BaseService {
  // 登录
  login(data, diyError, diyLoading) {
    return xhr({url: '/api/login', method: 'post', data, diyError, diyLoading});
  }

  // 退出
  logout(data, diyError, diyLoading) {
    return xhr({url: '/api/logout', method: 'post', data, diyError, diyLoading});
  }

  // 获取验证码
  getVerfiy(data, diyError = true, diyLoading = true) {
    return xhr({url: '/api/getVerify', method: 'get', data, diyError, diyLoading});
  }

  // 获取用户信息（没有登录返回空）
  checkUserInfo(data, diyError, diyLoading) {
    return xhr({url: '/api/checkUserInfo', method: 'get', data, diyError, diyLoading});
  }

  // 验证用户密码
  checkUserPassword(data, diyError, diyLoading) {
    return xhr({url: '/api/checkUserPassword', method: 'post', data, diyError, diyLoading});
  }

  // 单点登录验证
  checkUserIsLogin(data, diyError, diyLoading) {
    return xhr({url: '/api/checkUserIsLogin', method: 'get', data, diyError, diyLoading});
  }

  // 天气数据获取
  getWeather(data, diyError, diyLoading) {
    return xhr({url: '/api/getNowWeather', method: 'get', data, diyError, diyLoading});
  }
}

export default new BaseService();
