<template>
  <div>
    <mt-navbar class="nav">
      <mt-tab-item v-for="(item,index) in ziyin" :key="index" @click.native="optionData(item.mark,index)" :class="{active:tabActive==index}">
        {{item.name}}
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container>
      <mt-tab-container-item>
        <div class="list-product-tab" v-for="(item,index) in activeList" :key="index">
          <div class="list-product-img">
            <img v-lazy="item.ImgUrl" @click='toShow(item)'>
          </div>
          <div class="list-product-name">
            <span>{{item.Name}}</span>
          </div>
          <div class="list-product-info">
            <span>{{item.Means}}</span>
          </div>
          <div class="list-product-price">
            <div>
              <label>
                <span class>￥</span>
                <span class="cl">{{item.CurrentPrice|setPrice}}</span>
                <!-- <span class>.00</span> -->
              </label>
              <span class="list-product-sp">{{item.Size}}</span>
            </div>
          </div>
          <div class="list-product-cart">
            <img src="https://res.bestcake.com\m-images-2\list-cart.png?v=1" @click='addCart(item,$event)'>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
// Indicator 加载提示框
import { Indicator } from 'mint-ui';
// 引入 飞入JQ购物车插件
import '../../../static/fly'
// 提示框
import { Toast } from 'mint-ui';
export default {
  name: "ziyin",
  data() {
    return {
      tabActive: 0,
      selected: 0,
      goodsList: [],
      activeList: [],
      active: 1,
      ziyin: [
        { name: "经典", mark: "KSK" },
        { name: "女神", mark: "NS" },
        { name: "伴手礼", mark: "JZ" }
      ]
    };
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      Indicator.open();
      this.GetJdListNew(res => {
        var goodsList=res.data.Tag.cakelist;
        var url=`https://res.bestcake.com/m-images/ww/`;
         // https://res.bestcake.com/m-images/ww/jd/极地牛乳.png?v=14
        goodsList.forEach(item=> {
           if(item.SupplyNo.indexOf("KSK")!=-1){
            item.ImgUrl=`${url}jd/${item.Name}.png`;
          }else if(item.SupplyNo.indexOf("NS")!=-1){
             item.ImgUrl=`${url}ns/${item.Name}.jpg`;
          }else if(item.SupplyNo.indexOf("JZ")!=-1){
             item.ImgUrl=`${url}jz/${item.Name}.png`;
          }else{
              item.ImgUrl=`${url}rp/${item.Name}.jpg`;
          }
        })
         this.goodsList =goodsList;
         this.optionData(this.ziyin[0].mark,0); 
         Indicator.close();
      });
    },
    optionData(mark,index) {
      var activeList=[];
      this.goodsList.forEach((el) =>{
        if(el.SupplyNo.indexOf(mark)!=-1){
          activeList.push(el);
        }  
      })
      this.activeList=activeList;
       this.tabActive=index;
    },
    toShow(item) {
      var data = {
        key:item.Name,
        c:item.SupplyNo
      }
      this.$router.push({
        path: '/show',
        query:data
      })
    },
    addCart(item,e) {
      setTimeout(()=>{
         this.fly(item.ImgUrl,e)
      },10)
      var data ={
        id: item.ID,  //产品ID
        num:1,
        Name: item.Name, //产品详情图片拼接,//贝利
        CurrentPrice: item.CurrentPrice, //产品价格
        Size: item.Size, //产品规格
        url: item.ImgUrl, //产品购物车显示图片
        SupplyNo:item.SupplyNo,  //产品货号类型
        change:'https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg',
        isTrue:true
      }
      this.$store.commit('add',data)
      Toast({
        message: '添加成功',
        position: 'center',
        duration: 300
      });
    },
    fly(imgs,e) {
      var top=$(window).scrollTop();
      var dh=e.pageY;
      var newh=dh-top;
      // 购物车节点位置,图片飘的位置
      var oBtn=$('.btn').offset();
      var newdh=oBtn.top-top;
      var flyer = $(`<img style="width:80px;height:80px;" src="${imgs}"/>`);
      flyer.load(function(){
       flyer.fly({   
          start: {   
              left: e.pageX,//抛物体起点横坐标   
              top: newh //抛物体起点纵坐标   
          },   
          end: {   
              left: oBtn.left,//抛物体终点横坐标   
              top:  newdh,//抛物体终点纵坐标   
          },   
          onEnd: function() {   
              // $("#tip").show().animate({width: '200px'},300).fadeOut(500);////成功加入购物车动画效果   
              this.destory(); //销毁抛物体   
          }  
       }); 
      }); //抛物体对象   
    },
    GetJdListNew(callback) {
      this.$apis.GetJdListNew().then(res => {
        callback(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.nav /deep/ .mint-tab-item-label {
  font-size: 3.733vw;
}
.is-selected /deep/ .mint-tab-item-label {
  font-size: 4.266vw;
  font-weight: bold;
}
.nav /deep/ .is-selected {
    border-bottom: 0;
    color: #333;
    margin-bottom: -3px;
}
.active {
  border-bottom: 3px solid #26a2ff!important;
  color: #26a2ff!important;
}
</style>
