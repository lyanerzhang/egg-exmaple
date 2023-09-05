const Service = require('egg').Service;
class HomeService extends Service {
  // 假设从数据库获取数据
  async user() {
    return {
      name: 'Lucy',
      slogen: '难',
    };
  }
}
module.exports = HomeService;
