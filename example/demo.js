/*
 * Author: yPangXie <pangxie.wdy@gmail.com>
 * Date: 2015-07-04
 * Des: demo
 */

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
    this.body = '<h1>Home</h1><img src="/placeholder?size=300x300&text=Hello Home, %E4%BD%A0%E5%A5%BD" />'
});

app.listen(8080);