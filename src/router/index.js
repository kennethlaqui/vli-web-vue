import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
// import Dashboard from '../components/layouts/Dashboard.vue'
import Login from '../components/auth/Login.vue'
import Logout from '../components/auth/Logout.vue'
import Main from '../components/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { layout: 'default' }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    meta: { layout: 'dashboard' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
