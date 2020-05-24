/*
 * @Author: SailorCai
 * @Date: 2020-05-23 10:57:43
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-23 11:01:02
 * @FilePath: /webpack-ex/webpackDIY/bundle.js
 */

const Webpack = require("./lib/webpack.js");

const options = require("./webpack.config.js");
webpack = new Webpack(options);

webpack.run();
