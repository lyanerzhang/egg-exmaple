const Service = require('egg').Service;
class HomeService extends Service {
  async user() {
    const { ctx, app } = this;
    const QUERY_STR = 'id, username';
    const sql = `select ${QUERY_STR} from user`;
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      return null;
    }
  }
  async addUser(username, password, signature) {
    const { ctx, app } = this;
    try {
      // 新增一条
      const result = await app.mysql.insert('user', {
        username,
        password,
        signature,
      });
      return result;
    } catch (error) {
      return null;
    }
  }
  // 编辑接口
  async editUser(id, username, password, signature) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.update('user', { username, password, signature }, {
        where: {
          id,
        },
      });
      return result;
    } catch (error) {
      return null;
    }
  }
  // 删除接口
  async deleteUser(id) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.delete('user', { id });
      return result;
    } catch (error) {
      return null;
    }
  }
}
module.exports = HomeService;
