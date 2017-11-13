/**
 * Created by mudong on 2017/10/18 0018.
 */
import xhr from './xhr/xhr';

class SystemSettingsService {
  // 获取用户列表
  getUserList (data, diyError, diyLoading) {
    return xhr({url: '/api/users', method: 'get', data, diyError, diyLoading});
  }

  // 添加用户
  addUser (data, extraParams, diyError, diyLoading) {
    return xhr({url: '/api/users', method: 'post', data, extraParams: extraParams, diyError, diyLoading});
  }
}

export default new SystemSettingsService();
