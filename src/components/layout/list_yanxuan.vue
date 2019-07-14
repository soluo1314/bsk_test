<template>
  <div class="bs-list">
    <div class="list-classify">
     <div class="list-classify-a">乳品</div>
    </div>
    <div class="list-product">      
      <div class="list-product-tab" v-for="(item,index) in goodsList" :key="index">
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
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import '../../../static/fly'
// 提示框
import { Toast } from 'mint-ui';
export default {
  name: 'yanxuan',
  data () {
    return {
      activeList: [],
      goodsList:[]
    }
  },
  mounted () {
    this.pageInit();
  },
  methods: {
    pageInit() {
      Indicator.open();
      this.GetJdListNew(res=> {
        var goodsList=[];
        var url=`https://res.bestcake.com/m-images/ww/`;
        res.data.Tag.cakelist.forEach(item => {
          if(item.SupplyNo.indexOf("RP")!=-1){
              item.ImgUrl=`${url}rp/${item.Name}.jpg`;
              goodsList.push(item)
          }
        });
        this.goodsList = goodsList;
        Indicator.close();
      })
    },
    toShow(item) {
      //图片焦点图跳转详情页
      var data={
        key:item.Name,
        c:item.SupplyNo
      }
      this.$router.push({
        path: "/show",
        query: data
      });
    },
    addCart(item,e) {
      setTimeout(()=>{
         this.fly(item.ImgUrl,e)
      },10)
      var data ={
        id: item.ID,  //产品ID
        num:1,
        change:'https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg',
        isTrue:true,
        Name: item.Name, //产品详情图片拼接,//贝利
        CurrentPrice: item.CurrentPrice, //产品价格
        Size: item.Size, //产品规格
        url: item.ImgUrl, //产品购物车显示图片
      	SupplyNo:item.SupplyNo  //产品货号类型
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
        callback(res)
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-classify {
    margin-top: 7.466vw;
    height: 5.8667vw;
    display: flex;
    justify-content: center;
    .list-classify-a {
      font-size: 4.266vw;
      font-weight: bold;
    }
  }
    .list-product {
      display: flex;
      width: 100%;
      padding: 0 1.6vw;
      flex-wrap: wrap;
      // box-sizing: padding-box;
    }
</style>
