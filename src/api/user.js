/*
 *  文件说明
 *  日期：2021/3/10.
 *  作者：WangJinHui
 * */
import { get } from '@/utils/request'
import { userInfoApi } from './config'

export const getVipDetail = async hideLoading => {
  return get({
    url: userInfoApi.getVipDetail,
    params: {},
    hideLoading
  })
}

export const contributionDetailPage = async(
  { pageNum, pageSize, startTime, endTime },
  hideLoading
) => {
  return get({
    url: userInfoApi.contributionDetailPage,
    params: {
      pageNum,
      pageSize,
      startTime,
      endTime
    },
    hideLoading
  })
}

export const goldCoinDetail = async(
  { pageNum, pageSize, method, type, startTime, endTime },
  hideLoading
) => {
  return get({
    url: userInfoApi.goldCoinDetail,
    params: {
      pageNum,
      pageSize,
      method,
      type,
      startTime,
      endTime
    },
    hideLoading
  })
}
