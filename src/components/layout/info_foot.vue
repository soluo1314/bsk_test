<template>
  <div>
    <div class="gonggao">
      <div class="g-l">
        <div class="text-z">划线价格</div>
        <div class="text-y">商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。
        </div>
      </div>
      <div class="g-l">
        <div class="text-z">未划线价格</div>
        <div class="text-y">商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
//  公共商品广告
.gonggao {
    padding: 2vw 0;
    margin-bottom: 13.333vw;
    .g-l {
        margin: 0 4vw;
        font-size: 3.734vw;
        margin-bottom: 4vw;
        display: flex;
        .text-z {
            width: 27vw;
            color: #181818;
        }
        .text-y {
            width: 65vw;
            color: #a2a2a2;
        }
    }
}
</style>