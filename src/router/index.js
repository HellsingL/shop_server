import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import home from '@/components/home/home'
import Welcome from '@/components/home/welcome'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: Welcome
        }
      ]
    }
  ]
})

// 穿件路由守卫
// router.beforeEach((to, from, next) => {
//   // 如果访问的是 login页面，直接放行
//   if (to.path === 'login') return next()
//   // 获取 token字符串
//   const tokenStr = window.sessionStorage.getItem('token')
//   // 如果没有token字符串，强制跳转到 登录页
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router
