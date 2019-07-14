<template>
  <div id="show">
      <div class="swipe">
        <mt-swipe :auto="20000">
          <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
            <img class="imgs" v-lazy="item">
          </mt-swipe-item>
        </mt-swipe>
        <div class="cake_fhsy">更多商品</div>
      </div>
      <div class="cake_box" v-for='(el,index) in activeList' :key='index'>
          <div class="wt">
            <div class="cake_title">{{el.Name}}</div>
            <div class="cake_a">新</div>
          </div>
          <div class="cake_bgw">
            <div class="cake_b cake_info">
              <div>甜度</div>
              <div><img src="https://res.bestcake.com/m-images/ww/jz/tiandu_2.png" alt=""></div>
            </div>
            <div class="cake_b">
              <div>口味</div>
              <span>{{el.CategoryName}}</span>
            </div>
            <div class="cake_b">
              <div>原材料</div>
              <span>{{el.Resource}}</span>
            </div>
            <div class="cake_b">
              <div>适合人群</div>
              <span>-</span>
            </div>
            <div class="cake_b">
             <div>保鲜条件</div>
             <span>{{el.KeepFresh}}</span>
              </div>
          </div>
          <div class="cake_bgw1">
                <div class="c_a">
                    <div class="left">
                        <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-a.png" class="img">
                    </div>
                    <div class="right">商品评价</div>
                </div>
                <div class="c_b">
                   <div class="left">(0条)</div>
                    <div class="right">
                        <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-b.png" class="img">
                    </div> 
            </div>
          </div>
          <div class="cake_bgw2">
              <div class="cake-size-a">
                <div class="li-select" v-for='(item,index) in bangList' :key='index' :class="{active:isClass==index}"  @click="setClass(index,item)">{{item.Size}}
                </div>                   
              </div>
          </div>
          <div class="cake_bgw2">
            <div class="cake-size-a bg">
              <div class="bg1 bg2">购买数量</div>
              <div class="bg1">
                <button @click='jian'>-</button>
                <span>{{num}}</span>
                <button @click='jia'>+</button>
                </div>                
            </div>
           </div>
        <div class="footer">
            <div class="f_l">
              <div class="c_1">{{Price*num|setPrice}}</div>
              <div class="c_2">
                <div>已優惠:</div>
                <div>0.00</div>
              </div>
            </div>
            <div class="f_r">
              <div @click="addCart(el,index)">加入购物车</div>
            </div>
            <div class="f_c">
              <div @click='ljgm'>立即购买</div>
            </div>
        </div>    
          <infoFoot></infoFoot>
      </div>
  </div>
</template>

