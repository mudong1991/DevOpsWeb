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

  // 检查登录，登录成功得到用户信息
  getUserInfoBySession(data, diyError, diyLoading) {
    return xhr({
      url: '/api/getUserInfoBySession',
      method: 'get',
      data,
      diyError,
      diyLoading
    });
  }
}

export default new SystemService();
