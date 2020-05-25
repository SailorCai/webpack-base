/*
 * @Author: SailorCai
 * @Date: 2020-05-23 10:38:21
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-24 22:45:31
 * @FilePath: /webpack-ex/webpackDIY/lib/webpack.js
 */
const babelParser = require("@babel/parser");
const fs = require("fs");
const traverse = require("@babel/traverse").default;
const path = require("path");

const { transformFromAstSync } = require("@babel/core");

module.exports = class Webpck {
  constructor(options) {
    this.entry = options.entry;
    this.output = options.output;
    this.modules = [];
  }

  run() {
    const info = this.parse(this.entry);
    this.modules.push(info);
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];
      const { dependencies } = item;
      if (dependencies) {
        for (let k in dependencies) {
          this.modules.push(this.parse(dependencies[k]));
        }
      }
    }

    const obj = {};
    this.modules.forEach(item => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code
      };
    });
    this.file(obj);
  }

  parse(entryFile) {
    const content = fs.readFileSync(entryFile, "utf-8");
    const ast = babelParser.parse(content, {
      sourceType: "module"
    });

    const dependencies = {};
    traverse(ast, {
      ImportDeclaration({ node }) {
        const newPathName =
          "./" + path.join(path.dirname(entryFile), node.source.value);
        // console.log(newPathName);
        dependencies[node.source.value] = newPathName;
      }
    });
    const { code } = transformFromAstSync(ast, null, {
      presets: ["@babel/preset-env"]
    });
    // console.log(code);
    return {
      entryFile,
      dependencies,
      code
    };
  }

  file(code) {
    // 创建自运行函数，处理require，module,exports
    // 生成main.js => dist/main.js
    const filePath = path.join(this.output.path, this.output.filename);
    console.log(filePath);
    const newCode = JSON.stringify(code);
    const bundle = `(function(graph) {
      function require(module){
        var exports = {};
        var reRequire = function(path) {
          return require(graph[module].dependencies[path]);
        };
        (function(require, exports, content){
          console.log(JSON.stringify(require));
          eval(content);
        })(reRequire, exports, graph[module].code);
        return exports;
      }
      require('${this.entry}')
    })(${newCode})`;

    fs.writeFileSync(filePath, bundle, "utf-8");
  }
};

function f(a) {
  console.log(a);
  var f1 = function() {
    console.log(a + " inside");
  };
  (function(f2) {
    f2();
  })(f1);
}
f("haha");