<script>
import { Indicator,MessageBox } from 'mint-ui';
import Store from "storejs";
export default {
  name: "show",
  data() {
    return {
      bannerList: [],// 轮播图数据
      activeList: [],// 
      bangList: [],
      isClass: 0,
      Price:0,
      num:1
    };
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      // Indicator.open();
      var activeList=[];
      var bangList=[];
      var str='';
      if(this.$route.query.c.indexOf('NS')!=-1) {
        // ----- 焦点图数据 -----
        this.GetNSCakeByName((res) => {
          // console.log(res.data.Tag);
          res.data.Tag.forEach(el=>{
            // console.log(el);
             bangList.push(el) 
          })
          this.bangList.push(bangList[0]);
          this.Price=res.data.Tag[0].CurrentPrice;
          activeList.push(res.data.Tag[0]);
          // Indicator.close();
        })
        this.setBannerList('ns-detail');
      }else if(this.$route.query.c.indexOf('KSK')!=-1){
        // -----主页商品详情数据-----
        this.GetCakeByName(res=> {
          // console.log(res);
        res.data.Tag.infos.CakeType.forEach(el => {
          // console.log(el);
          bangList.push(el)     
        });
        // console.log(bangList);
        this.bangList=bangList;
        this.Price=res.data.Tag.infos.CakeType[0].CurrentPrice;
        activeList.push(res.data.Tag.infos);      
        // Indicator.close();
        })
        this.setBannerList('jd-detail');
      }else if (this.$route.query.c.indexOf('RP')!=-1){
        // ----分类严选商品数据-----
        this.GetRuPCakeByName(res=>{
          // console.log(res.data.Tag);
           res.data.Tag.forEach(el=>{
            // console.log(el);
            if(el.City=='上海'){
             bangList.push(el) 
             }
          })
          this.bangList=bangList;
          this.Price=res.data.Tag[0].CurrentPrice;
        activeList.push(res.data.Tag[0]);
        // console.log(this.activeList)
        //  Indicator.close();
        })
        this.setBannerList('rp-detail');
       
      }else{
        // ----- 分类 伴手礼数据  -----
        this.GetjzCakeInfo(res => {
        console.log(res.data);
        // res.data.Tag.CakeType.forEach(el => {
        //    console.log(el);
        //   bangList.push(el)     
        // });
        // console.log(bangList);
        this.bangList=res.data.Tag;
        this.Price=res.data.Tag[0].CurrentPrice;
          activeList.push(res.data.Tag[0]);
           // Indicator.close();
        });
        this.setBannerList('jz-detail');
      }
      this.activeList=activeList; 
    },
    // 设置重量 价格方法
    setClass (index,item) {
          this.isClass=index;
          this.Price=item.CurrentPrice
    },
    // 加法
    jia () {
        this.num++
        // this.Price=this.num*this.Price
    },
    // 减法
    jian () {
      this.num--
      if(this.num<=1){
        this.num=1
      }
    // this.Price=this.num*this.Price
    },
    setBannerList(path) {
      for(var i= 0; i<4; i++) {
        var str = `https://res.bestcake.com/m-images/${path}/${this.$route.query.key}/${this.$route.query.key}-${i + 1}.jpg`;
        this.bannerList.push(str);
      } 
    },
    // 点击加入购物车
    addCart(el,index) {  
      // console.log(el,index);
      var data = {
        id: el.ID||el.CakeType[0].Id,  //产品ID
        num:1,
        change:'https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg',
        isTrue:true,
        Name: el.Name, //产品详情图片拼接,//贝利
        CurrentPrice: el.CurrentPrice||el.CakeType[0].CurrentPrice, //产品价格
        Size: el.Size||el.CakeType[0].Size, //产品规格
        url: this.bannerList[0], //产品购物车显示图片
      	SupplyNo:el.SupplyNo||el.CakeType[0].SupplyNo  //产品货号类型
      };
      // console.log(data);
      MessageBox.confirm('',{
        title:'提示',
        message:'成功添加到购物车',
        confirmButtonText:'去结算',
        cancelButtonText:'再看看'
      }).then(action => {
        if(action == 'confirm') {
          MessageBox('提交','添加成功')
          this.$store.commit('add',data);
          this.$router.push({
            path:'/cart'
          })
        }
      }).catch(error=>{
          if(error == 'cancel'){
        //  MessageBox('提交','已取消')
         this.$store.commit('add',data);
        }
      });
    },
    ljgm(){
      if(Store.get('userInfo')){
        if(Store.get('shopCart')){
          this.$router.push({
          path:'/cart'
        })
        }else{
          alert('请先添加商品')
        }
      }else{
        MessageBox({
          message: '请先登录',
          showCancelButton: true
        })
          .then(action => {
            if (action === 'confirm') {
              this.downadopt = !this.downadopt
              this.$router.push({
                path: '/userinfo'
              })
            }
          })
      }
    },
    // 商品详情接口
    GetCakeByName(callback) {
      var data = {
        ProName: this.$route.query.key
      }
      this.$apis.GetCakeByName(data).then(res => {
        callback(res)
      })
    },
    // 焦点图详情接口
    GetNSCakeByName(callback) {
      var data = {
        Name: this.$route.query.key
      } 
      this.$apis.GetNSCakeByName(data).then(res => {
        callback(res);
      })
    },
    GetjzCakeInfo(callback){
      var data = {
        ProName: this.$route.query.key
      } 
      this.$apis.GetjzCakeInfo(data).then(res => {
        callback(res);
      })
    },
    GetRuPCakeByName(callback) {
      var data = {
        Name: this.$route.query.key
      } 
      this.$apis.GetRuPCakeByName(data).then(res => {
        callback(res);
      })
    }
  }
}
</script>

