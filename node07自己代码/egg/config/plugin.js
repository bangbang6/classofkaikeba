'use strict'

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  //插件使用
  sequelize: { enable: true, package: 'egg-sequelize' },
}
