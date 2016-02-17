# koa-image-placeholder

一个简单的koa中间件, 用于生成占位图.

## 安装

```javascript
npm install koa-image-placeholder --save
```

## 参数说明

 - `rectColor`: 图片背景色(默认: `#EEEEEE`)
 - `fontSize`:  字体大小(默认: `12`)
 - `fontColor`: 字体颜色(默认: `#AAAAAA`)
 - `io`: 是否只展示占位图, 不展示任何其他的信息(默认: `n`)

## URL配置

注册一个路由来响应中间件的占位图返回值(参照下方的示例代码).

`url`的`query`接收四个参数

 - `size`(必须): 图片尺寸, 格式`widthxheight`(100x100).
 - `text`(可选): 图片上展示的文字
 - `bg`(可选): 图片背景色, `aabbcc`格式, 不带#
 - `fc`(可选): 图片上展示的文字颜色, `aabbcc`格式, 不带#
 - `io`(可选): `image only`, 若设置为`y`, 则文字以及尺寸信息将不再展示, fc设置也将无效, 只展示一个纯色的占位图(默认不包含该参数)

例: `/placeholder?size=200x200&text=妈个蛋&bg=000&fc=FFF`

## 示例代码

```javascript
"use strict";

const url = require('url');
const koa = require('koa');
const router = require('koa-router');
const imagePlaceholder = require('../index');
const app = koa();

app.use(router(app));

app.get('/placeholder', imagePlaceholder({
    rectColor: '#333',
    fontSize: '10',
    fontColor: '#FFF'
}));

app.get('/home', function *() {
    this.body = '<h1>Home</h1><img src="/placeholder?size=300x300&text=妈个蛋&bg=000&fc=FFF" />'
});

app.listen(8080);

```

## DEBUG

```javascript
DEBUG=koa-image-placeholder
```