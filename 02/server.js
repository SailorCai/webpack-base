/*
 * @Author: SailorCai
 * @Date: 2020-05-17 09:49:52
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-17 09:59:03
 * @FilePath: /webpack-ex/02/server.js
 */

const express = require("express");
const app = express();

app.get("/info", (req, res) => {
  res.json({
    hello: "express"
  });
});

app.listen(8090);
