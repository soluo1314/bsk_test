<template>
  <div id="cart">
    <div class="header" v-show="$store.state.shopCart.list.length==0">购物车是空的哦~</div>
    <div class="cart_show" v-show="$store.state.shopCart.list.length">
      <div class="cart_show_t" v-for='(el,index) in $store.state.shopCart.list' :key='index'>
        <div class="cart_show_c">
          <div class="gwc_yh_1">
          <img :src='el.change' @click='isTrue(index)'>
          <!-- <img :src='imgs[1]' v-show="!bool"> -->
          </div>
          <div class="gwc_yh_2">
            <div class="gwc_yh_3">
              <a href="javascript:;">
                <img :src="el.url" alt="">
              </a>
            </div>
            <div class="gwc_yh_4">
              <div class="top">
                {{el.Name}}
              </div>
              <div class="cent">
                <div class="bang">{{el.Size}}</div>
                <div class="gwc_jj">
                  <div class="jian" @click="push(el)">-</div>
                  <div>{{el.num}}</div>
                  <div class="jia" @click="sub(el)">+</div>
                </div>
              </div>
              <div class="btm">
                <div>{{el.CurrentPrice*el.num|setPrice}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart_show_b">
          <div class="left">优惠方式</div>
          <div class="right">不参与活动</div>
        </div>
      </div>
    </div>
    <!-- <div v-for="(item, index) in   this.$store.state.shopCart.list" :key="index">
      {{item}}
    </div> -->
    <div class="main">
        <div class="cart_info">
          <div class="cart_top">Hot  Recommend</div>
          <div class="cart_xian">
            <div></div>
          </div>
          <div class="cart_rexiao">热销新品推荐</div>
          <div class="cart_list">
            <div class="cart_cake">
              <div class="cake_1">
                <a href="javascript:;">
                  <img src="https://res.bestcake.com\m-images\cart\mw_firm_sq.jpg">
                </a>
              </div>
              <div class="cake_2">伴手礼系列-吉致生巧</div>
              <div class="cake_3">
                <div class="left">
                  <span>168.00</span>/盒
                </div>
                <div class="right">
                  <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg">
                </div>
              </div>
            </div>
            <div class="cart_cake">
              <div class="cake_1">
                <a href="javascript:;">
                  <img src="https://res.bestcake.com\m-images\cart\mw_firm_nzt_v1.jpg">
                </a>
              </div>
              <div class="cake_2">伴手礼系列-吉致牛轧糖</div>
              <div class="cake_3">
                <div class="left">
                  <span>68.00</span>/盒
                </div>
                <div class="right">
                  <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt="">
                </div>
              </div>
            </div>
            <div class="cart_cake">
              <div class="cake_1">
                <a href="javascript:;">
                  <img src="https://res.bestcake.com\m-images\cart\mw_firm_pf_v1.jpg">
                </a>
              </div>
              <div class="cake_2">伴手礼系列-吉致泡芙</div>
              <div class="cake_3">
                <div class="left">
                  <span>88.00</span>/盒
                </div>
                <div class="right">
                  <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg">
                </div>
              </div>
            </div>
          </div>   
          <div class="foot">
              <div class="gwc_js1">
                <img :src='imgs' @click="tab()">
                <!-- <img :src='imgs[1]' v-show="!bool"> -->
              </div>
              <div class="gwc_js2">全选</div>
              <div class="gwc_js3" @click="del"><a>清空</a></div>
              <div class="gwc_js4">
                <div class="top">
                  <div>合计：</div>
                  <span>{{all()|setPrice}}</span>
                </div>
                <div class="bottom">
                  <div>已优惠：</div>
                  <div>0.00</div>
                </div>
              </div>
              <div class="gwc_js5" @click='toLogin'><a>结算</a></div> 
          </div>      
        </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import Store from 'storejs'
export default {
  data () {
    return {
      cartList: [],
      price: 0,
      imgs: 'https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg',
      bool: true
    }
  },
  mounted () {
    // console.log(this.$store.state.shopCart.list.length === 0); 
    // this.sub();
  },
  methods: {
    isTrue (index) {
      this.$store.state.shopCart.list[index].isTrue = !this.$store.state.shopCart.list[
        index
      ].isTrue
      if (this.$store.state.shopCart.list[index].isTrue) {
        this.$store.state.shopCart.list[index].change = 'https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg'
      } else {
        this.$store.state.shopCart.list[index].change = 'https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg'
      }
      let flag = true
      this.$store.state.shopCart.list.forEach(el => {
        if (el.isTrue == false) {
          flag = false
        }
      })
      if (flag) {
        this.imgs = 'https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg'
      } else {
        this.imgs = 'https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg'
      }
    },
    //  选中购物车单个
    tab () {
      this.bool = !this.bool
      if (this.bool) {
        this.imgs =
        'https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg'
        this.$store.state.shopCart.list.forEach(el => {
          el.isTrue = true
          el.change =
          'https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg'
        })
      } else {
        this.imgs =
        'https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg'
        this.$store.state.shopCart.list.forEach(el => {
          el.isTrue = false
          el.change = 'https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg'
        })
      }
      this.all()
    },
    // 購物車全選按鈕
    all () {
      let sum = 0
      this.$store.state.shopCart.list.forEach(el => {
        if (el.isTrue) {
          sum += el.CurrentPrice * el.num
        }
      })
      return sum
    },
    // 清空購物車
    del () {
      if (!this.$store.state.shopCart.N) return 
      if (this.bool == true) {
        MessageBox.confirm('', {
          title: '提示',
          message: '是否确定执行该操作?',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action == 'confirm') {
            MessageBox('查看', '删除成功')
            // this.$store.commit('add',data);
            this.$store.state.shopCart.N = 0
            this.$store.state.shopCart.list = []
            Store.remove('shopCart') 
          }
        }).catch(error => {
          if (error == 'cancel') {
            MessageBox('查看', '已取消')
          }
        })
      };
    },
    // 購物車數量 --
    push (el) {
      // console.log(el);
      this.$store.state.shopCart.list.forEach(ele => {
        if (el.id == ele.id) {
          el.num--
          if (el.num == 0) {
            el.num = 1
            return
          }
          this.$store.state.shopCart.N--
        }    
      })
      //  this.$store.commit("push")
    },
    // 購物車數量 ++
    sub (el) {
      this.$store.state.shopCart.list.forEach((ele, index) => {
        // console.log(el,ele); 
        if (el.id == ele.id) {
          el.num++
          this.$store.state.shopCart.N++
        }
      })
      // Store.set('shopCart',this.$store.state.shopCart)
      // this.$store.state.shopCart.list[index].num++
    },
    // 結算
    toLogin () {
      if (!this.$store.state.shopCart) {
        MessageBox({
          message: '请先添加商品',
          showCancelButton: true
        })
          .then(action => {
            if (action === 'confirm') {
              this.downadopt = !this.downadopt
              this.$router.push({
                path: '/info'
              })
            }
          })
        return
      }
      if (this.$store.state.userinfo) {
        this.$router.push({
          path: '/userinfo'
        })
      } else {
        // alert('请先登陆')
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #cart { 
    width: 100%;
    background: #fff;
    .header{
      line-height: 16vw;
      color: #141414;
      font-size: 3.2vw;
      background: #fff;
      text-align: center;
      height: 16vw;
      width: 100%;
    }
    .main {
      padding-top: 14vw;
      background: whitesmoke;
      .cart_info {
        padding-top: 17.2vw;
        padding-left: 3.6vw;
        width: 100%;
        .cart_top {
          line-height: 7.46vw;
          color: #333;
          font-weight: bold;
          font-size: 6.4vw;
          text-align: center;
        }
        .cart_xian {
          padding-left: 22.3vw;
          padding-bottom: 2vw;
          padding-top: 2vw;
          width: 100%;
          div {
            width: 52.3vw;
            height: 2px;
            background: #333;
          }
        }
        .cart_rexiao {
          width: 100%;
          line-height: 4vw;
          color: #333;
          font-weight: bold;
          font-size: 4vw;
          text-align: center;
          margin-bottom: 12.26vw;
        }
        .cart_list {
          padding-bottom: 22.66vw;
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          .cart_cake {
            padding-right: 1.73vw;
            width: 50%; 
            .cake_1 {
              width: 100%;
              a {
                img {
                  width: 44vw;
                }
              }
            }
            .cake_2 {
              width: 100%;
              line-height: 5.33vw;
              font-size: 3.73vw;
              color: #333;
              margin-bottom: 2.4vw;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-top: 1.2vw;
              font-weight: bold;
            }
            .cake_3 {
              width: 100%;
              display: flex;
              justify-content: space-between;
              .left {
                font-size: 3.46vw;
                color: #333;
                line-height: 3.46vw;
                width: 83.33333333%;
                span {
                  font-size: 3.46vw;
                  color: #333;
                  line-height: 3.46vw;
                  font-weight: bold;
                }
              }
              .right {
                width: 16.66666667%;
                img {
                  width: 5.6vw;
                  margin-top: -18px;
                }
              }
            }
          }
        }
        .foot {
          width: 100%;
          background: #fff;
          position: fixed;
          right: 0;
          bottom: 13.333vw;
          display: flex;
          .gwc_js1{
            margin-left: 3vw;
            // margin-right: 1.33vw;
            img{
              width: 5.33vw;
              margin-top: 4.34vw;
            }
          }
          .gwc_js2 {
            padding-top: 4.53vw;
            padding-bottom: 4.53vw;
            font-size: 4vw;
            color: #333;
            line-height: 5.6vw;
            width: 9vw;
            text-align: center;
            margin-right: 4vw;
          }
          .gwc_js3 {
            font-size: 3.46vw;
            color: #333;
            line-height: 4.93vw;
            padding-top: 4.93vw;
            width: 8.06vw;
            text-align: center;
            margin-right: 0.12vw;
          }
          .gwc_js4 {
            margin-top: 2.53vw;
            margin-right: 1.74vw;
            width: 36.67vw;
            .top {
              width: 38vw;
              text-align: right;
              display: flex;
              justify-content: flex-end;
              div {font-size: 2.4vw;line-height: r(24*2)}
              span {
                font-size: 4.8vw;
                color: #f2495e;
                font-weight: bold;
                text-align: center;
              }
            }
            .bottom {
              width: 38vw;
              text-align: right;   
              display: flex; 
              justify-content: flex-end;
              div {
                font-size: 2.4vw;
                text-align:center;
              }
            }
          }
          .gwc_js5 {
            // display: block;
            width: 30.66vw;
            margin-left:r(15*2);
            line-height: 15vw;
            background: #02d4d7;
            text-align: center;
            font-size: r(20*2);
            color: #fff;
            font-weight: bolder;
          }
        }
      }
    }
  }
  
 .cart_show {
  margin-bottom: 4vw;
  width: 100%;
  background: #fff;
 }
 .cart_show_t {
  padding-bottom: 4.26vw;
  width: 100%;
  .gwc_yh_1 {
    margin-left: 4vw;
    margin-right: 3vw;
    img {
      width: 5.33vw;
      margin-top: 17vw;
      display: block;
    }
  }
  .gwc_yh_2 {
    display: flex;
    .gwc_yh_3 {
      margin-right: 4vw;
      padding-top: 4.26vw;
      img {
        width: 30.4vw;
        display: block;
      }
    }
    .gwc_yh_4 {
      width: 52vw;
      padding-top: 5.06vw;
      .top {
        font-size: 4.26vw;
        color: #000;
        line-height: 5.06vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 49vw;
      }
      .cent {
        margin: 1.2vw 0;
        width: 100%;
        display: flex;
        .bang {
          line-height: 3.46vw;
          font-size: r(16*2);
          color: #ccc;
          line-height: 3.46vw;
          margin-top: 1.69vw;
          width: 50%;
        }
        .gwc_jj {
          display: flex;
          width: 50%;
          .jian {
            width: 33.33333333%;
            color: #333;
            font-weight: bold;
            line-height: 6vw;
            text-align: center;
            font-size: r(20*2);
          }
          div {
            width: 33.33333333%;
            color: #333;
            font-size: r(18*2);
            text-align: center;
          }
          .jia {
            width: 33.33333333%;
            color: #333;
            font-weight: bold;
            line-height: 6vw;
            text-align: center;
            font-size: r(20*2);
          }
        }
      }
        .btm {
          font-weight: bold;
          line-height: 6vw;
          margin-top: 2.66vw;
          width: 100%;
          div {
            font-size: r(18*2);
            color: #030303;
            text-align: left;
          }
        }
    }
  }
 }
 .cart_show_c {
   display: flex;
 }
 .cart_show_b {
  padding-left: 12.33vw;
  width: 100%;
  height: r(50*2);
  display: flex;
  .left {
    color: #f2495e;
    margin-right: 1.333vw;
    font-weight: bold;
    line-height: 5.33vw;
    margin-top: 3.86vw;
    margin-bottom: 3.86vw;
    font-size: 3.73vw;
  }
  .right {
    line-height: 5.33vw;
    margin-top: 3.86vw;
    margin-bottom: 3.86vw;
    font-size: 3.73vw;
    color: #333;
  }
 }

</style>
