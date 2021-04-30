/*
 *  文件说明
 *  日期：2021/4/7.
 *  作者：WangJinHui
 * */

Array.prototype.remove = function(val) {
  var index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}
