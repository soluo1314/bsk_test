<template>
  <div id="footer">
    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item
        v-for="(item,index) in List"
        :id="item.key"
        :key="index"
        @click.native="tab(index)">
        <img :src="item.imgurl">
      </mt-tab-item>
    </mt-tabbar>
    <div class="btn bth_hide" v-if='$store.state.shopCart.list.length'>{{$store.state.shopCart.N}}</div>
     <!-- <div class="btn bth_hide"></div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
      List: [
        {
          key: "info",
          name: "主页",
          path: "/info",
          imgurl:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-a-2.png?v=119"
        },
        {
          key: "list",
          name: "分类",
          path: "/list",
          imgurl:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-b-1.png?v=119"
        },
        {
          key: "cart",
          name: "购物车",
          path: "/cart",
          imgurl:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-c-1.png?v=119"
        },
        {
          key: "userinfo",
          name: "我的",
          path: "/userinfo",
          imgurl:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-d-1.png?v=119"
        }]
    };
  },
  methods: {
    tab(index) {
        this.$router.push({
          path: this.List[index].path
        })
      for (var i=0;i<this.List.length;i++) {
        if (i==index) {
          this.List[i].imgurl = this.List[i].imgurl.replace('-1','-2')          
        }else {
           this.List[i].imgurl = this.List[i].imgurl.replace('-2','-1')  
        }
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#footer {
  height: 13.333vw;
  width: 100%;
  border-top:1px solid #eee;
  background: #fff;
}
#footer /deep/ .mint-tabbar {
  background: #fff;
  height: 13.333vw;
  display: flex;
  a {
    flex: 1;
    margin: r(3.75*2) 0;
    padding: 0 r(12*2);
    .mint-tab-item-icon {
    margin: 0;
    }
    .mint-tab-item-label {
      display: flex;
      justify-content: center;
    }
  }
}
.mint-tabbar /deep/ .mint-tab-item.is-selected {
  background: #fff;
}
.mint-tabbar /deep/ .mint-tab-item-label {
  height: 100%;
  img {
    width: 50%;
    height: auto;
    display: block; 
  }
}
.btn{
  border:0;
  padding: 0;
  position: absolute;
  right: 31vw;
  bottom: 11vw;
  background: #f2495e;
  border-radius: 50px;
  width: 5vw;
  height: 5vw;
  text-align: center;
  line-height: 5vw;
  font-size: r(14*2);
  color: #fff;
  z-index: 9999999;
  // display: none;
}
</style>
