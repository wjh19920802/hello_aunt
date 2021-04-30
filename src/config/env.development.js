// 开发环境配置
module.exports = {
  title: "你好大妈",
  baseUrl: process.env.BASE_URL, // 项目地址
  NODE_ENV: process.env.NODE_ENV,
  baseApi: "/api", // 本地api请求地址,注意：如果你使用了代理，请设置成'/'
  APPID: "wxba47c5defbf01dfc",
  APPSECRET: "xxx",
  $cdn: "https://www.baidu.com/static",
  env: "dev",
  devServer: {
    port: 9020, // 端口
    open: true, // 启动后打开浏览器
    hot: true,
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    },
    proxy: {
      // 配置跨域
      "/api": {
        target: "http://aunt.jiajiadata.com/",
        // ws:true,
        changOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
