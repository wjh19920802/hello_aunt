// 预生产环境配置
module.exports = {
	title: "你好大妈",
	baseUrl: process.env.BASE_URL, // 项目地址
	NODE_ENV: process.env.NODE_ENV,
	baseApi: "http://aunt.jiajiadata.com", // 本地api请求地址,注意：如果你使用了代理，请设置成'/'
	APPID: "wxba47c5defbf01dfc",
	APPSECRET: "xxx",
	$cdn: "https://www.xxxx.cn/static",
	env: "staging"
};
