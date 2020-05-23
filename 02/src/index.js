/*
 * @Author: SailorCai
 * @Date: 2020-05-16 19:28:04
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-05-17 21:38:52
 * @FilePath: /webpack-ex/02/src/index.js
 */
import "../assets/font/iconfont.js";
import "../assets/font/iconfont.css";
import "./index.less";
const axios = require("axios");
// import avatar from "./images/avatar.jpeg";
// const image = new Image();
// image.src = avatar;
// consol.log(888);
axios.get("/api/info").then(res => {
  console.log(res);
});
const span = document.createElement("span");
span.className = "iconfont iconshouji";
// document.body.appendChild(image);
document.body.appendChild(span);
console.log(666);
var btn = document.createElement("button");
btn.innerHTML = "新增";
document.body.appendChild(btn);
btn.onclick = function() {
  var div = document.createElement("div");
  div.innerHTML = "item";
  document.body.appendChild(div);
};
// import "@babel/polyfill";
/* const arr = [new Promise(() => {}), new Promise(() => {})];
arr.map(item => {
  console.log(item);
}); */
import React, { Component } from "react";
import ReactDom from "react-dom";
class App extends Component {
  render() {
    return <div>hello world</div>;
  }
}
ReactDom.render(<App />, document.getElementById("app"));
