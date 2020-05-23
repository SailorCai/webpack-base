/*
 * @Author: SailorCai
 * @Date: 2020-05-17 21:46:16
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-17 22:09:40
 * @FilePath: /webpack-ex/02/webpack.config.dev.js
 */

const baseConfig = require("./webpack.config.base.js");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = merge(baseConfig, {
  mode: "development",
  // devtool: "cheep-module-source-map"
  devtool: "cheep-inline-source-map",
  devServer: {
    // 可以使相对路径
    contentBase: path.resolve(__dirname, "./dist"),
    open: false,
    hot: true,
    // 即便HMR没有生效，浏览也不要自动刷新
    hotOnly: true,
    port: 8080,
    /* proxy: {
      "/api": {
        target: "http://localhost:8090",
        pathRewrite: { "^/api": "" }
      }
    }, */
    before(app) {
      app.get("/api/info", (req, res) => {
        res.json({
          hello: "world"
        });
      });
    }
  },
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "页面标题",
      template: "./index.html",
      filename: "index.html",
      // true/body, head
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
