import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: resolve => require(['@/components/home'], resolve),
      redirect: 'info',
      children: [
        {
          path: 'info',
          name: 'info',
          meta: {keepAlive: true, title: '贝思客蛋糕'}, // true 禁止重复加载, false不禁止重复加载
          component: resolve => require(['@/components/main/info'], resolve)
        },
        {
          path: 'list',
          name: 'list',
          meta: {keepAlive: true},
          component: resolve => require(['@/components/main/list'], resolve),
          redirect: 'list/ziyin',
          children: [
            {
              path: 'ziyin',
              name: 'ziyin',
              meta: {title: '分类'},
              component: resolve => require(['@/components/layout/list_ziyin'], resolve)
            },
            {
              path: 'yanxuan',
              name: 'yanxuan',
              component: resolve => require(['@/components/layout/list_yanxuan'], resolve)
            }
          ]
        },
        {
          path: 'cart',
          name: 'cart',
          meta: {title: '购物车'},
          component: resolve => require(['@/components/main/cart'], resolve)
        },
        {
          path: 'userinfo',
          name: 'userinfo',
          meta: {title: '我的'},
          component: resolve => require(['@/components/main/userinfo'], resolve),
        },
        // 详情页
        {
          path: 'show',
          name: 'show',
          meta: {title: 'show'},
          component: resolve => require(['@/components/main/show'], resolve)
        },
        {
          path: 'user_info',
          name: 'user_info',
          meta: {
            title: '个人中心'
          },
          component: resolve => require(['@/components/layout/user_info'], resolve),
        }
      ]
    }
  ]
})

export default router
