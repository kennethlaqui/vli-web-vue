import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import App from './App.vue'
import NoSideBar from './components/layouts/Master.vue'
import Dashboard from './components/layouts/Dashboard.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        name: 'main'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

Vue.component('default-layout', NoSideBar)
Vue.component('dashboard-layout', Dashboard)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
