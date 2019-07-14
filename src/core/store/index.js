import Vue from 'vue'
import Vuex from 'vuex'
import Store from 'storejs'

Vue.use(Vuex)

// 定义属性值  data
const state = {
  shopCart:{'N':0,'list':[]},
  userinfo:{}
}
// 定义同步方法
const mutations = {
  vueInit(){
    state.shopCart=Store.get('shopCart')||{'N':0,'list':[]}
    state.userinfo=Store.get('userInfo')
  },
  add (state,data) {
      console.log(state.shopCart.list);
    if (state.shopCart.list.length >0) {
      var con =true;
      state.shopCart.list.forEach(el => {
         if (el.id==data.id) {
           el.num++;
           con=false;
           return
         }
      });
      if (con) {
        state.shopCart.list.push(data)
      }
      state.shopCart.N++
    }else {
      state.shopCart.list.push(data)
      state.shopCart.N++
    }
    // console.log(state.shopCart.N); 
    Store.set('shopCart',state.shopCart)
  },
  push(state,data) {
    state.shopCart.list.forEach(el=> {
      if(el.id==data) {
        el.num--
        if(el.num ==0) {
          el.num = 1;
        }
      }
    })
    Store.set('shopCart',state.shopCart)
  },
  sub(state,data) {
    state.shopCart.list.forEach(el=> {
      if (el.id==data) {
        el.num++;
      }
    })
  }
}
// 定义 computed(属性计算)
const getters = {
  count (state) {
    let price=0;
    state.shopCart.list.forEach(el=> { 
       price+=parseInt(el.CurrentPrice)*el.num;
    })
    return price
  },
  total(state){

  }
}

// 定义异步方法,可以在这个里面做一些异步操作,比如调用通用数据接口
const actions = {
  syFn (context) {
    // context.state  可以取 state 属性
    // context.commit  可以调用 mutations 同步方法 属性
    // context.dispatch可以调用 actions 异步方法 属性
    // 在组件里面调用 也是一样,同上面的方法一直
  },
  test (context, data) {
    console.log(data)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
