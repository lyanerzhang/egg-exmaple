
'use strict';
const Service = require('egg').Service;

class BillService extends Service {
  async add(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('bill', params);
      return result;
    } catch (error) {
      console.log('err', error);
      return null;
    }
  }
  async list(id) {
    const { app } = this;
    const QUERY_STR = 'id, pay_type, amount, date, type_id, type_name, remark';
    const sql = `select ${QUERY_STR} from bill where user_id = ${id}`;
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log('err', error);
      return null;
    }
  }
  async detail(id, user_id) {
    const { app } = this;
    try {
      const result = await app.mysql.get('bill', { id, user_id });
      return result;
    } catch (error) {
      console.log('err', error);
      return null;
    }
  }
  async update(params) {
    const { app } = this;
    try {
      const result = await app.mysql.update('bill', { ...params }, {
        id: params.id,
        user_id: params.user_id,
      });
      return result;
    } catch (error) {
      console.log('err', error);
      return null;
    }
  }
  async delete(id, user_id) {
    const { app } = this;
    try {
      const result = await app.mysql.delete('bill', {
        id,
        user_id,
      });
      return result;
    } catch (error) {
      console.log('err', error);
      return null;
    }
  }
  async types() {
    const { app } = this;
    try {
      const QUERY_STR = 'id, name, type, user_id';
      const sql = `select ${QUERY_STR} from type`;
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log('err', error);
      return null;
    }
  }
}

module.exports = BillService;
