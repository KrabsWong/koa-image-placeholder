# koa-image-placeholder

一个简单的koa中间件, 用于生成占位图.

## 安装

```javascript
npm install koa-image-placeholder --save
```

## 参数说明

### rectColor {String}

图片背景色(默认: `#EEEEEE`)

### fontSize {String}

字体大小(默认: `12`)

### fontColor {String}

字体颜色(默认: `#AAAAAA`)

## URL配置

注册一个路由来响应中间件的占位图返回值(参照下方的示例代码).

`url`的`query`接收四个参数

 - `size`(必须): 图片尺寸, 格式`widthxheight`(100x100).
 - `text`(可选): 图片上展示的文字
 - `bg`(可选): 图片背景色, `aabbcc`格式, 不带#
 - `fc`(可选): 图片上展示的文字颜色, `aabbcc`格式, 不带#

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