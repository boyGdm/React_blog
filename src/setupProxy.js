/*
* 代理 跨域
* */

const {createProxyMiddleware} = require('http-proxy-middleware');
// app 这个app 代表的是服务器 是webpack-dev-server 底层用express实现的
module.exports = function (app) {
    app.use(
        '/manage',
        createProxyMiddleware({
            target: 'http://admin.lhyzn.com',
            changeOrigin: true,
            pathRewrite: {
                "^/manage": ""
            }
        })
    );
};
