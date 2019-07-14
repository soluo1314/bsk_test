// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '@/common/css/index.scss'
import 'lib-flexible/flexible.js'

// 引入config.js tempCommon.js文件
import core from '@/core/core.config'
import tempCommon from '@/components/tempCommon/tempCommon'

// 引入vuex数据仓库
import store from '@/core/store/index'

// 引入字体图标库 动态title
import 'font-awesome/css/font-awesome.css'
import VueWechatTitle from 'vue-wechat-title'

// eslint-disable-next-line no-unused-vars
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('@/assets/laz.jpg')
})

Vue.use(core)
Vue.use(tempCommon)
Vue.use(MintUI)
Vue.use(VueWechatTitle)

Vue.config.productionTip = false
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
