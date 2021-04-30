const IS_PROD = ['production', 'prod', 'staging'].includes(process.env.NODE_ENV)
const plugins = [
  // 引入vant
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
  // 引入nut
/*  [
    '@nutui/babel-plugin-separate-import',
    {
      style: 'scss'
    }
  ]*/
]

// 去除 console.log
// if (IS_PROD) {
//   plugins.push('transform-remove-console')
// }

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins
}
