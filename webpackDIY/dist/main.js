(function(graph) {
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
      require('./src/index.js')
    })({"./src/index.js":{"dependencies":{"./a.js":"./src/a.js"},"code":"\"use strict\";\n\nvar _a = _interopRequireDefault(require(\"./a.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n/*\n * @Author: SailorCai\n * @Date: 2020-05-23 10:38:35\n * @LastEditors: SailorCai\n * @LastEditTime: 2020-05-23 10:50:18\n * @FilePath: /webpack-ex/webpackDIY/src/index.js\n */\nconsole.log(\"index\");\n(0, _a[\"default\"])();"},"./src/a.js":{"dependencies":{"./b.js":"./src/b.js","./c.js":"./src/c.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = _default;\n\nvar _b = _interopRequireDefault(require(\"./b.js\"));\n\nvar _c = _interopRequireDefault(require(\"./c.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n/*\n * @Author: SailorCai\n * @Date: 2020-05-23 10:39:18\n * @LastEditors: SailorCai\n * @LastEditTime: 2020-05-23 10:49:51\n * @FilePath: /webpack-ex/webpackDIY/src/a.js\n */\nconsole.log(_b[\"default\"] + _c[\"default\"]);\n\nfunction _default() {\n  console.log(\"hello, webpack bundle!!!!\");\n}"},"./src/b.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\n/*\n * @Author: SailorCai\n * @Date: 2020-05-23 10:39:24\n * @LastEditors: SailorCai\n * @LastEditTime: 2020-05-23 10:39:49\n * @FilePath: /webpack-ex/webpackDIY/src/b.js\n */\nvar _default = \"b\";\nexports[\"default\"] = _default;"},"./src/c.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\n/*\n * @Author: SailorCai\n * @Date: 2020-05-23 10:40:02\n * @LastEditors: SailorCai\n * @LastEditTime: 2020-05-23 10:40:14\n * @FilePath: /webpack-ex/webpackDIY/src/c.js\n */\nvar _default = \"c\";\nexports[\"default\"] = _default;"}})