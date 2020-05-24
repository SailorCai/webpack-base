/*
 * @Author: SailorCai
 * @Date: 2020-05-23 10:39:04
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-23 10:59:54
 * @FilePath: /webpack-ex/webpackDIY/webpack.config.js
 */

const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js"
  }
};
