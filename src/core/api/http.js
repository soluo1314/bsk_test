/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import axios from 'axios'

// eslint-disable-next-line eqeqeq
const baseURL = location.host.indexOf(".com") != -1 ? "" : "/apis"
let ajaxConfig = {
  baseURL,
  timeout: 20000,
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    return data
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理

    return data
  }],
  withCredentials: true,
  responseType: 'json'

}
var instance = axios.create(ajaxConfig)
// axios 连接器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config)
  // 通过header设置 cookie token
  // eslint-disable-next-line no-undef
  // Indicator.open()
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response)
  // Indicator.close()
  return response
}, function (error) {
  // Indicator.close()
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default instance
