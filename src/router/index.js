import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
  mode: 'history', // 使用 HTML5 history 模式
  routes: [
    {
      path: '/',
      meta: {
        title: "Vue通讯录" // 网页标题，通过路由守卫动态设置
      },
      component: HelloWorld
    }
  ]
})

// 路由守卫：用于设置网页标题和路由跳转控制
router.beforeEach((to, from, next) => {
  // 设置网页标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 允许访问登录页面
  if (to.path === '/') {
    return next()
  }
  // 验证 token 是否存在，控制路由跳转
  const tokenStr = sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/')
  } else {
    next()
  }
})

export default router
