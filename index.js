/*
 * Author: yPangXie <pangxie.wdy@gmail.com>
 * Date: 2015-07-04
 * Des: koa中间件, 占位图
 */

"use strict";

const url = require('url');
const qs = require('querystring');
const debug = require('debug')('koa-image-placeholder');

module.exports = function(options) {
    let opts = options || {};

    let svgObj = {
        alignPosStartX: 0,
        alignPosStartY: 0,
        rectColor: opts.rectColor || '#EEEEEE',
        fontSize: opts.fontSize || '12',
        fontColor: opts.fontColor || '#AAAAAA',
        io: opts.io || "n"
    };

    let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" preserveAspectRatio="none"> +' +
        '<rect width="{width}" height="{height}" fill="{rectColor}" /> +' +
        '<text text-anchor="start" x="10" y="20" style="fill:{fontColor};font-weight:bold;font-size:{fontSize}px;font-family:Arial,Helvetica,sans-serif;dominant-baseline:central">{text}</text> +' +
        '<text text-anchor="middle" x="{alignPosStartX}" y="{alignPosStartY}" style="fill:{fontColor};font-weight:bold;font-size:{fontSize}px;font-family:Arial,Helvetica,sans-serif;dominant-baseline:central">{size}</text> +' +
    '</svg>';

    return function *(next){
        let parsedURL = url.parse(this.url);
        let queryObj = qs.parse(parsedURL.query || "");
        debug('query: %o', queryObj);
        
        /* 根据query中的数据, 重置配置信息 */
        let size = queryObj.size ? queryObj.size.split('x') : [];
        if(size.length != 2) {
            return yield next;
        }

        try {
            svgObj.text = queryObj.text ? decodeURIComponent(queryObj.text) : '';
        } catch(e) {
            svgObj.text = queryObj.text || '';
        }
        svgObj.rectColor = queryObj.bg && /[A-F0-9]/.test(queryObj.bg) ? '#' + queryObj.bg : svgObj.rectColor;
        svgObj.fontColor = queryObj.fc && /[A-F0-9]/.test(queryObj.fc) ? '#' + queryObj.fc : svgObj.fontColor;
        svgObj.width = size[0];
        svgObj.height = size[1];
        svgObj.size = svgObj.width + 'x' + svgObj.height;
        svgObj.alignPosStartX = svgObj.width / 2;
        svgObj.alignPosStartY = svgObj.height / 2;

        /* 当io(image only)为'y'时, 只显示站位图, 其他任何文字类的信息都不展示 */
        if(queryObj.io == "y") {
            svgObj.text = "";
            svgObj.size = "";
        }
        debug("svg config: %o", svgObj);
        
        this.type = 'image/svg+xml';
        this.body = svg.replace(/\{.*?\}/g, function(matched) {
            let key = matched.replace(/[\{\}]/g, '');
            return svgObj[key];
        });
    }
}
