import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import proto from '@/utils/proto'

// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn

Vue.config.productionTip = true

// 按需引入vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'
// 添加事件管理者'passive'，来阻止'touchstart'事件，让页面更加流畅。 解决chrome下的warning问题
import 'default-passive-events'

// 引入svg组件
import '@/assets/icons'

// filters
import * as filters from './filters/index'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 升级弹窗
import upgradeModal from '@/plugins/upgradeModal/index.js'
Vue.use(upgradeModal)

import createGuildSuccess from '@/plugins/createGuildSuccess/index.js'
Vue.use(createGuildSuccess, {
  router
})

// 富文本
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor, {
  placeholder: '请输入正文'
})

// 导入
import link from 'fast-vue-f-link'
// 使用
Vue.use(link, { name: 'link' })

import handleFontSize from '@/utils/handleFontSize'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
