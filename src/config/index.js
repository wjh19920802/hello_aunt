const env = process.env.VUE_APP_ENV || "production";
const config = require(`./env.${env}.js`);
module.exports = config;
