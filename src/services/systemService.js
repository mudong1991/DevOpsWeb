/**
 * Created by mudong on 2017/10/18 0018.
 */
import xhr from './xhr/xhr';

class SystemService {
  // 登录
  login(data, diyLoading) {
    return xhr({
      url: '/api/login',
      method: 'delete',
      data,
      diyLoading
    });
  }
}

export default new SystemService();
