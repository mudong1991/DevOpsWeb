/**
 * Created by mudong on 2017/10/18 0018.
 */
import xhr from './xhr/xhr';

class SystemService {
  // 登录
  login(data, diyError, diyLoading) {
    return xhr({
      url: '/api/login',
      method: 'post',
      data,
      diyError,
      diyLoading
    });
  }
  // 获取验证码
  getVerfiy(data, diyError = true, diyLoading = true) {
    return xhr({
      url: '/api/getVerify',
      method: 'get',
      data,
      diyError,
      diyLoading
    });
  }

  // 根据生成的用户session查用户信息
  getUserInfoBySession(data, diyError, diyLoading) {
    return xhr({
      url: '/api/getUserInfoBySession',
      method: 'get',
      data,
      diyError,
      diyLoading
    });
  }

  // 根据用户id查用户信息
  getUserInfoById(data, diyError, diyLoading) {
    return xhr({
      url: '/api/getUserInfoById',
      method: 'get',
      data,
      diyError,
      diyLoading
    });
  }
}

export default new SystemService();
