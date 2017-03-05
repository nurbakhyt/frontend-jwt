import Vue from 'vue'
import VueRouter from 'vue-router'

import Header from './components/Header.vue'
import Welcome from './components/Welcome.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Profile from './components/Profile.vue'
import Edit from './components/Edit.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: "",
      component: Welcome
    },
    {
      path: "/login",
      component: Login,
      meta: {
        forVisitors: true
      }
    },
    {
      path: "/register",
      component: Register,
      meta: {
        forVisitors: true
      }
    },
    {
      path: "/profile",
      component: Profile,
      meta: {
        forAuth: true
      }
    },
    {
      path: "/profile/edit",
      component: Edit,
      meta: {
        forAuth: true
      }
    }
  ]
})

export default router