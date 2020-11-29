import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
// import SystemLogin from '../views/system/auth/Login'
import UserLogin from '../views/auth/Login.vue'
import UserAssignedCompany from '../components/auth/Companies.vue'
import Logout from '../components/auth/Logout.vue'
import Dashboard from '../components/dashboard/Dashboard.vue'
import SystemDashboard from '../components/system/Dashboard.vue'
import ClientRegister from '../views/auth/register/ClientRegister.vue'
import ClientRequest from '../views/system/clients/Clients.vue'
import ClientProfile from '../views/system/clients/ClientView.vue'
import Directory from '../views/personnel/Directory.vue'
import Folder from '../components/personnel/Folder.vue'
import FolderEmployees from '../components/personnel/Employees.vue'
import Api from '../components/biometrics/Api.vue'
import UploadDtr from '../views/personnel/UploadDtr.vue'
import manPower from '../views/personnel/Manpower.vue'
import PayrollHeader from '../views/payroll/Header.vue'
import OneTimeIncome from '../views/payroll/OneTimeIncome.vue'
import Reference from '../views/maintenance/Reference.vue'
import BioDevice from '../components/biometrics/Device.vue'
import BioOnline from '../views/biometrics/Online.vue'
import UserMasterfile from '../views/maintenance/Masterfile.vue'
import Discord from '../components/layouts/Plain.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { layout: 'default' }
  },
  {
    path: '/discord',
    name: 'discord',
    component: Discord,
    meta: {
      layout: 'plain'
    }
  },
  {
    path: '/syspanel',
    name: 'systemHome',
    meta: { layout: 'systemDefault' },
    beforeEnter: (to, from, next) => {
      if (store.getters.systemLoggedIn) next({ name: 'systemDashboard' })
      else next()
    }
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
    path: '/user/dashboard',
    name: 'userDashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      requiresPrimekey: true,
      layout: 'dashboard'
    }
  },
  {
    path: '/syspanel/dashboard',
    name: 'systemDashboard',
    component: SystemDashboard,
    meta: { layout: 'systemDashboard' },
    beforeEnter: (to, from, next) => {
      if (store.getters.systemLoggedIn) next()
      else next({ name: 'systemHome' })
    }
  },
  {
    path: '/syspanel/clients',
    name: 'systemClients',
    component: ClientRequest,
    meta: {
      layout: 'systemDashboard'
    },
    beforeEnter: (to, from, next) => {
      if (store.getters.systemLoggedIn) next()
      else next({ name: 'systemHome' })
    }

  },
  {
    path: '/syspanel/client/:cntrl_no',
    name: 'systemClientProfile',
    component: ClientProfile,
    meta: {
      layout: 'systemDashboard'
    },
    beforeEnter: (to, from, next) => {
      if (store.getters.systemLoggedIn) next()
      else next({ name: 'systemHome' })
    }

  },
  {
    path: '/personnel/directory',
    name: 'directory',
    component: Directory,
    meta: {
      requiresAuth: true,
      layout: 'dashboard'
    }
  },
  {
    path: '/personnel/directory/folder/:cntrl_no',
    name: 'folder',
    component: Folder,
    meta: {
      requiresAuth: true,
      layout: 'dashboard'
    }
  },
  {
    path: '/personnel/directory/folder/employees',
    name: 'switchEmployees',
    component: FolderEmployees,
    meta: {
      requiresAuth: true,
      layout: 'dashboard'
    }
  },
  {
    path: '/personnel/directory/folder/:cntrl_no/:folder',
    name: 'uploadDtr',
    component: UploadDtr,
    meta: {
      requiresAuth: true,
      layout: 'dashboard'
    }
  },
  {
    path: '/personnel/manpower',
    name: 'manPower',
    component: manPower,
    meta: {
      requiresAuth: true,
      layout: 'dashboard'
    }
  },
  {
    path: '/payroll/header',
    name: 'manPower',
    component: manPower,
    meta: {
      requiresAuth: true,
      layout: 'dashboard'
    }
  },
  {
    path: '/payroll/income/header',
    name: 'PayrollHeader',
    component: PayrollHeader,
    meta: {
      requiresAuth: true,
      layout: 'dashboard'
    }
  },
  {
    path: '/payroll/income/onetime/:cntrl_no',
    name: 'OneTimeIncome',
    component: OneTimeIncome,
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
  },
  {
    path: '/reference',
    name: 'reference',
    component: Reference,
    meta: {
      requiresAuth: true,
      layout: 'dashboard'
    }
  },
  {
    path: '/biometrics/device',
    name: 'biometricsDevice',
    component: BioDevice,
    meta: {
      requiresAuth: true,
      layout: 'dashboard'
    }
  },
  {
    path: '/biometrics/online',
    name: 'biometricsOnline',
    component: BioOnline,
    meta: {
      requiresAuth: true,
      layout: 'dashboard'
    }
  },
  {
    path: '/biometrics/api',
    name: 'biometricsApi',
    component: Api,
    meta: {
      requiresAuth: true,
      layout: 'dashboard'
    }
  },
  {
    path: '/create/employee',
    name: 'easyCreateEmployee',
    component: () => import(/* webpackChunckName: "easyCreateEmployee" */'../components/controller/dialog/masterfile/NewEmployee.vue'),
    meta: {
      requiresAuth: true,
      layout: 'dashboard'
    }
  },
  {
    path: '/events',
    name: 'easyEvents',
    component: () => import(/* webpackChunckName: "easyCreateEmployee" */'../components/easynav/Events.vue'),
    meta: {
      requiresAuth: true,
      layout: 'dashboard'
    }
  },
  {
    path: '/create/directory',
    name: 'easyCreateDirectory',
    component: () => import(/* webpackChunckName: "easyCreateEmployee" */'../components/easynav/EasyCreateDirectory.vue'),
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
