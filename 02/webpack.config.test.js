/*
 * @Author: SailorCai
 * @Date: 2020-05-17 22:17:03
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-17 22:31:02
 * @FilePath: /webpack-ex/02/webpack.config.test.js
 */
const baseConfig = require("./webpack.config.base.js");
const merge = require("webpack-merge");
const prodConfig = require("./webpack.config.prod.js");
const devConfig = require("./webpack.config.dev.js");

console.log(process.env.NODE_ENV);

module.exports = env => {
  // 如果外部传入env.production是生产
  // 否则是开发
  if (env && env.production) {
    return merge(baseConfig, prodConfig);
  } else {
    return merge(baseConfig, devConfig);
  }
};
