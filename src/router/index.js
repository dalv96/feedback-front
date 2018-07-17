import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Admin from '@/components/Admin'
import Auth from '@/services/Auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      async beforeEnter (to, from, next) {
        try {
          var user = await Auth.checkAuth()
          user = user.data.user
          if (user) next('/')
          else next()
        } catch (err) {
          next()
        }
      }
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      async beforeEnter (to, from, next) {
        try {
          var user = await Auth.checkAuth()
          user = user.data.user
          if (user) next()
          else next('/login')
        } catch (err) {
          next('/login')
        }
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      async beforeEnter (to, from, next) {
        try {
          var user = await Auth.checkAuth()
          user = user.data.user
          if (user) next()
          else next('/login')
        } catch (err) {
          next('/login')
        }
      }
    },
    {
      path: '/logout',
      name: 'Admin',
      async beforeEnter (to, from, next) {
        var ok = await Auth.logout()
        if (ok) {
          next('/login')
        }
      }
    }
  ]
})
