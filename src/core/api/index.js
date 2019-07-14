import request from './http'
import axios from '@/mock/mock' // mock.js 暴露的模块
import params from "./params"

var url1 = '/json1811.ashx';
var vv=params.v;
// console.log(vv)
class Apis {
  // 登录接口
  mokeLogin(data){
    return axios.post('/login',{
      data:data})
  }
  // 注册接口
  mokeRes(data) {
    return axios.post('/res',{
      data:data})
  }
  // 轮播接口
  GetBannerList (data) {
    return request({
      method: 'get',
      url: url1,
      params: data
    })
  }
  // 首页商品信息接口
  GetIndexCakeList () {
    return request({
      method: 'get',
      url: url1,
      params: {
        m: 'GetIndexCakeList',
        // v: '1560219368002',
        v: vv,
        c: 'Index'
      }
    })
  }
  // 焦点图详情接口
  GetNSCakeByName (data) {
    return request({
      method: 'get',
      url: url1,
      params: {
        Name: data.Name,
        c: 'NsCakeCenter',
        m: 'GetNSCakeByName',
        // v: '1560225194548'
        v: vv
      }
    })
  }
  // 商品详情接口
  GetCakeByName (data) {
    return request({
      method: 'get',
      url: url1,
      params: {
        City: '上海',
        ProName: data.ProName,
        c: 'Product',
        m: 'GetCakeByName',
        // v: '1560236137480'
        v: vv
      }
    })
  }
  // 分类数据接口
  GetJdListNew() {
    return request({
      method: "get",
      url: url1,
      params: {
        c: "NsCakeCenter",
        m: "GetJdListNew",
        v: "1560225194548"
      }
    })
  }
  GetjzCakeInfo(data){
    return request({
      method: "get",
      url: url1,
      params: {
        City: "上海",
        ProName: data.ProName,
        c: "IndexCenter",
        m: "GetjzCakeInfo",
        v: "1560236137480"
      }
    })
  }
  GetRuPCakeByName(data){
    return request({
      method: "get",
      url: url1,
      params: {
        Name: data.Name,
        c: "NsCakeCenter",
        m: "GetRuPCakeByName",
        v: "1560225194548"
      }
    })
  }
}
export default new Apis()
