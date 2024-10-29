
'use strict';
/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1693911916532_2254';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: 'app/public/upload',
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };
  // 配置ejs
  config.view = {
    // 会将view文件夹下的.html的文件识别成 .ejs
    mapping: { '.html': 'ejs' }, // 会将.ejs的后缀改成.html的后缀
  };
  // 配置jwt
  config.jwt = {
    secret: 'Nick',
  };

  config.multipart = {
    mode: 'file',
    fileSize: '10mb',
  };

  // 允许跨域
  config.cors = {
    origin: '*',
    credentials: true, // 允许cookie跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // 配置mysql
  exports.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '12345678',
      database: 'ly_data',
    },
    app: true,
    agent: false,
  };

  return {
    ...config,
    ...userConfig,
  };
};
