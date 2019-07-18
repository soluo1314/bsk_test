<template>
  <div class="main">
     <div class="CT_box" v-if="flag" @click.prevent.stop="flag=false">
      <div class="City" @click.prevent.stop>
        <div class="chooseCity">选择城市</div>
        <ul class="clear">
          <li v-for="item in CityOne" :key="item.id" @click="chooseCity(item)">{{item}}</li>
        </ul>
        <ul class="clear">
          <li v-for="item in CityTwo" :key="item.id" @click="chooseCity(item)">{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="city" @click='Choose'>{{City}}</div>
    <div class="box">
      <mt-swipe :auto="10000">
        <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
          <a href="javascript:;">
            <img v-lazy="item.ImgUrl">
          </a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <nav>
      <div v-for='(el,index) in iconList' :key='index'>
        <a href="javascript:;">
          <div>
            <img :src="el.ImgUrl">
          </div>
        </a>
        <span>{{el.ActName}}</span>
      </div>
    </nav>
    <div class="guanggao">
      <!-- <span v-for="(item,index) in icoImgList" :key="index" @click="toShow(item.key,'ns')">{{item.name}}</span> -->
      <div class="g-l" v-for="(item,index) in icoImgList" :key="index">
        <a href="javascript:;">
          <img :src="item.ImgUrl" @click="toShow(item)">
        </a>
        </div>
    </div>
    <img src="https://res.bestcake.com/m-images-2/mofa.png" class="special">
    <div class="special-title">任选一款，走进你的心</div>
    <div class="mofa-tab">
      <div v-for="(item,index) in tabClass" :key='index' @click='setTab(index)' :class="{selected:tabActive==index}">{{item}}</div>
    </div>
    <div class="mofa-list">
      <div v-for="(item,index) in activeList" :key='index' class="mofa-cake">
        <img :src="item.ImgUrl" class="mofa-img" @click="toShow(item)">
        <div class="mofa-name">{{item.Name}}</div>
        <div class="mofa-price">
          <span>￥</span>
          <span>{{item.CurrentPrice}}</span>
          <span>{{item.Size}}</span>
        </div>
      </div>
    </div>
    <img src="https://res.bestcake.com/m-images-2/pinzhi.png" class="special">
    <div class="special-title">没尝过这些美味的人生，是不完美的</div>
    <div class="pinzhi-list" v-for="(item,index) in pinzhiList" :key='index'>
      <div class="pinzhi-img">
        <!-- <img :src="item.ImgUrl"> -->
        <img v-lazy="item.ImgUrl" @click="toShow(item)">
      </div>
      <div class="pinzhi-detail">
        <div class="pinzhi-name">{{item.Name}}</div>
        <div class="pinzhi-info">{{item.MoreUrl}}</div>
        <div class="pinzhi-tip"><img src="https://res.bestcake.com/m-images-2/icon_zy.png"></div>
        <div class="pinzhi-price">
          <div>
            <label>
              <span>￥</span>
              <span>{{item.CurrentPrice|setPrice}}</span>
            </label>
            <span class="sp">{{item.Size}}</span>
          </div>
        </div>
      </div>
      <div id="shopCart" class="pinzhi-cart">
          <img src="https://res.bestcake.com/m-images-2/pinzhi-cart.png" @click="addCart(item,$event)">
      </div>
    </div>
    <infoFoot></infoFoot>
  </div>
</template>

<script>
// Indicator 加载提示框
// import { Indicator } from 'mint-ui';
// 引入 飞入JQ购物车插件
import '../../../static/fly'
// 提示框
import { Toast } from 'mint-ui'
export default {
  name: 'info',
  data () {
    return {
      City: '上海',
      CityOne: ['上海', '北京', '天津', '重庆'],
      CityTwo: [
        '苏州',
        '无锡',
        '南京',
        '杭州',
        '宁波',
        '绍兴',
        '成都',
        '常州',
        '台州',
        '嘉兴'
      ],
      flag: true,
      bannerList: [], // 轮播图数据
      iconList: [], // 8个ico导航数据
      icoImgList: [
        {
          name: '宠爱少女',
          key: '宠爱少女',
          ImgUrl: 'https://res.bestcake.com/m-images-2/guanggao1.png'
        
        },
        {
          name: '小猪蛋糕-贝丽',
          key: '贝丽',
          ImgUrl: 'https://res.bestcake.com/m-images-2/guangao22.png'
        },
        {
          name: '星光游乐园',
          key: '星光游乐园',
          ImgUrl: 'https://res.bestcake.com/m-images-2/guanggao3.png'
        }
      ], // 三张广告焦点图数据
      tabClass: ['送恋人', '送挚友', '送长者', '送亲子'], // 魔法猜心数据
      tabList: [], // 魔法猜心所有数据
      pinzhiList: [], // 品质甄选所有数据
      tabActive: 0,
      activeList: []
    }
  },
  mounted () {
    this.pageInit()
  },
  methods: {
    pageInit () {
    // 轮播图
      this.GetBannerList(res => {
        res.forEach(el => {
          el.ImgUrl = 'https://res.bestcake.com/' + el.ImgUrl
        })
        this.bannerList = res
      })
      // Indicator.open();
      this.GetIndexCakeList(res => {
        // 截取8个导航栏数据
        this.iconList = res.iconList.splice(0, 8)
        res.list.forEach(el => {
          if (el.TabType == 4) {
            this.tabList.push(el)// 魔法猜心数据
          } else {
            this.pinzhiList.push(el)// 品质甄选数据
          }
        })
        // Indicator.close();
        this.setTab(0)
      })
    },
    //
    Choose () {
      this.flag = true
    },
    // 选择城市
    chooseCity (item) {
      this.City = item
      this.flag = false
      this.bannerList = []
      // this.iconList= [];
      // this.icoImgList= [];
      this.pinzhiList = []
      // this.tabClass = []
      // this.tabList = []
      this.tabActive = 0
      this.activeList = []
      this.pageInit()
      document.cookie = 'City ' + '=' + this.City + ';expires=' + new Date().getTime() + 1000 * 60 * 20
    },
    // ---- 图片跳转详情页 ---
    toShow (item) {
      var data = {
        key: item.Name || item.key,
        c: item.SupplyNo || 'NS'
      }
      this.$router.push({
        path: '/show',
        query: {key: data.key, c: data.c}
      })
    },
    // 点击飞入购物车效果
    addCart (item, e) {  
      setTimeout(() => {
        this.fly(item.ImgUrl, e)
      }, 10)
      var data = {
        id: item.Pid, // 产品ID
        num: 1,
        Name: item.Name, // 产品详情图片拼接,//贝利
        CurrentPrice: item.CurrentPrice, // 产品价格
        Size: item.Size, // 产品规格
        url: item.ImgUrl, // 产品购物车显示图片
        SupplyNo: item.SupplyNo, // 产品货号类型
        change: 'https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg',
        isTrue: true
      }
      this.$store.commit('add', data)
      Toast({
        message: '添加成功',
        position: 'center',
        duration: 300
      })
    },
    fly (imgs, e) {
      var top = $(window).scrollTop()
      var dh = e.pageY
      var newh = dh - top
      // 购物车节点位置,图片飘的位置
      var oBtn = $('.btn').offset()
      var newdh = oBtn.top - top
      var flyer = $(`<img style="width:80px;height:80px;" src="${imgs}"/>`)
      flyer.load(function () {
        flyer.fly({   
          start: {   
            left: e.pageX, // 抛物体起点横坐标   
            top: newh // 抛物体起点纵坐标   
          },   
          end: {   
            left: oBtn.left, // 抛物体终点横坐标   
            top: newdh// 抛物体终点纵坐标   
          },   
          onEnd: function () {   
            // $("#tip").show().animate({width: '200px'},300).fadeOut(500);////成功加入购物车动画效果   
            this.destory() // 销毁抛物体   
          }  
        }) 
      }) // 抛物体对象   
    },
    // ---- mofa-tab栏切换 ---
    setTab (index) {
      var activeList = []
      this.tabList.forEach(el => {
        if (this.tabClass[index] == el.ActiveName) {
          activeList.push(el)
        }
      })
      this.activeList = activeList.slice(0, 3)
      this.tabActive = index
    },
    // ----- 接口 ------
    GetBannerList (callback) {
      var data = {
        v: '1559785164172',
        c: 'Index',
        m: 'GetBannerList',
        Type: '2',
        City: '上海'
      }
      this.$apis.GetBannerList(data).then(res => {
        callback(res.data.Tag.List)
      })
    },
    GetIndexCakeList (callback) {
      this.$apis.GetIndexCakeList().then(res => {
        // console.log(res);
        callback(res.data.Tag)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
 <style scoped lang="scss" >
  .mint-swipe  /deep/  .mint-swipe-indicator {
    border-radius:  0;
    display: inline-block;
    width: r(6);
    height: r(15);
    background: #666;
    transition: height .1s ease-out;
    margin: 0 0.66vw;
    border-radius: r(1);
  }
  .mint-swipe  /deep/  .is-active {
    height: r(16*2);
    opacity: 1;
    background: #666;
  }
  .main {
    width: 100%;
    height: 100%;
    position:relative;
    flex: 1;
    overflow-y: scroll;
    .box {
      width: 100vw;
      height: 50.667vw;
      .mint-swipe {
        width: 100%;
        height: 100%;
        .mint-swipe-item {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
    }
    nav {
      height: r(201 * 2);
      padding: 0 r(11.5 * 2) r(15 * 2) r(11.5 * 2);
      display: flex;
      flex-wrap: wrap;
      border-bottom: r(10 * 2) solid #fafafa;
      div {
        width: 25%;
        height: r(76 * 2);
        margin-top: r(12 * 2);
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        a {
          div {
            width: r(57 * 2);
            height: r(57 * 2);
            display: inline-block;
          }
          img {
            width: r(56 * 2);
            height: r(56 * 2);
          }
        }
        span {
          font-size: 3.8vw;
        }
      }
    }
    .guanggao {
      width: 100vw;
      height: 51vw;
      padding: 4vw;
      border-bottom: 2.666666666666667vw solid #fafafa;
      .g-l {
        width: 45vw;
        height: 40vw;
        float: left; 
        img {
          display: block;
          width: 45vw;
          height: 40vw;
        }
      }
      .g-l:nth-child(2),.g-l:nth-child(3) {
        height: 19.5vw;
        width: 45vw;
        float: right;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .g-l:nth-child(2) {
        margin-bottom: r(5);
      }
    }
    .special {
      width: 100vw;
      margin: 6.667vw 0 2.667vw;
      img {
        max-width: 100% !important;
        height: auto;
      }
    }
    .special-title {
      width: 100vw;
      text-align: center;
      color: #999;
      font-size: 3.2vw;
      line-height: 4.8vw;
      margin-bottom: 4.26667vw;
    }
    .mofa-tab {
      width: 100vw;
      padding: 0 4vw;
      display: flex;
      justify-content: space-between;
      margin-bottom: 2.666666666667vw;
      div {
        width: 16vw;
        height: 8.8vw;
        text-align: center;
        line-height: 7.466666666666667vw;
        font-size: 3.2vw;
        color: #333;
        background: url(https://res.bestcake.com/m-images-2/mofa-1.png) no-repeat
          center center;
        background-size: 16vw 8.8vw;
      }
    }
    .mofa-list {
      width: 100%;
      padding-left: 4vw;
      border-bottom: 2.666666666666667vw solid #fafafa;
      padding-right: 5.333333333333333vw;
      padding-bottom: 5.333333333333333vw;
      margin-bottom: r(10 * 2);
      display: flex;
      justify-content: space-between;
      .mofa-cake {
        width: 24vw;
        flex: 1;
        text-align: center;
        img {
          height: 24vw;
          max-width: initial !important;
        }
        .mofa-name {
          color: #333;
          font-size: 3.733333333333333vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .mofa-price span {
          color: rgb(255, 51, 0);
          font-size: 3.2vw;
        }
        .mofa-price span:nth-child(2) {
          font-size: 4.267vw;
        }
        .mofa-price span:nth-child(3) {
          color: rgb(212, 212, 212);
          font-size: 3.2vw;
          margin-left: 1.067vw;
        }
      }
    }
  }
  .mofa-tab div.selected {
    background-image: url(https://res.bestcake.com/m-images-2/mofa-2.png);
    color: #fff;
  }
  // 品質甄選 樣式
  .pinzhi-list {
      width: 100vw;
      height: 29.333vw;
      margin-bottom: 3.2vw;
      position: relative;
      padding: 0 4vw;
      display: flex;
      .pinzhi-img {
        width: 29.333vw;
        height: 29.333vw;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .pinzhi-detail {
        margin-left: 4vw;
      }
      .pinzhi-detail div {
        max-width: 50vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
        .pinzhi-name {
          font-size: 4.267vw;
          color: #333333;
          margin: 1.067vw 0 0;
        }
        .pinzhi-info {
          font-size: 3.2vw;
          color: #999;
          margin-bottom: 1.067vw;
        }
        .pinzhi-tip {
          height: 4.8vw;
          font-size: 0;
          img {
            height: 4.8vw;
            margin-right: 0.4vw;
          }
        }
        .pinzhi-price {
          font-size: 0vw;
          position: relative;
          top: 1vw;
          label {
            display: inline-block;
            margin-bottom: r(5);
            font-weight: 700;
            span {
            font-size: 3.2vw;
            color: rgb(255, 51, 0);
            }
            span:nth-child(2) {
              font-size: 4.267vw;
            }
          }
          .sp {
            color: rgb(212, 212, 212);
            font-size: 3.2vw;
            margin-left: 1.067vw;
          }
        }
      .pinzhi-cart {
        width: 11.2vw;
        height: 11.2vw;
        position: absolute;
        right: 4vw;
        bottom: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  .bth_hide {
    display: block!important;
  }
  .CT_box {
   width: 100%;
   height: 100%;
   position: fixed;
   background: rgba(000,000,000,.3);
   z-index: 999999;
  }
  .City {
    background: rgb(255, 255, 255);
    position: fixed;
    width: 77.33vw;
    left: 11.47vw;
    top: 8.84vh;
    z-index: 999999;
  }
  .chooseCity {
    margin-left: auto;
    margin-right: auto;
    border-bottom: 0.15vw solid rgb(51, 51, 51);
    display: block;
    width: 20vw;
    font-size: 4.26vw;
    padding-top: 2.39vh;
    padding-bottom: 1.79vh;
    line-height: 3.37vh;
    margin-bottom: 5.24vh;
    font-weight: 700;
    text-align: center;
  }
  .clear {
    display: flex;
    width: 100%;
    margin: 0 0 1.6rem 0;
    padding-left: 0;
    padding-right: 0;
    flex-wrap: wrap;
    li{
      width: 33.3333%;
      margin-bottom: 2.24vh;
      text-align: center;
      // width: 18.66vw;
      color: #333;
      font-size: 3.73vw;
      line-height: 4.94vh;
    }
  }
  .city{
    position: absolute;
    left: 0;
    top: 4vw;
    background-color: rgba(255,255,255,0.5);
    background-image: url(https://res.bestcake.com/m-images-2/location.png);
    background-repeat: no-repeat;
    width: 20vw;
    height: 8vw;
    border-radius: 0vw 1.2vw 1.2vw 0vw;
    line-height: 8vw;
    background-size: 6.4vw 6.4vw;
    background-position: 0.8vw 0.8vw;
    padding-left: 5.2vw;
    text-align: center;
    z-index: 1;
    font-size: r(16*2);
  }
</style>
