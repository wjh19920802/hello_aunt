export function formateDate(date, pattern) {
  // eslint-disable-next-line no-extend-native
  Date.prototype.FormatTmp = function(fmt) {
    var o = {
      'M+': this.getMonth() + 1, // 月份
      'd+': this.getDate(), // 日
      'h+': this.getHours(), // 小时
      'm+': this.getMinutes(), // 分
      's+': this.getSeconds(), // 秒
      'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
      S: this.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (this.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  }
  return date.FormatTmp(pattern)
}
export function getDateDiff(time) {
  // 当前时间
  if (!time) return
  var nowTime = new Date()
  var day = nowTime.getDate()
  var hours = parseInt(nowTime.getHours())
  var minutes = nowTime.getMinutes()
  // 传来time 2018-05-25 18:14:02 分解
  var timeday = time.substring(8, 10)
  var timehours = parseInt(time.substring(11, 13))
  var timeminutes = time.substring(14, 16)
  var d_day = Math.abs(day - timeday)
  var d_hours = hours - timehours
  var d_minutes = Math.abs(minutes - timeminutes)
  if (d_day <= 1) {
    switch (d_day) {
      case 0:
        if (d_hours == 0 && d_minutes > 0) {
          return d_minutes + '分钟前'
        } else if (d_hours == 0 && d_minutes == 0) {
          return '1分钟前'
        } else {
          return d_hours + '小时前'
        }
        break
      case 1:
        if (d_hours < 0) {
          return 24 + d_hours + '小时前'
        } else {
          return d_day + '天前'
        }
        break
    }
  } else if (d_day > 1 && d_day < 8) {
    return d_day + '天前'
  } else {
    return time
  }
}