<style scoped lang="scss">
#show {
  background: #f7f7f7;
  position: relative;
  width: 100%;
  height: 100%;
    .swipe {
      width: 100%;
      height: r(445 * 2);
      .imgs {
        width: 100%;
        height: 100%;
      }
      .cake_fhsy {
      position: fixed;
      font-size: 4.2vw;
      right: -1px;
      top: 4vw;
      background-color: rgba(255,255,255,0.5);
      width: 22vw;
      height: 9vw;
      border-radius: 1.2vw 0vw 0vw 1.2vw;
      line-height: 8vw;
      text-align: center;
      z-index: 2;
      border: 1px solid #333;
    }
    }   
}
.cake_box {
  width: 100%;
  .wt {
    background: #fff;
    width: 100%;
    padding-bottom: 8vw;
    .cake_title {
      line-height: 4.53vw;
      font-weight: bold;
      color: #333;
      font-size: 4.53vw;
      margin-bottom: 4vw;
      text-align: center;
      width: 58.33333333%;
      margin-left: auto;
      background: white;
      margin-right: auto;
    }
    .cake_a {
      font-size: 4vw;
      line-height: 8vw;
      margin: 0 auto;
      width: 8vw;
      height: 8vw;
      text-align: center;
      color: #fff;
      border-radius: 2px;
      background: #f2495e;
    }
  }
  .cake_bgw {
    width: 100%;
    background: white;
    .cake_info {
      margin-bottom: 2.93vw;
      margin-top: 4vw;
    }
    .cake_b {
      width: 100%;
      margin-bottom: 4vw;
      display: flex;
      div {
        font-size: 3.73vw;
        width: 15.93vw;
        margin-left: 4vw;
        color: #9A9A9A;
        img {
          vertical-align: top;
          width: 22.4vw;
          margin-top: 0.6vw;
        }
      }
      span {
        font-size: 3.73vw;
        color: #252525;
        width: 72vw;
        margin-left: 4vw;
        margin-right: 4vw;
      }
    }
  }
  .cake_bgw1 {
    padding: 4vw 0;
    margin-top: 4vw;
    background: white;
    display: flex;
    justify-content: space-between;
    div {
      width: 50%;
      display: flex;
      align-items: center;
    }
    .c_a{
      padding-left: 4vw;
      .left {
        font-size: 3.73vw;
        margin-top: 1.2vw;
        margin-right: 2.93vw;
        width: 12%;
      }
      .right {
        font-size: 3.73vw;
      }
      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
    }
    .c_b {
      padding-right: 4vw;
      justify-content: flex-end;
      .left {
        font-size: 3.73vw;
        color: #9A9A9A;
        text-align: right;
      }
      .right {
        font-size: 3.73vw;
        margin-top: 1.3vw;
        margin-left: 1.6vw;
        width: 5%;
        img {
        display: block;
        max-width: 100%;
        height: auto;
      }
      }
    }
  }
  .cake_bgw2 {
    margin-top: 4vw;
    width: 100%;
    background: white;
    .cake-size-a {
      margin-top: 4vw;
      height: 8vw;
      margin-bottom: 4vw;
      display: flex;
      .li-select {
        // font-size: 3.73vw;
        font-size: r(18*2);
        text-align: center;
        height: 8vw;
        line-height: 8vw;
        padding: 0 3.5875vw;
        height: 8vw;
        margin-left: 4vw;
        background: #fff;
        border-radius: 2px;
        color: #333;
        border: 1px solid #ddd;
      }
    }
  }
  .bg {
    justify-content: space-between;
    padding-left: 4vw;
    .bg1 {
      flex:1;
      line-height: 8vw;
      font-size: r(18*2);
      display: flex;
      justify-content: flex-end;
      padding-right:3.5875vw;
      button {
        border: 0;
        background: #fff;
        font-size: r(20*2);
        outline:none;
        // width: ;
      }
      span {
        margin:0 r(10) 0 r(10);
      }
    }
    .bg2 {
       justify-content: flex-start;
    }
  }
}
.cake_box .cake_bgw2 .cake-size-a>.active{
    background: #02d3d6;
    border-radius: 2px;
    color: #fff;
    border: 1px solid #02d3d6;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  height: 14.6666vw;
  margin-top: 4vw;
  width: 100%;
  display:flex;
  background-color: #fff;
  .f_l{
    margin-left: 4vw;
    margin-top: 1.4492vw;
    margin-bottom: 2.4vw;
    width: 36vw;
    overflow: hidden;
    .c_1 {
    font-size: 4.53vw;
    color: #f2495e;
    font-weight: bolder;
    width: 36vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
    .c_2 {
      display: flex;
      div{
      font-size: 2.4vw;
      color: #333;
      }
    }
  }
  .f_c{
    width: 30.667vw;
    text-align: center;
    // line-height: 14.6666vw;
    background: #02d4d7;
    color: white;
    font-weight: bolder;
     div {
      width: 100%;
      height: 14.6666vw;
      line-height: 14.6666vw;
      font-size: r(18*2);
    }
  }
  .f_r{
    width: 29.335vw;
    text-align: center;
    div {
      width: 100%;
      height: 14.6666vw;
      line-height: 14.6666vw;
      font-size: r(18*2);
    }
  }
}
</style>
