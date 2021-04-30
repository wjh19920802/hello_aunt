/*
 *  文件说明
 *  日期：2021/4/1.
 *  作者：WangJinHui
 * */
import { postQs } from '@/utils/request'
import { publishApi } from './config'

export const addArticle = async({ title, image, articleBody, isThrow }, hideLoading = false) => {
  return postQs({
    url: publishApi.addArticle,
    data: {
      title,
      image,
      articleBody,
      isThrow
    },
    hideLoading
  })
}

export const addSay = async({ title, images, isThrow }, hideLoading = false) => {
  return postQs({
    url: publishApi.addSay,
    data: {
      title,
      images,
      isThrow
    },
    hideLoading
  })
}
