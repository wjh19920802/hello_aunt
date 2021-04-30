/*
 *  文件说明
 *  日期：2021/4/12.
 *  FuJiuHeng
 * */
import { postQs } from '@/utils/request'
import { homeApi } from './config'

export const worksDetail = async({ workId }, hideLoading) => {
  return postQs({
    url: homeApi.worksDetail,
    data: {
      workId
    },
    hideLoading
  })
}

export const detail = async({ workId }, hideLoading) => {
  return postQs({
    url: homeApi.detail,
    data: {
      workId
    },
    hideLoading
  })
}
