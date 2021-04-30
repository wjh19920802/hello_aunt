/*
 * 登录
 * */
export const appApi = {
  login: '/hello_aunt_provider_user/app/login', // 授权登录
  pageConfig: '/hello_aunt_provider_user/wxshare/pageConfig'
}

/*
 *   公会相关api
 * */
export const guildApi = {
  getGuildVip: '/hello_aunt_provider_user/user/guild/getGuildVip', // 获取公会会员（默认全部）
  getGuildDetail: '/hello_aunt_provider_user/user/guild/getGuildDetail', // 获取登录用户的公会信息
  getGuildInfoById: '/hello_aunt_provider_user/guild/getGuildInfo', // 根据id获取公会信息
  guildRanking: '/hello_aunt_provider_user/user/guild/guildRanking', // 根据id获取公会信息
  guildContriRanking: '/hello_aunt_provider_user/user/guild/guildContriRanking', // 公会贡献值排名榜单
  lvContributionDict: '/hello_aunt_provider_user/user/guild/lvContributionDict', // 等级贡献值字典
  queryGuildList: '/hello_aunt_provider_user/user/guild/queryGuildList', // 获取公会集合
  recommendGuild: '/hello_aunt_provider_user/user/guild/recommendGuild', // 推荐公会列表
  guildState: '/hello_aunt_provider_user/guild/guildState', // 公会状态
  createGuild: '/hello_aunt_provider_user/guild/createGuild', // 创建公会
  audit: '/hello_aunt_provider_user/guild/manage/vip/audit', // 加入公会审核
  transfer: '/hello_aunt_provider_user/guild/manage/vip/transfer', // 转让公会
  join: '/hello_aunt_provider_user/vip/join/guild', // 申请加入公会
  quit: '/hello_aunt_provider_user/guild/manage/vip/quit', // 退出公会
  getAuditVipRecord: '/hello_aunt_provider_user/user/guild/getAuditVipRecord', // 获取公会内待审核用户列表
  queryUserList: '/hello_aunt_provider_user/user/guild/queryUserList', // 公会搜索用户
  remove: '/hello_aunt_provider_user/guild/manage/vip/remove', // 公会移除会员
  updateGuild: '/hello_aunt_provider_user/guild/updateGuild', // 更新公会资料
  addAdmin: '/hello_aunt_provider_user/guild/manage/vip/addAdmin', // 添加管理员
  removeAdmin: '/hello_aunt_provider_user/guild/manage/vip/removeAdmin', // 删除管理员
  isFirstLogin: '/hello_aunt_provider_user/user/guild/isFirstLogin' // 是否第一次创建公会
}
/*
 *  上传文件
 * */
export const uploadApi = {
  upload: '/hello_aunt_provider_pc/UploadApi/bathUpload'
}

/*
 *   发布相关api
 * */
export const publishApi = {
  addArticle: '/hello_aunt_provider_user/vip/works/addArticle', // 发布文章
  addSay: '/hello_aunt_provider_user/vip/works/addSay' // 发布说说
}

/*
 *   任务相关api
 * */
export const taskApi = {
  signIn: '/hello_aunt_provider_user/vip/signIn', // 签到
  signTask: '/hello_aunt_provider_user/vip/task/signTask', // 已签到详情
  calculateList: '/hello_aunt_provider_user/vip/task/calculateList' // 任务列表
}

/*
 *   首页相关api
 * */
export const homeApi = {
  worksList: '/hello_aunt_provider_user/app/index/worksList', // 首页推荐列表
  worksDetail: '/hello_aunt_provider_user/app/index/worksDetail', // 详情
  detail: '/hello_aunt_provider_user/vip/works/detail', // 个人发布的说说和文章详情
  homeTab: '/hello_aunt_provider_user/app/index/homeTab', // tab
  homeTabContent: '/hello_aunt_provider_user/app/index/homeTab/content' // homeTabContent
}

/*
 *   个人信息相关api
 * */
export const userInfoApi = {
  getVipDetail: '/hello_aunt_provider_user/userInfo/getVipDetail', // 根据vipId获取会员详细资料
  contributionDetailPage:
    '/hello_aunt_provider_user/transactionRecord/contributionDetailPage', // 个人贡献值明细
  goldCoinDetail: '/hello_aunt_provider_user/transactionRecord/goldCoinDetail' // 个人金币明细
}
// 我的页面
export const user = {
  getInfo: '/hello_aunt_provider_user/vip/info',
  getVipInfo:
    '/hello_aunt_provider_user/userInfo/getVipDetail',
  editUserInfo:
    '/hello_aunt_provider_user/userInfo/editUserInfo',
  uploadFile:
    '/hello_aunt_provider_pc/UploadApi/bathUpload',
  getGuildInfo:
    '/hello_aunt_provider_user/guild/getGuildInfo',
  getQrCode:
    '/hello_aunt_provider_user/vip/getQrCode',
  sysList:
    '/hello_aunt_provider_user/vip/message/sysList',
  workslist:
    '/hello_aunt_provider_user/vip/works/list',
  worksdelete:
    '/hello_aunt_provider_user/vip/works/delete',
  feedbacksave:
    '/hello_aunt_provider_user/feedback/save',
  vipInfoorkList:
    '/hello_aunt_provider_user/app/vipInfo/workList',
  applyMessage:
    '/hello_aunt_provider_user/user/guild/applyMessage',
  queryUserList:
    '/hello_aunt_provider_user/user/guild/queryUserList',
  queryGuildList:
    '/hello_aunt_provider_user/user/guild/queryGuildList',
  vipmessagesysIndex:
    '/hello_aunt_provider_user/vip/message/sysIndex'
}

export const wxjs = {
  pageConfig: '/hello_aunt_provider_user/wxshare/pageConfig'
}
