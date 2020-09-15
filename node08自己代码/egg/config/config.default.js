/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1599811533821_9678'

  // add your middleware config here
  config.middleware = ['errorHandler']
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: '开课吧接⼝',
      description: '开课吧接⼝ swagger-ui for egg',
      version: '1.0.0',
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    enableSecurity: false,
    // enableValidate: true, //接口实现validate
    routerMap: true, //自动注册路由
    enable: true,
  }
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/shop',
    options: {
      // useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  }
  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: /^\/api/, // optional 以api大头的就要鉴权
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
  }
}
