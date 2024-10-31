'use strict'
// Template version: 1.3.1
// 配置文档参见 http://vuejs-templates.github.io/webpack

const path = require('path')

module.exports = {
  dev: {

    // 路径设置
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    
    // 代理配置，解决前后端跨域问题
    proxyTable: {
      '/api': {
        target: "http://localhost:8081", // 后端服务端口为8081
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },

    // 开发服务器配置
    host: 'localhost',
    port: 8080,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // 文件变化监测设置

    /**
     * Source Maps
     */
    devtool: 'cheap-module-eval-source-map', // 开发环境下的source map配置

    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    // index.html 模板路径
    index: path.resolve(__dirname, '../dist/index.html'),

    // 路径设置
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */
    productionSourceMap: true,
    devtool: '#source-map',

    // Gzip 配置，默认关闭
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // 构建完成后的报告
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
