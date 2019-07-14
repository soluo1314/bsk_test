import layBtn from '@/components/main/appCom'
// Tabbar底部导航 Swipe首页轮播 Navbar分类tab栏
import { Swipe, SwipeItem, Navbar, TabItem, Tabbar, Field, Button } from 'mint-ui'
// 公共底部组件 
import infoFoot from '@/components/layout/info_foot'


export default (Vue) => {
  // 定义一个全局组件
  // Vue.component('lay_test', {
  //   template: '<h3>我是全局组件</h3>'
  // })

  Vue.component('lay_test', layBtn)
  Vue.component('infoFoot', infoFoot)
 
  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)
  Vue.component(Navbar.name, Navbar)
  Vue.component(Tabbar.name, Tabbar)
  Vue.component(TabItem.name, TabItem)
  Vue.component(Field.name, Field);
  Vue.component(Button.name, Button);
}
