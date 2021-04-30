// 生产环境配置
module.exports = {
  title: "你好大妈",
  baseUrl: process.env.BASE_URL, // 项目地址
  NODE_ENV: process.env.NODE_ENV,
  baseApi: "http://aunt.mrcollege.com.cn", // 本地api请求地址,注意：如果你使用了代理，请设置成'/'
  APPID: "wx7411ac0f70c9f766",
  APPSECRET: "xxx",
  $cdn: "https://www.xxxx.cn/static",
  env: "production"
};
