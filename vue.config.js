// 'use strict'
const path = require('path')
const defaultSettings = require('./src/config/index.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const vConsolePlugin = require('vconsole-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const resolve = dir => path.join(__dirname, dir)
// page title
const name = defaultSettings.title || '你好大妈'
// 生产环境，测试和正式
const IS_PROD = ['production', 'prod'].includes(defaultSettings.env)
const IS_TEST = ['staging'].includes(defaultSettings.env)

module.exports = {
  // publicPath: './', // 署应用包时的基本 URL。 vue-router hash 模式使用
  publicPath: defaultSettings.baseUrl, // 部署应用包时的基本 URL。  vue-router history模式使用
  outputDir: 'dist', //  生产环境构建文件的目录
  assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: !(IS_PROD || IS_TEST),
  productionSourceMap: defaultSettings.env === 'staging', // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: defaultSettings.devServer,
  css: {
    extract: IS_PROD || IS_TEST, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    sourceMap: !(IS_PROD || IS_TEST),
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $cdn可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
                  @import "assets/css/mixin.scss";
                  @import "assets/css/variables.scss";
                  $cdn: "${defaultSettings.$cdn}";
                `
      },
      postcss: {
        plugins: [
          require('autoprefixer')({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8'
            ]
          }),
          require('postcss-pxtorem')({
            rootValue: 37.5,
            propList: ['*'],
            // selectorBlackList: ['van-','ig-']
            selectorBlackList: ['ig-', 'ig_'] // 忽略ig开头的属性，不转成rem
          })
        ]
      }
    }
  },
  configureWebpack: config => {
    config.name = name
    if (IS_PROD) {
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            // 生产环境自动删除console
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            },
            // 处理I0S10白屏
            mangle: {
              safari10: true
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: info => {
            return `${info.path}.gz${info.query}`
          },
          algorithm: 'gzip',
          threshold: 10240,
          test: new RegExp('\\.(' + ['js'].join('|') + ')$'),
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      )
    }
    if (IS_TEST) {
      config.plugins.push(
        new vConsolePlugin({
          filter: [],
          enable: true
        })
      )
    }
  },

  chainWebpack: config => {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // 别名 alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))

    /* const externals = {
			 vue: 'Vue',
			 'vue-router': 'VueRouter',
			 vuex: 'Vuex',
			 vant: 'vant',
			 axios: 'axios'
	  }
	 config.externals(externals)
    // CDN外链，会插入到index.html中
    const cdn = {
      // 开发环境
      dev: {
        css: [],
        js: []
      },
      // 生产环境
      build: {
        css: ['https://cdn.jsdelivr.net/npm/vant@2.4.7/lib/index.css'],
        js: [
          'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
          'https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js',
          'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
          'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js',
          'https://cdn.jsdelivr.net/npm/vant@2.4.7/lib/index.min.js'
        ]
      }
    }

    //添加CDN参数到htmlWebpackPlugin配置中
    config.plugin('html').tap(args => {
      if (IS_PROD || IS_TEST) {
        args[0].cdn = cdn.build
      } else {
        args[0].cdn = cdn.dev
      }
      return args
    })*/

    /**
     * 设置保留空格
     */
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    /**
     * svg
     */
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.exclude.add(resolve('src/assets/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(!(IS_PROD || IS_TEST), config => config.devtool('source-map'))

    config.when(IS_PROD || IS_TEST, config => {
      /**
       * 打包分析
       */
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // 将 runtime 作为内联引入不单独存在
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3, //  被至少用三次以上打包分离
            priority: 5, // 优先级
            reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          },
          node_vendors: {
            name: 'chunk-libs',
            chunks: 'initial', // 只打包初始时依赖的第三方
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          },
          vantUI: {
            name: 'chunk-vantUI', // 单独将 vantUI 拆包
            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
            test: /[\\/]node_modules[\\/]_?vant(.*)/
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
