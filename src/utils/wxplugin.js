/*
 *  文件说明
 *  日期：2021/4/28.
 *  作者：WangJinHui
 * */

import wx from 'weixin-js-sdk'
import { Toast } from 'vant'
import { isAndroidOrIOS } from '@/utils'
import { pageConfig } from '@/api/app'
const jsApiList = [
  'onMenuShareAppMessage',
  'onMenuShareTimeline',
  'updateAppMessageShareData',
  'updateTimelineShareData',
  'onMenuShareWeibo',
  'onMenuShareQZone',
  'startRecord',
  'stopRecord',
  'onVoiceRecordEnd',
  'playVoice',
  'pauseVoice',
  'stopVoice',
  'onVoicePlayEnd',
  'uploadVoice',
  'downloadVoice',
  'chooseImage',
  'previewImage',
  'uploadImage',
  'downloadImage',
  'translateVoice',
  'getNetworkType',
  'openLocation',
  'getLocation',
  'hideOptionMenu',
  'showOptionMenu',
  'hideMenuItems',
  'showMenuItems',
  'hideAllNonBaseMenuItem',
  'showAllNonBaseMenuItem',
  'closeWindow',
  'scanQRCode',
  'chooseWXPay',
  'openProductSpecificView',
  'addCard',
  'chooseCard',
  'openCard'
]

// ready 包装
const withReady = func => async(...args) => {
  const isReady = await ready()
  if (isReady) {
    func.apply(this, args)
  } else {
    Toast('微信配置异常')
  }
}

let instance = null
// wx.ready
const ready = async() => {
  if (instance !== null) {
    // 已存在ready实例，直接返回对象
    return instance
  }
  // 创建ready实例
  instance = new Promise(async function(resolve, reject) {
    if (process.env.NODE_ENV === 'development') {
      resolve(true)
      return
    }
    // 当前签名url
    const url = location.href
    // 根据当前url请求后端获取签名
    const { result, msg, signature, appId, nonceStr, timestamp } = await pageConfig({
	    url: url
    })
    if (result === '0') {
      wx.config({
        debug: true,
	      signature,
	      appId,
	      nonceStr,
	      timestamp,
        jsApiList: jsApiList // 必填，需要使用的JS接口列表
      })
      wx.ready(function() {
        resolve(true)
      })
      wx.error(function(res) {
        console.log('wx.error,', res)
        resolve(false)
      })
    } else {
      resolve(false)
      console.log('通过后端获取微信前面接口异常,', msg)
    }
  })
  return instance
}

const resetReady = () => {
  if (isAndroidOrIOS === 'android') {
    console.log('Android 重置ready')
    instance = null
  }
}

// 获取定位
const getLocation = withReady(async data => {
  const { success, fail, complete, cancel, showLoading = true } = data
  // 默认展开loading效果
  showLoading &&
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner',
      message: '正在获取定位'
    })
  // 非打包环境直接返回结果
  if (process.env.NODE_ENV === 'development') {
    setTimeout(() => {
      success({
        latitude: 22.51595,
        longitude: 113.3926
      })
      complete()
    }, 1000)
    showLoading && Toast.clear()
    return false
  }
  wx.getLocation({
    type: 'gcj02',
    success: res => {
      console.log('wx.getLocation success', res)
      success && success(res)
    },
    fail: error => {
      console.log('wx.getLocation fail', error)
      fail && fail(error)
    },
    complete() {
      showLoading && Toast.clear()
      console.log('wx.getLocation complete')
      complete && complete()
    },
    cancel() {
      console.log('wx.getLocation cancel')
      cancel && cancel()
    }
  })
})

// 上传图片
const uploadImage = withReady(async callback => {
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function(res) {
      var localIds = res.localIds
      wx.uploadImage({
        localId: localIds[0],
        isShowProgressTips: 1,
        success: function(res) {
          const json = {}
          var serverId = res.serverId
          json['serverId'] = serverId
          json['url'] = localIds[0]
          callback(json)
        },
        fail: function(res) {
          console.log(res)
        }
      })
    },
    fail: function(res) {
      console.log(res)
    }
  })
})

// 打开定位
const openLocation = withReady(async data => {
  wx.openLocation(data)
})

const share = withReady(async(data = {}) => {
  const {
    title = '摩萄盒子',
    desc = '专业无人葡萄酒销售',
    link = location.href,
    imgUrl = 'https://sili-static.oss-cn-shenzhen.aliyuncs.com/icon_h5_share.png',
    success,
    cancel
  } = data
  const shareFriend = wx.updateAppMessageShareData || wx.onMenuShareAppMessage
  const shareTime = wx.updateTimelineShareData || wx.onMenuShareTimeline
  const params = {
    title: title, // 分享标题
    desc: desc, // 分享描述
    link: link, // 分享链接 默认以当前链接
    imgUrl: imgUrl, // 分享图标
    success() {
      success && success()
    },
    cancel() {
      cancel && cancel()
    }
  }
  // 分享给朋友
  shareFriend(params)
  // 分享到朋友圈
  shareTime(params)
})

const pay = ({ signParams, success, fail }) => {
  function onBridgeReady() {
    WeixinJSBridge.invoke('getBrandWCPayRequest', signParams, function(res) {
      if (res.err_msg === 'get_brand_wcpay_request:ok') {
        success && success(res)
      } else {
        res.msg = '支付失败'
        fail && fail(res)
      }
    })
  }
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  } else {
    onBridgeReady()
  }
}

export { share, pay, getLocation, openLocation, uploadImage, resetReady }
