import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_URL

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    companies: [],
    userData: [],
    username: null,
    primekey: null
  },
  getters: {
    loggedIn (state) {
      return state.token !== null
    },
    UserID (state) {
      return state.username
    },
    retrieveUser (state) {
      return state.userData
    },
    retrieveUserPrimekey (state) {
      return state.primekey
    },
    retrieveUserAssignedCompany (state) {
      return state.companies
    }
  },
  mutations: {
    retrieveToken (state, token) {
      state.token = token
    },
    destroyToken (state) {
      state.token = null
    },
    UserID (state, username) {
      state.username = username
    },
    retrieveUser (state, userData) {
      state.userData = userData
    },
    retrieveUserPrimekey (state, primekey) {
      state.primekey = primekey
    },
    retrieveUserAssignedCompany (state, companies) {
      state.companies = companies
    }
  },
  actions: {
    clientRegister (context, payload) {
      if (!context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('c/register', {
            com_name: payload.com_name,
            address_: payload.address_,
            frst_nme: payload.frst_nme,
            last_nme: payload.last_nme,
            emailadr: payload.emailadr,
            cel_numb: payload.cel_numb
          })
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              console.log(error)
              reject(error)
            })
        })
      }
    },
    retrieveUserAssignedCompany (context, primekey) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      console.log(primekey)
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('u/login/company/assigned', {
            primekey: 0
          })
            .then(response => {
              this.companies = response.data
              context.commit('retrieveUserAssignedCompany', this.companies)
              resolve(response)
            })
            .catch(error => {
              console.log(error)
              reject(error)
            })
        })
      }
    },
    retrieveUserPrimekey (context, retrieveUser) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('u/login/assigned', {
            vli_subs: retrieveUser.vli_subs,
            user_num: retrieveUser.user_num
          })
            .then(response => {
              // this.primekey = Object.keys(response.data).map((key) => {
              //   return response.data[key]
              // })
              this.primekey = response.data
              context.commit('retrieveUserPrimekey', this.primekey)
              resolve(response)
            })
            .catch(error => {
              console.log(error)
              reject(error)
            })
        })
      }
    },
    retrieveUser (context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.get('/user')
            .then(response => {
              // response is object then covert to array
              // this.userData = Object.keys(response.data).map((key) => {
              //   return response.data[key]
              // })
              this.userData = response.data
              context.commit('retrieveUser', this.userData)
              resolve(response)
            })
            .catch(error => {
              console.log(error)
              reject(error)
            })
        })
      }
    },
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
