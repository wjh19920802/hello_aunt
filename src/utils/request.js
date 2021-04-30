/*
 *  文件说明
 *  日期：2021/3/10.
 *  作者：WangJinHui
 * */
import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
import store from '@/store'
import { Toast } from 'vant'
// 根据环境不同引入不同api地址
import { baseApi } from '@/config'

Toast.setDefaultOptions({ duration: 2000 })
// 创建axios实例
const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  timeout: 60000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    /*    if (!config.hideLoading) {
			Toast.loading({
				forbidClick: true,
				duration: 0
			})
		}*/
    if (config.url.includes('http')) {
      config.baseURL = ''
    }
    if (config.url === '/hello_aunt_provider_user/app/login') {
      const timestamp = new Date().getTime() + ''
      const sig = md5(timestamp)
      config.headers = {
        ...config.headers,
        timestamp,
        sig
      }
      return config
    }
    const timestamp = new Date().getTime() + ''
    const token = store.state.app.token
    const sig = md5(timestamp + '|' + token)
    config.headers = {
      ...config.headers,
      timestamp,
      token,
      sig
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (
      res.result === '100001' ||
      res.result === '100002' ||
      res.result === '110001'
    ) {
      window.localStorage.removeItem('access_token')
      Toast.fail('登录失效')
      setTimeout(() => {
        window.location = window.location.pathname + window.location.search
      }, 2000)
    }
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export const http = service

export function get({ url, params, hideLoading = true }) {
  return service({
    url,
    method: 'GET',
    params,
    hideLoading
  })
}

export function post({ url, data, hideLoading = true }) {
  return service({
    url,
    method: 'POST',
    data,
    hideLoading,
    contentType: 'application/json;charset=utf-8'
  })
}

export function postQs({ url, data, hideLoading = true }) {
  return service({
    url,
    method: 'POST',
    data: qs.stringify(data),
    hideLoading,
    contentType: 'application/x-www-form-urlencoded'
  })
}
export function upload({ url, data, hideLoading = true }) {
  return service({
    url,
    method: 'POST',
    data,
    hideLoading,
    contentType: 'multiple/form-data'
  }).catch(err => {
    console.log('error: ', err)
  })
}
