/*
* 代理 跨域
* */
const proxy = require('http-proxy-middleware');
// app 这个app 代表的是服务器 是webpack-dev-server 底层用express实现的
module.exports = function (app) {
  app.use('/dmx/api', proxy.createProxyMiddleware({
    target: 'https://www.codedmx.top',
    // target: 'http://localhost:6666',
    changeOrigin: true,
  }));
};
