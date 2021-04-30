/*
 *  文件说明
 *  日期：2021/3/17.
 *  作者：WangJinHui
 * */

export const getStyle = function(ele) {
  var style = null
  if (window.getComputedStyle) {
    style = window.getComputedStyle(ele, null)
  } else {
    style = ele.currentStyle
  }
  return style
}

export const getUrlParame = parameName => {
  // / 获取地址栏指定参数的值
  // / <param name="parameName">参数名</param>
  // 获取url中跟在问号后面的部分
  const parames = window.location.search
  console.log('parames', parames)
  // 检测参数是否存在
  if (parames.indexOf(parameName) > -1) {
    let parameValue = ''
    parameValue = parames.substring(
      parames.indexOf(parameName),
      parames.length
    )
    // 检测后面是否还有参数
    if (parameValue.indexOf('&') > -1) {
      // 去除后面多余的参数, 得到最终 parameName=parameValue 形式的值
      parameValue = parameValue.substring(0, parameValue.indexOf('&'))
      // 去掉参数名, 得到最终纯值字符串
      parameValue = parameValue.replace(parameName + '=', '')
      return parameValue
    }
    return ''
  }
}

export const publicTimestamp = () => {
  var publicdate = new Date()
  var publicseperator1 = ''
  var publicyear = publicdate.getFullYear()
  var publicmonth = publicdate.getMonth() + 1
  var publicstrDate = publicdate.getDate()
  var publichour = publicdate.getHours()
  var publicminutes = publicdate.getMinutes()
  var publicseconds = publicdate.getSeconds()
  var publicmillseconds = publicdate.getMilliseconds()
  if (publicmonth >= 1 && publicmonth <= 9) {
    publicmonth = '0' + publicmonth
  }
  if (publicstrDate >= 0 && publicstrDate <= 9) {
    publicstrDate = '0' + publicstrDate
  }
  if (publichour >= 0 && publichour <= 9) {
    publichour = '0' + publichour
  }
  if (publicminutes >= 0 && publicminutes <= 9) {
    publicminutes = '0' + publicminutes
  }
  if (publicseconds >= 0 && publicseconds <= 9) {
    publicseconds = '0' + publicseconds
  }
  if (publicmillseconds >= 0 && publicmillseconds <= 9) {
    publicmillseconds = '00' + publicmillseconds
  }
  if (publicmillseconds >= 10 && publicmillseconds <= 99) {
    publicmillseconds = '0' + publicmillseconds
  }
  var publictimestamp = null
  return (publictimestamp =
    publicyear +
    publicseperator1 +
    publicmonth +
    publicseperator1 +
    publicstrDate +
    publicseperator1 +
    publichour +
    publicseperator1 +
    publicminutes +
    publicseperator1 +
    publicseconds +
    publicseperator1 +
    publicmillseconds)
}

export const sleep = time => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time * 1000)
  })
}

export const isAndroidOrIOS = () => {
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isAndroid) {
    return 'android'
  }
  if (isiOS) {
    return 'ios'
  }
  return false
}
