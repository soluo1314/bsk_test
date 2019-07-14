import apis from '@/core/api/index' //  返回了对象 {GetBannerList:fn(), joke:fn() }
import global from '@/core/global/global' //  返回对象{getImageBlob:fn(), getParam:fn() }

import tempFn from '@/components/tempCommon/tempCommon' //  定义了一个全局组件 lay_test
import fliter from '@/core/fliter/index' // 定义了 textLengthSet strSub 过滤器
import directive from '@/core/directive/index' // 定义了一个简单指令

export default (Vue) => {
  // 全局组件
  tempFn(Vue)
  fliter(Vue)
  directive(Vue)
  // 绑定到Vue原型里面直接可以在当前实例 this.$global上面调用
  Vue.prototype.$apis = apis
  Vue.prototype.$global = global
  // 全局通信 使用 $on:注册事件 使用 $emit:触发
  Vue.prototype.$eventHub = new Vue()
}
