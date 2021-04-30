/*
 *  文件说明
 *  日期：2021/4/1.
 *  作者：WangJinHui
 * */
import { upload } from '@/utils/request'
import { uploadApi } from './config'

export const uploadFile = async data => {
  return upload({
    url: uploadApi.upload,
    data,
    hideLoading: false
  })
}
