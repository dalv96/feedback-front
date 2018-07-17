import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Auth from '@/services/Auth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      async beforeEnter (to, from, next) {
        var user = await Auth.checkAuth()
        user = user.data
        if (user.error) next('/login')
        else next()
      }
    }
  ]
})
