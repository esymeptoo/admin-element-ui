import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/containers/Login'
import Layout from '@/containers/Layout'

import routerData from './routerData'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: 'vue-admin-template',
  routes: [
    {
      path: '/login',
      name: 'name',
      component: Login,
    },
    {
      path: '/',
      component: Layout,
      redirect: {
        name: 'daily_data',
      },
      children: [
        ...routerData,
        {
          path: '*',
          redirect: {
            name: 'daily_data',
          },
        },
      ],
    },
  ],
})
