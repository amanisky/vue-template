import axios from 'axios'
import { getToken } from '../../utils/auth';

const server = axios.create({
  baseURL: process.env.VUE_APP_API
})

/**
 * 请求拦截器
 */
server.interceptors.request.use(function (config) {
  config.headers['Authorization'] = getToken() || ''
  return config
}, function (error) {
  return Promise.reject(error)
})

/**
 * 响应拦截器
 */
server.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})

export default server