import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Stat from '@/components/Stat'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/stat',
      name: 'Stat',
      component: Stat
    }
  ]
})
