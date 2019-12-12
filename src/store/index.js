import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_URL

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null
  },
  getters: {
    loggedIn (state) {
      return state.token !== null
    }
  },
  mutations: {
    retrieveToken (state, token) {
      state.token = token
    },
    destroyToken (state) {
      state.token = null
    }
  },
  actions: {
    // -- logout
    destroyToken (context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('u/logout')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
      console.log('asd')
    },
    // -- login
    retrieveToken (context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('u/login', {
          username: credentials.username,
          password: credentials.password
        })
          .then(response => {
            this.token = response.data.access_token

            localStorage.setItem('access_token', this.token)
            context.commit('retrieveToken', this.token)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    }
  },
  modules: {
  }
})
