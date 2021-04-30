/*
 *  文件说明
 *  日期：2021/4/7.
 *  作者：WangJinHui
 * */
import { postQs } from '@/utils/request'
import { homeApi } from './config'

export const worksList = async(
  { pageNum, pageSize, nextDate },
  hideLoading
) => {
  return postQs({
    url: homeApi.worksList,
    data: {
      pageNum,
      pageSize,
      nextDate
    },
    hideLoading
  })
}

export const worksDetail = async hideLoading => {
  return postQs({
    url: homeApi.worksDetail,
    data: {},
    hideLoading
  })
}

export const homeTab = async hideLoading => {
  return postQs({
    url: homeApi.homeTab,
    data: {},
    hideLoading
  })
}
export const homeTabContent = async(
  { pageNum, pageSize, tabId },
  hideLoading
) => {
  return postQs({
    url: homeApi.homeTabContent,
    data: {
      pageNum,
      pageSize,
      tabId
    },
    hideLoading
  })
}
