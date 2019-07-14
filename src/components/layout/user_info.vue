<template>
  <div class="hello">
    <!-- <h1>个人信息</h1> -->
    <div class="header">
        <img :src="user.avatar" alt="" class="touxiang">
        <div>{{user.name}}</div>
        <mt-button type="primary" @click.native.prevent='login_tc()' >退出登录</mt-button>
    </div>
    <div class="person-vip">
          <div class="clplr">
            <div class="p-v1">会员等级</div>
            <div class="p-v2">V0</div>
          </div>
          <div class="clplr">
            <div class="p-v1">机智币</div>
            <div class="p-v2">0</div>
          </div>
          <div class="clplr">
            <div class="p-v1">优惠券</div>
            <div class="p-v2">0</div>                     
          </div>
          <div class="clplr">
            <div class="p-v1">兑换券</div>
            <div class="p-v2">0</div>
          </div>
    </div>  
    <div class="person-dd">
      <div class="person-dd-1">
          <div class="person-dd-2"><img src="https://res.bestcake.com\m-images\order\mw-person-dd.png"></div>
          <div class="person-dd-3">我的订单</div>
          <div class="person-dd-4"><img src="https://res.bestcake.com\m-images\order\mw_firm_right.jpg"></div>
      </div>
      <div class="personclear"></div>
      <div class="person-dd-1">
          <div class="person-dd-2"><img src="https://res.bestcake.com\m-images\order\mw_firm_ad.jpg"></div>
          <div class="person-dd-3">收货地址</div>
          <div class="person-dd-4"><img src="https://res.bestcake.com\m-images\order\mw_firm_right.jpg"></div>
    </div>
    </div>  
    <div class="kf">
      <a href="javascript:;">客服热线：400-627-5757</a>
    </div>   
    <div class="fw">
      <a href="javascript:;">服务协议与证照信息</a>
    </div>
    <div class="kong"></div>
  </div>
</template>

<script>
import Mock from "mockjs";
import Store from "storejs";
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  name: 'HelloWorld',
  data () {
    return {
      flag: true,
      user:{},
    }
  },
  mounted(){
    // console.log(Store.get('userInfo').avatar);
   this.pageInit();
  },
  methods: {
    pageInit(){
      this.user=this.$store.state.userinfo
      // console.log(this.user);
    },
    // 退出登录
       login_tc(){
          // var users=Store.get('userInfo');
          // console.log(users);
        MessageBox.confirm('',{
        title:'提示',
        message:'是否确定退出',
        confirmButtonText:'确定',
        cancelButtonText:'取消'
      }).then(action => {
        if(action == 'confirm') {
          MessageBox('提示','退出登录')
        //  this.$store.state.userinfo.remove;
          // this.user={};
          Store.remove('userInfo');
           this.$router.push({
              path: '/userinfo',
            })
        }
      }).catch(error=>{
          if(error == 'cancel') {
         MessageBox('提示','已取消')
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  body{
    height: 100%;
    width: 100%;
  }
   .hello /deep/ .mint-button{
     background-color: #fff;
     color: #000;
  }
 .hello {
    overflow: hidden;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    background: rgb(247, 247, 247);
 }
  .kong {
    height: r(80*2);
  }
 .header {
  width: 100%;
  display: flex;
  background:#fff;
  flex-direction: column;
  align-items: center;
  padding-top: 6.66vw;
    img {
      display:block;
      width: 21.06vw;
      border-radius: 50%;
      
    }
    div {
    padding-top: 1.33vw;
    line-height: 5.33vw;
    font-size: 3.73vw;
    color: #333;
    }
 }
  .person-vip{
    padding-top: 8.66vw;
    background: #fff;
    padding-bottom: 4vw;
    display: flex;
    margin-bottom: 4vw;
      .clplr {
        width: 25%;
        text-align: center;
        .p-v1{
          line-height: 4vw;
          font-size: 2.93vw;
          color: #ccc;
          width: 100%;
        }
        .p-v2{
          padding-top: 1.73vw;
          line-height: 5.73vw;
          font-size: 4.8vw;
          width: 100%;
          color: #333;
        }
      }
    }
  .person-dd {
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    .person-dd-1 {
      height: r(54*2);
      width: 100%;
      display: flex;
      position: relative;
      .person-dd-2 {
        padding-left: 4vw;
        padding-top: 3.38vw;
        padding-bottom: 4vw;
        img {
          width: 4vw;
          display: block;
        }
      }
      .person-dd-3 {
        padding-left: 2.66vw;
        padding-top: 3.86vw;
        padding-bottom: 3.86vw;
        font-size: r(16*2);
      }
      .person-dd-4 { 
        position: absolute;
        right: 4vw;;
        top: 3.86vw;
        img {
          width: 2.4vw;
        }
      }
    }
    .personclear {
      clear: both;
      border-bottom: 0.27vw solid #ddd;
      margin-left: 4vw;
    }
  }
  .kf {
    margin-top: 35.73vw;
    line-height: 4vw;
    color: #999;
    display: flex;
    justify-content: center;
    a{
      color: #999;
      font-size: r(14*2);
    }
   }
   .fw {
     margin-top: 10vw;
    line-height: 4vw;
    color: #999;
    display: flex;
    justify-content: center;
    a{
      color: #999;
      font-size: r(14*2);
    }
   }
  .tc{
    width: 100%;
    display: flex;
    justify-content: center;
  }

</style>
