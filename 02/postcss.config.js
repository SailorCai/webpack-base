/*
 * @Author: SailorCai
 * @Date: 2020-05-16 19:42:40
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-17 08:37:13
 * @FilePath: /webpack-ex/02/postcss.config.js
 */

const autoprefixer = require("autoprefixer");
module.exports = {
  plugins: [
    autoprefixer({
      overrideBrowserslist: ["last 2 versions", ">1%"]
    })
  ]
};
