import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://vli-auth.test:8080/api/'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null
  },
  mutations: {
    retrieveToken (state, token) {
      state.token = token
    }
  },
  actions: {
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
