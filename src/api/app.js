/*
 *  文件说明
 *  日期：2021/4/2.
 *  作者：WangJinHui
 * */

import { postQs } from '@/utils/request'
import { appApi } from './config'
import { getVipDetail } from 'api/user'
import { getGuildDetail } from 'api/guild'
import store from '@/store'

export const login = async({ code }, hideLoading) => {
  return postQs({
    url: appApi.login,
    data: {
      code
    },
    hideLoading
  })
}

// 获取用户信息和当前的公会信息
export const getInfo = async hideLoading => {
  return new Promise((resolve, reject) => {
    Promise.all([getVipDetail(), getGuildDetail()]).then(res => {
      if (res[0].result === '0') {
        store.commit('app/SET_USER_INFO', res[0].data)
      } else {
        reject()
      }
      if (res[1].result === '0') {
        store.commit('guild/SET_GUILD_INFO', res[1].data)
      } else {
        reject()
      }
      resolve('ok')
    })
  })
}

// 微信设置
export const pageConfig = async(
  { token, timestamp, sig, url },
  hideLoading
) => {
  return postQs({
    url: appApi.pageConfig,
    data: {
      token,
      timestamp,
      sig,
      url
    },
    hideLoading
  })
}
