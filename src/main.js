// import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import 'typeface-roboto/index.css'
import Vue from 'vue'
import App from './App.vue'
import PlainHomePage from './components/layouts/Plain.vue'
import HomePage from './components/layouts/Home.vue'
import Dashboard from './components/layouts/Dashboard.vue'
import SystemHomePage from './components/layouts/system/Home'
import SystemDashboard from './components/layouts/system/Dashboard'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import VueCookies from 'vue-cookies'
import VueTheMask from 'vue-the-mask'
import VueRouterBackButton from 'vue-router-back-button'
import Vuebar from 'vuebar'
// import { makeServer } from './server'

Vue.use(Vuelidate)
Vue.use(VueCookies)
Vue.use(VueTheMask)
Vue.use(VueRouterBackButton, { router })
Vue.use(Vuebar)

Vue.config.productionTip = false
export const bus = new Vue()

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.

    // system login guard
    // if (to.name === 'systemDashboard' && !store.getters.systemLoggedIn) {
    //   if (!store.getters.systemLoggedIn) {
    //     next({
    //       name: 'systemHome'
    //     })
    //   } else {
    //     next()
    //   }
    // }

    // user login
    if (to.name === 'userLogin' && !store.getters.loggedIn) {
      if (!store.getters.loggedIn) {
        next({
          name: 'userLogin'
        })
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        name: 'UserAssignedCompany'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresPrimekey)) {
    // this route requires primekey, check if not exist
    if (localStorage.getItem('primekey') === null) {
      next({
        name: 'userLogout'
      })
    } else {
      next({
        name: 'userLogout'
      })
    }
  } else {
    next()
  }
})

Vue.component('plain-layout', PlainHomePage)
Vue.component('default-layout', HomePage)
Vue.component('dashboard-layout', Dashboard)
Vue.component('systemDefault-layout', SystemHomePage)
Vue.component('systemDashboard-layout', SystemDashboard)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
