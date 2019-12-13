import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
// import Dashboard from '../components/layouts/Dashboard.vue'
import UserLogin from '../components/auth/Login.vue'
import Logout from '../components/auth/Logout.vue'
import Main from '../components/Main.vue'
import ClientRegister from '../components/client/Register.vue'

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
    name: 'userLogin',
    component: UserLogin,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/logout',
    name: 'userLogout',
    component: Logout
  },
  {
    path: '/register',
    name: 'clientRegister',
    component: ClientRegister,
    meta: { layout: 'default' }
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    meta: {
      requiresAuth: true,
      layout: 'dashboard' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
