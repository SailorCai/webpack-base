/*
 * @Author: SailorCai
 * @Date: 2020-05-16 19:29:15
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-17 22:24:12
 * @FilePath: /webpack-ex/02/webpack.config.base.js
 */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.[hash:6].js"
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|gif|png)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 2048,
            name: "[name]-[contenthash:6].[ext]",
            outputPath: "images/"
          }
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            outputPath: "fonts/",
            name: "[name]-[contenthash:6].[ext]"
          }
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    // 查找第三方以来限定在当前目录的node_modules
    modules: [path.resolve(__dirname, "./node_modules")],
    alias: {
      "@": path.resolve(__dirname, "./src")
      // react: "./node_modules/react/umd/react.production.min.js",
      // "react-dom": "./node_modules/react-dom/umd/react-dom.production.min.js"
    },
    extensions: [".js", ".json", ".jsx", ".ts"]
  },
  plugins: [new CleanWebpackPlugin()]
};
