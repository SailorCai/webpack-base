/*
 * @Author: SailorCai
 * @Date: 2020-05-16 19:29:15
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-17 21:41:53
 * @FilePath: /webpack-ex/02/webpack.config.js
 */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.[hash:6].js"
  },
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      },
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
  devtool: "none",
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
  plugins: [
    new CleanWebpackPlugin(),
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
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
