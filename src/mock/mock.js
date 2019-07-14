import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {UsersData} from './data/userinfo'
import Store from "storejs";

let mock = new MockAdapter(axios)
// 登录
mock.onPost('/login').reply(config => {
  // console.log(config);
  var reqData=JSON.parse(config.data).data;
  // console.log(reqData);
  for(var i=0;i<UsersData.length;i++){
    if(UsersData[i].username==reqData.username) {
        if(UsersData[i].password==reqData.password){
          return [200,{code:1,data:UsersData[i],msg:'登录成功'}]
        }else{
          return [200,{code:-1,msg:'密码错误'}]
        }
    }
  }
  return [200,{code:0,msg:'账号不存在'}];
})
// 注册
mock.onPost('/res').reply(config => {
  var reqData=JSON.parse(config.data).data;
  // console.log(reqData);
  
  for (let index = 0; index < UsersData.length; index++) {
    // console.log(UsersData[index])
    if(UsersData[index].username==reqData.users){
      if(UsersData[index].name==reqData.relname){
        return [200,{ code: -1,msg:"注册失败,该用户已存在"}];
      } 
    }else{
      UsersData.push(reqData);
      // Store.set("UsersData",UsersData);
      return [200,{ code: 1,msg:"注册成功"}];
    }
  }
  return [200,{ code: 2,msg:"注册失败,该用户已存在"}];
})
export default axios
