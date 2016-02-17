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
    /* ,io: 'y' */
}));

app.get('/home', function *() {
    this.body = '<h1>Home</h1><img src="/placeholder?size=300x300&text=Hello Home, %E4%BD%A0%E5%A5%BD" />';
    /*
    io初始化为'y'时, 文字信息全部不会生效
    this.body = '<h1>Home</h1><img src="/placeholder?size=300x300&text=Hello Home, %E4%BD%A0%E5%A5%BD" />';

    io默认值为'n'时, url中增加io=y参数, 则所有文字信息不会生效
    this.body = '<h1>Home</h1><img src="/placeholder?size=300x300&io=y&text=Hello Home, %E4%BD%A0%E5%A5%BD" />';
    */
});

app.listen(8080);