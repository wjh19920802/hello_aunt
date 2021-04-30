/*
 *  文件说明
 *  日期：2021/3/31.
 *  作者：WangJinHui
 * */

import Alert from './createGuildSuccess.vue' // 引入vue模板
const createGuildSuccess = {} // 定义插件对象
createGuildSuccess.install = function(Vue, options) {
  const router = options.router
  // vue的install方法，用于定义vue插件
  // 如果selfModal还在，则不再执行
  if (document.getElementsByClassName('alertBox').length) {
    return
  }
  const ToastTpl = Vue.extend(Alert) // 创建vue构造器
  // el：提供一个在页面上已存在的DOM元素作为Vue实例的挂载目标。可以是css选择器，也可以是HTMLElement实例。
  // 在实例挂载之后，可以通过$vm.$el访问。
  // 如果这个选项在实例化时有用到，实例将立即进入编译过程。否则，需要显示调用vm.$mount()手动开启编译(如下)
  // 提供的元素只能作为挂载点。所有的挂载元素会被vue生成的dom替换。因此不能挂载在顶级元素(html, body)上
  // let $vm = new toastTpl({
  // el: document.createElement('div')
  // })
  const instance = new ToastTpl({
    methods: {
      showPower() {
        router.push({ path: '/power' })
      }
    }
  }) // 实例化vue实例
  // 此处使用$mount来手动开启编译。用$el来访问元素，并插入到body中
  instance.$mount()
  console.log('tpltpltpl', instance.$el)
  document.body.appendChild(instance.$el)

  Vue.prototype.$createGuildSuccess = {
    // 在Vue的原型上添加实例方法，以全局调用
    show() {
      instance.show = true // 显示toast
    },
    hide() {
      // 控制toast隐藏的方法
      instance.show = false
    }
  }
}
export default createGuildSuccess // 导出Toast（注意：此处不能用module exports导出，在一个文件中，不能同时使用require方式引入，而用module exports导出，两种方式不能混用）
