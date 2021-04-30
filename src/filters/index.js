/*
 *  文件说明
 *  日期：2021/3/25.
 *  作者：WangJinHui
 * */
import moment from 'moment'
const section = [
  {
    value: 0,
    word: '分钟前',
    rate: 60
  },
  {
    value: 3600000,
    word: '小时前',
    rate: 24
  },
  {
    value: 86400000,
    word: '天前',
    rate: 7
  },
  {
    value: 604800000,
    word: ''
  }
]

const formatTime = timeStamp => {
  timeStamp = new Date(timeStamp).getTime()
  const timeNow = new Date().getTime()
  const diff = timeNow - timeStamp
  let calc = ''
  section.findIndex((item, index) => {
    if (diff > section[section.length - 1].value) {
      calc = moment(new Date(timeStamp)).format('YYYY-MM-DD HH:MM:SS')
      return
    }
    if (diff > item.value && diff < section[index + 1].value) {
      calc =
        Math.floor((diff / section[index + 1].value) * item.rate) + item.word
      return
    }
  })
  return calc
}

export { formatTime }
