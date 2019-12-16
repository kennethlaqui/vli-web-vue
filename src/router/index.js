import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import UserLogin from '../components/auth/Login.vue'
import UserAssignedCompany from '../components/auth/Companies.vue'
import Logout from '../components/auth/Logout.vue'
import Dashboard from '../components/dashboard/Dashboard.vue'
import ClientRegister from '../components/client/Register.vue'
import EncodeDtr from '../views/personnel/EncodeDtr.vue'
import UserMasterfile from '../views/maintenance/Masterfile.vue'

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
    path: '/login/company',
    name: 'UserAssignedCompany',
    component: UserAssignedCompany,
    meta: {
      requiresAuth: true
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
    path: '/dashboard',
    name: 'userDashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      requiresPrimekey: true,
      layout: 'dashboard'
    }
  },
  {
    path: '/personnel/encode',
    name: 'encodeDtr',
    component: EncodeDtr,
    meta: {
      requiresAuth: true,
      layout: 'dashboard'
    }
  },
  {
    path: '/maintenance/masterfile',
    name: 'UserMasterfile',
    component: UserMasterfile,
    meta: {
      requiresAuth: true,
      layout: 'dashboard'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
