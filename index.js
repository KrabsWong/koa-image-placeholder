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
        fontColor: opts.fontColor || '#AAAAAA'
    };

    let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" preserveAspectRatio="none"> +' +
        '<rect width="{width}" height="{height}" fill="{rectColor}" /> +' +
        '<text text-anchor="start" x="10" y="20" style="fill:{fontColor};font-weight:bold;font-size:{fontSize}px;font-family:Arial,Helvetica,sans-serif;dominant-baseline:central">{text}</text> +' +
        '<text text-anchor="middle" x="{alignPosStartX}" y="{alignPosStartY}" style="fill:{fontColor};font-weight:bold;font-size:{fontSize}px;font-family:Arial,Helvetica,sans-serif;dominant-baseline:central">{width}x{height}</text> +' +
    '</svg>';

    return function *(next){
        let parsedURL = url.parse(this.url);
        let queryObj = qs.parse(parsedURL.query || "");
        debug('query: %o', queryObj);

        let size = queryObj.size ? queryObj.size.split('x') : [];
        try {
            svgObj.text = queryObj.text ? decodeURIComponent(queryObj.text) : '';
        } catch(e) {
            svgObj.text = queryObj.text || '';
        }

        if(size.length != 2) {
            return yield next;
        }

        svgObj.width = size[0];
        svgObj.height = size[1];

        svgObj.alignPosStartX = svgObj.width / 2;
        svgObj.alignPosStartY = svgObj.height / 2;

        debug("svg config: %o", svgObj);
        
        this.type = 'image/svg+xml';
        this.body = svg.replace(/\{.*?\}/g, function(matched) {
            return svgObj[matched.replace(/[\{\}]/g, '')];
        });
    }
}
