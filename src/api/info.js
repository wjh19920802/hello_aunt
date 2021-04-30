import {
  http
} from '../utils/request'

import { postQs } from '@/utils/request'
import {
  user
} from './config'

// 获取个人信息
export function getInfo(data) {
  return http({
    url: user.getInfo,
    method: 'get',
    data: data
  })
}

// 根据id获取个人信息
export function getVipInfo(data) {
  return http({
    url: user.getVipInfo,
    method: 'get',
    params: data
  })
}
// 修改用户信息
export function editUserInfo(data) {
  return http({
    url: user.editUserInfo,
    method: 'put',
    params: data
  })
}
// 上传文件

export function uploadFile(data) {
  return http({
    url: user.uploadFile,
    method: 'post',
    params: data
  })
}
// 获取公会信息

export function getGuildInfo(data) {
  return http({
    url: user.getGuildInfo,
    method: 'get',
    params: data
  })
}
// 获取邀请码

export function getQrCode(data) {
  return http({
    url: user.getQrCode,
    method: 'get',
    params: data
  })
}
// 获取消息列表

export function sysList(data) {
  return http({
    url: user.sysList,
    method: 'get',
    params: data
  })
}
// 获取说说列表

export function workslist(data) {
  return http({
    url: user.workslist,
    method: 'post',
    params: data
  })
}

// 获取他人说说列表

export function vipInfoorkList(data) {
  return http({
    url: user.vipInfoorkList,
    method: 'post',
    params: data
  })
}

// 删除说说

export function worksdelete(data) {
  return http({
    url: user.worksdelete,
    method: 'delete',
    params: data
  })
}
// 意见反馈

export function feedbacksave(data) {
  return http({
    url: user.feedbacksave,
    method: 'post',
    params: data
  })
}
// 获取公会消息列表

export function applyMessage(data) {
  return http({
    url: user.applyMessage,
    method: 'post',
    params: data
  })
}
// 获取用户列表
export function queryUserList(data) {
  return http({
    url: user.queryUserList,
    method: 'post',
    params: data
  })
}
// 获取公会列表
export function queryGuildList(data) {
  return http({
    url: user.queryGuildList,
    method: 'post',
    params: data
  })
}
// 获取系统首页信息

export function vipmessagesysIndex(data) {
  return http({
    url: user.vipmessagesysIndex,
    method: 'get',
    params: data
  })
}

//路由中获取公会信息
export const applyMessageData = async ({
  data
}, hideLoading) => {
  return postQs({
    url: user.applyMessage,
    method: 'post',
    params: data,
    hideLoading:true,
  })
}
//路由中获取系统信息
export const vipmessagesysIndexData = async ({
  data
}, hideLoading) => {
  return postQs({
    url: user.vipmessagesysIndex,
    method: 'post',
    params: data,
    hideLoading:true,
  })
}
