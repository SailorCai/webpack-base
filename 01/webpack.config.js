/*
 * @Author: SailorCai
 * @Date: 2020-05-07 21:00:52
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-07 22:43:40
 * @FilePath: /01/webpack.config.js
 */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// webpack 是基于nodejs的
const path = require("path");
module.exports = {
  // 上下文，项目打包的相对路径
  context: process.cwd(),
  // 入口 执行构建的入口 项目入口 支持三总类型的值--字符创、数组、对象
  entry: "./src/index.js",
  // entry: ["./src/index.js", "./src/other.js"],
  // entry: {
  //   // 多页项目配置
  //   index: "./src/index.js",
  //   other: "./src/other.js"
  // },
  // 出口
  output: {
    // 构建的文件资源放在哪？必须是绝对路径
    path: path.resolve(__dirname, "./dist"),
    // 生成的文件叫什么？
    // filename: "main.js"
    // 无论是多出口还是单出口 都推荐使用占位符
    filename: "[name]-[hash:6].js"
    /**
     * 占位符:
     * hash -->整个项目的hash值，每构建一次 就会有一个新的hash值
     * chunkhash -->根据不同入口进行依赖分析，构建对应的chunk，生成相应的hash，只要组成entry的的模块没有内容变动，则对应的hash不变
     * name
     * id
     */
  },
  // 构建模式 none production development
  mode: "production",

  // 插件 这个机制与案例是作用于webpack整个打包周期的
  plugins: [new CleanWebpackPlugin()],

  /**
   * webpack默认只支持.json和.js模块 不支持其他类型的模块 因此需要loader来处理非js模块
   */
  // 处理不认识的模块
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader的执行顺序是从后往前
        // css-loader 言简意赅 是把css模块的内容加到 js模块中去
        // css in js方式

        // style-loader 从js中提取css的loader 在html中创建style标签把css内容放进去
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};

/**
 * 1chunk = 1bundle
 * chunk是“代码块”的意思
 * 只有对象方式配置entry才是多页配置
 *
 * entry是数组的时候
 * webpack会自动生成另外一个入口模块，并将数组中的每个指定的文件加载进来，并将最后一个模块的module.exports作为入口模块的module.exports导出
 *
 * 几个入口就会有几个chunk
 *
 * plugin和loader的区别
 * plugin是用来干预打包的各个生命周期，在适合的生命周期做自己想做的事，loader是用来处理各种非js模块
 * plugin是个类，loader是一个函数
 */
