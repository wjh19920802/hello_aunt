/*
 *  文件说明
 *  日期：2021/4/7.
 *  作者：WangJinHui
 * */
import { postQs } from '@/utils/request'
import { taskApi } from './config'

export const calculateList = async hideLoading => {
  return postQs({
    url: taskApi.calculateList,
    data: {},
    hideLoading
  })
}

export const signTask = async hideLoading => {
  return postQs({
    url: taskApi.signTask,
    data: {},
    hideLoading
  })
}

export const signIn = async hideLoading => {
  return postQs({
    url: taskApi.signIn,
    data: {},
    hideLoading
  })
}
