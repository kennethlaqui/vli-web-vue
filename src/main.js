// import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import 'typeface-roboto/index.css'
import Vue from 'vue'
import App from './App.vue'
import HomepPage from './components/layouts/Home.vue'
import Dashboard from './components/layouts/Dashboard.vue'
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

// if (process.env.NODE_ENV === 'development') {
//   makeServer()
// }

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: 'userLogin'
      })
    } else {
      next()
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
      // console.log(localStorage.getItem('primekey'))
      next({
        name: 'userLogout'
      })
    } else {
      next({
        name: 'userLogout'
      })
      // console.log(localStorage.getItem('primekey'))
    }
  } else {
    next() // make sure to always call next()!
  }
})

Vue.component('default-layout', HomepPage)
Vue.component('dashboard-layout', Dashboard)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
