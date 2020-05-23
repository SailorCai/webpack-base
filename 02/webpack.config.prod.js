/*
 * @Author: SailorCai
 * @Date: 2020-05-17 21:46:31
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-17 22:10:38
 * @FilePath: /webpack-ex/02/webpack.config.prod.js
 */

const baseConfig = require("./webpack.config.base.js");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require("cssnano"), //引⼊入cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash:6].css"
    }),
    new HtmlWebpackPlugin({
      title: "页面标题",
      template: "./index.html",
      filename: "index.html",
      // true/body, head
      inject: true,
      minify: {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCss: true // 压缩内联css
      }
    })
  ]
});
