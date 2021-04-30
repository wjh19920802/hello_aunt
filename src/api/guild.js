/*
 *  文件说明
 *  日期：2021/3/31.
 *  作者：WangJinHui
 * */
import { get, post, postQs, http } from '@/utils/request'
import { guildApi } from './config'

/**
 *
 *  获取公会会员（默认查全部）
 *  @param joinGuildStaus 当前用户状态 0 待审核 1 审核通过 2 审核不通过
 *  @param guildId 公会id
 *
 */
export const getGuildVip = async(
  {
    orderBy,
    vipGuildId,
    idOrName,
    vipRole = -4,
    vipRoles,
    joinGuildStaus,
    pageSize,
    pageNum
  },
  hideLoading
) => {
  return postQs({
    url: guildApi.getGuildVip,
    data: {
      orderBy,
      vipGuildId,
      joinGuildStaus,
      idOrName,
      vipRole,
      vipRoles,
      pageSize,
      pageNum
    },
    hideLoading
  })
}

/**
 * 获取公会推荐列表
 * 必传
 * @param pageSize  每页数量
 * @param pageNum   页码
 *
 */

export const recommendGuild = async({ pageSize, pageNum }, hideLoading) => {
  return postQs({
    url: guildApi.recommendGuild,
    data: {
      pageSize,
      pageNum
    },
    hideLoading
  })
}

/**
 * 获取公会排行榜
 * 必传
 * @param pageSize  每页数量
 * @param pageNum   页码
 * @param  rankingType   1 => 全国排名  2 =》 同城排名
 *
 */

export const guildRanking = async(
  { pageSize, pageNum, rankingType },
  hideLoading
) => {
  return postQs({
    url: guildApi.guildRanking,
    data: {
      pageSize,
      pageNum,
      rankingType
    },
    hideLoading
  })
}

/**
 * 获取公会信息
 *
 */

export const getGuildDetail = async hideLoading => {
  return postQs({
    url: guildApi.getGuildDetail,
    data: {},
    hideLoading
  })
}

/**
 * 根据id获取公会信息
 * @param   id  公会id
 * @return
 *
 *
 */

export const getGuildInfoById = async({ guildId }, hideLoading) => {
  return get({
    url: guildApi.getGuildInfoById,
    params: {
      guildId
    },
    hideLoading
  })
}

/**
 *
 * 公会贡献值排行榜
 *
 */
export const guildContriRanking = async hideLoading => {
  return postQs({
    url: guildApi.guildContriRanking,
    data: {},
    hideLoading
  })
}

/**
 * 创建公会
 * 必传
 * @param   guildPic  公会头像
 * @param   guildName  公会名称
 * @param   guildProvince  公会省
 * @param   guildCity  公会市/区
 * 非必传
 * @param   guildInfo  公会介绍
 * @param   guildSize  公会规模
 * @return
 *
 *
 */
export const createGuild = async(
  {
    guildPic,
    guildName,
    guildProvince,
    guildCity,
    guildInfo,
    guildSize,
    sceneCode
  },
  hideLoading
) => {
  return postQs({
    url: guildApi.createGuild,
    data: {
      guildPic,
      guildName,
      guildProvince,
      guildCity,
      guildInfo,
      guildSize,
      sceneCode
    },
    hideLoading
  })
}

/**
 * 获取公会审核状态
 *
 *
 */
export const guildState = async hideLoading => {
  return get({
    url: guildApi.guildState,
    params: {},
    hideLoading
  })
}

/**
 * 申请加入公会审核通过
 *
 *
 */
export const audit = async({ auditRecordId, auditType }, hideLoading) => {
  return postQs({
    url: guildApi.audit,
    data: {
      auditRecordId,
      auditType
    },
    hideLoading
  })
}

/**
 * 转让公会
 * @param transferVipId 被转让者id
 *
 */
export const transfer = async({ transferVipId }, hideLoading) => {
  return postQs({
    url: guildApi.transfer,
    data: {
      transferVipId
    },
    hideLoading
  })
}

/**
 * 申请加入公会
 * @param sceneCode  分享码key  扫码进入需要sceneCode，不需要另外两个参数
 * @param guildId 公会id
 * @param auditDesc 入会申请描述
 *
 */
export const join = async({ sceneCode, guildId, auditDesc }, hideLoading) => {
  return postQs({
    url: guildApi.join,
    data: {
      sceneCode,
      guildId,
      auditDesc
    },
    hideLoading
  })
}

/**
 *  退出公会
 *
 */
export const quit = async hideLoading => {
  return postQs({
    url: guildApi.quit,
    data: {},
    hideLoading
  })
}
/**
 *  查询公会列表
 *
 */
export const queryGuildList = async(
  { guildIdOrName, pageNum, pageSize },
  hideLoading
) => {
  return postQs({
    url: guildApi.queryGuildList,
    data: {
      guildIdOrName,
      pageNum,
      pageSize
    },
    hideLoading
  })
}

/**
 *  查询待审核列表
 *
 */
export const getAuditVipRecord = async({ auditStatus }, hideLoading) => {
  return get({
    url: guildApi.getAuditVipRecord,
    params: {
      auditStatus
    },
    hideLoading
  })
}

/**
 *  搜索公会内用户
 *
 */
export const queryUserList = async(
  { vipName, pageNum, pageSize },
  hideLoading
) => {
  return postQs({
    url: guildApi.queryUserList,
    data: {
      vipName,
      pageNum,
      pageSize
    },
    hideLoading
  })
}

/**
 *  移除会员
 *
 */
export const remove = async({ removeVipId }, hideLoading) => {
  return postQs({
    url: guildApi.remove,
    data: {
      removeVipId
    },
    hideLoading
  })
}

/**
 *  编辑公会资料
 *
 */
export const updateGuild = async(
  {
    guildId,
    guildPic,
    guildName,
    guildProvince,
    guildCity,
    guildInfo,
    guildSize
  },
  hideLoading
) => {
  return http({
    method: 'PUT',
    url: guildApi.updateGuild,
    params: {
      guildId,
      guildPic,
      guildName,
      guildProvince,
      guildCity,
      guildInfo,
      guildSize
    },
    hideLoading
  })
}

/**
 *  添加管理员
 *
 */
export const addAdmin = async({ id }, hideLoading) => {
  return postQs({
    url: guildApi.addAdmin,
    data: {
      id
    },
    hideLoading
  })
}

/**
 *  添加管理员
 *
 */
export const removeAdmin = async({ id }, hideLoading) => {
  return postQs({
    url: guildApi.removeAdmin,
    data: {
      id
    },
    hideLoading
  })
}

/**
 *  是否第一次登录
 *
 */
export const isFirstLogin = async hideLoading => {
  return get({
    url: guildApi.isFirstLogin,
    data: {},
    hideLoading
  })
}

