
'use strict';
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const mkdirp = require('mkdirp');

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0]; // 表示获取第一个文件
    let uploadDir = ''; // 存放资源路径;
    try {
      const f = fs.readFileSync(file.filepath);
      const day = moment(new Date()).format('YYYYMMDD');
      const dir = path.join(this.config.uploadDir, day); // 图片保存路径
      const date = Date.now(); // 毫秒数
      await mkdirp(dir); // 不存在 即创建目录
      uploadDir = path.join(dir, date + path.extname(file.filename));
      fs.writeFileSync(uploadDir, f); // 写入文件夹
    } catch (error) {
      ctx.cleanupRequestFiles();
    }
    ctx.body = {
      code: 200,
      msg: '上传成功',
      data: uploadDir.replace(/app/g, ''),
    };
  }
}

module.exports = UploadController;
