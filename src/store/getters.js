/*
 *  文件说明
 *  日期：2021/3/8.
 *  作者：WangJinHui
 * */
const getters = {
  userInfo: state => state.app.userInfo,
  guildInfo: state => state.guild.guildInfo, // 公会信息
  active: state => state.app.active, // 当前所在tabbar
  keepAlive: state => state.app.keepAlive, // 需要缓存的页面
  isChangeTabbar: state => state.app.isChangeTabbar,
  // 头部导航栏相关信息
  tabScroll: state => state.home.tabScroll,
  // 切换tabbar时记录home页面滚动位置
  homeScroll: state => state.home.homeScroll,
  // 当前播放视频的url
  playUrl: state => state.player.playUrl,
  // 是否显示视频播放层
  showPlayer: state => state.player.showPlayer,
  messageNum: state => state.app.messageNum
}
export default getters
