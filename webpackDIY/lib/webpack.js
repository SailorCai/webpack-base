/*
 * @Author: SailorCai
 * @Date: 2020-05-24 23:02:29
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-25 08:24:00
 * @FilePath: /webpack-ex/webpackDIY/lib/webpack.js
 */
// parser用于静态文件解析，抽象生成语法树ast
const babelParser = require("@babel/parser");
const { transformFromAstSync } = require("@babel/core");
const traverse = require("@babel/traverse").default;
const fs = require("fs");
const path = require("path");

module.exports = class Webpack {
  constructor(options) {
    this.entry = options.entry;
    this.output = options.output;
  }

  run() {
    const info = this.parse(this.entry);
    const modules = [];
    modules.push(info);
    for (let i = 0; i < modules.length; i++) {
      const dependencies = modules[i].dependencies;
      if (dependencies) {
        for (const key in dependencies) {
          if (dependencies.hasOwnProperty(key)) {
            const entryPath = dependencies[key];
            modules.push(this.parse(entryPath));
          }
        }
      }
    }
    var obj = {};
    modules.forEach(item => {
      obj[item.entryFile] = item;
    });
    this.generator(obj);
  }

  parse(entryFile) {
    const content = fs.readFileSync(entryFile, "utf-8");
    const ast = babelParser.parse(content, {
      sourceType: "module"
    });
    const dependencies = {};
    traverse(ast, {
      ImportDeclaration({ node }) {
        const newPath = path.join(path.dirname(entryFile), node.source.value);
        dependencies[node.source.value] = newPath;
      }
    });

    const { code } = transformFromAstSync(ast, null, {
      presets: ["@babel/preset-env"]
    });

    return {
      entryFile,
      code,
      dependencies
    };
  }

  generator(code) {
    code = JSON.stringify(code);
    const content = `(function(code){
      function require(filePath){
        var exports = {};
        function reRequire(path) {
          return require(code[filePath].dependencies[path]);
        };
        var content = code[filePath].code;
        (function(require, exports, filePath){
          eval(content);
        })(reRequire, exports, content)        
        return exports;
      }
      require('${this.entry}');
    })(${code})`;
    fs.writeFileSync(
      path.join(this.output.path, this.output.filename),
      content,
      "utf-8"
    );
  }
};
