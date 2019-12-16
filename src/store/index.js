import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_URL

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    companies: [],
    user: '',
    username: null,
    primekey: ''
    // primekey: localStorage.getItem('primekey') || null
  },
  getters: {
    loggedIn (state) {
      return state.token !== null
    },
    UserID (state) {
      return state.username
    },
    retrieveUser (state) {
      return state.user
    },
    retrievePrimekey (state) {
      return state.primekey
    },
    retrieveCompany (state) {
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
    retrieveUser (state, payload) {
      state.user = payload
    },
    retrievePrimekey (state, payload) {
      state.primekey = payload
    },
    retrieveCompany (state, payload) {
      state.companies = payload
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
    async retrieveCompany (context, payload) {
      console.log(payload.primekey)
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('/u/login/primekey/company/', {
              params: {
                primekey: payload.primekey
              }
            })
              .then(response => {
                this.companies = response.data
                context.commit('retrieveCompany', this.companies)
                resolve(response)
              })
              .catch(error => {
                console.log(error)
                reject(error)
              })
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async retrievePrimekey (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('u/login/primekey/' + payload.vli_subs + '/' + payload.user_num)
              .then(response => {
                this.primekey = response.data.primekey
                context.commit('retrievePrimekey', this.primekey)
                resolve(response)
              })
              .catch(error => {
                console.log(error)
                reject(error)
              })
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async retrieveUser (context) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('u/user')
              .then(response => {
                this.user = response.data
                context.commit('retrieveUser', this.user)
                resolve(response)
              })
              .catch(error => {
                console.log(error)
                reject(error)
              })
          })
        }
      } catch (error) {
        console.log(error)
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
              localStorage.removeItem('primekey')
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
