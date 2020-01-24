// use lowecase when declaring state as standard
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_URL

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    user: '',
    primekey: localStorage.getItem('primekey') || null,
    username: '',
    maxemployee: '',
    folder: [],
    daytype: [],
    section: [],
    division: [],
    workarea: [],
    workstat: [],
    emplstat: [],
    positions: [],
    companies: [],
    department: [],
    directories: [],
    showdialog: false
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
    },
    retrieveEmployeeCode (state) {
      return state.maxemployee
    },
    retrievePositions (state) {
      return state.positions
    },
    retrieveEmplStat (state) {
      return state.emplstat
    },
    retrieveWorkStat (state) {
      return state.workstat
    },
    retrieveWorkArea (state) {
      return state.workarea
    },
    retrieveDivision (state) {
      return state.division
    },
    retrieveDepartment (state) {
      return state.department
    },
    retrieveSection (state) {
      return state.section
    },
    retrieveDirectories (state) {
      return state.directories
    },
    retrieveFolder (state) {
      return state.folder
    },
    retrieveDayType (state) {
      return state.daytype
    },
    showDialog (state) {
      return state.showdialog
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
    },
    retrieveEmployeeCode (state, payload) {
      state.maxemployee = payload
    },
    retrievePositions (state, payload) {
      state.positions = payload
    },
    retrieveEmplStat (state, payload) {
      state.emplstat = payload
    },
    retrieveWorkStat (state, payload) {
      state.workstat = payload
    },
    retrieveWorkArea (state, payload) {
      state.workarea = payload
    },
    retrieveDivision (state, payload) {
      state.division = payload
    },
    retrieveDepartment (state, payload) {
      state.department = payload
    },
    retrieveSection (state, payload) {
      state.section = payload
    },
    retrieveDirectories (state, payload) {
      state.directories = payload
    },
    retrieveFolder (state, payload) {
      state.folder = payload
    },
    retrieveDayType (state, payload) {
      state.daytype = payload
    },
    toggleDialog (state) {
      state.showdialog = !state.showdialog
    }
  },
  actions: {
    async retrieveDayType (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('l/helper/daytype/', {
              params: {
                primekey: payload.primekey
              }
            })
              .then(response => {
                this.daytype = response.data
                context.commit('retrieveDayType', this.daytype)
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    async retrieveFolder (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('u/personnel/directory/folder/', {
              params: {
                primekey: payload.primekey,
                cntrl_no: payload.cntrl_no
              }
            })
              .then(response => {
                this.folder = response.data
                context.commit('retrieveFolder', this.folder)
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    async retrieveDirectories (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('u/personnel/directory/directories/', {
              params: {
                primekey: payload.primekey
              }
            })
              .then(response => {
                this.directories = response.data
                context.commit('retrieveDirectories', this.directories)
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    async retrieveSection (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('l/helper/section/', {
              params: {
                primekey: payload.primekey
              }
            })
              .then(response => {
                this.section = response.data
                context.commit('retrieveSection', this.section)
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    async retrieveDepartment (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('l/helper/department/', {
              params: {
                primekey: payload.primekey
              }
            })
              .then(response => {
                this.department = response.data
                context.commit('retrieveDepartment', this.department)
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    async retrieveDivision (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('l/helper/division/', {
              params: {
                primekey: payload.primekey
              }
            })
              .then(response => {
                this.division = response.data
                context.commit('retrieveDivision', this.division)
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    async retrievePositions (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('l/helper/positions/', {
              params: {
                primekey: payload.primekey
              }
            })
              .then(response => {
                this.positions = response.data
                context.commit('retrievePositions', this.positions)
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    async retrieveWorkArea (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('l/helper/workarea/', {
              params: {
                primekey: payload.primekey
              }
            })
              .then(response => {
                this.workarea = response.data
                context.commit('retrieveWorkArea', this.workarea)
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    async retrieveWorkStat (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('l/helper/workstat/', {
              params: {
                primekey: payload.primekey
              }
            })
              .then(response => {
                this.workstat = response.data
                context.commit('retrieveWorkStat', this.workstat)
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    async retrieveEmplStat (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('l/helper/emplstat')
              .then(response => {
                this.emplstat = response.data
                context.commit('retrieveEmplStat', this.emplstat)
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    async retrieveEmployeeCode (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('l/helper/employee/maxid/', {
              params: {
                primekey: payload.primekey
              }
            })
              .then(response => {
                this.maxemployee = response.data
                context.commit('retrieveEmployeeCode', this.maxemployee)
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    // -- client registration
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
              reject(error)
            })
        })
      }
    },
    // -- assigned company
    async retrieveCompany (context, payload) {
      // stringify primekeys
      let data = JSON.stringify(payload.primekey)
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios({
              method: 'post',
              url: '/u/login/primekey/company/',
              headers: {
                'Content-Type': 'application/json'
              },
              data: data
            })
              .then(response => {
                this.companies = response.data
                context.commit('retrieveCompany', this.companies)
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    // -- primekey
    async retrievePrimekey (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('u/login/primekey/' + payload.vli_subs + '/' + payload.user_num)
              .then(response => {
                this.primekey = response.data
                context.commit('retrievePrimekey', this.primekey)
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
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
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    // -- logout
    async destroyToken (context) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
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
      } catch (error) {
        localStorage.removeItem('access_token')
      }
    },
    // -- login
    async retrieveToken (context, credentials) {
      try {
        await new Promise((resolve, reject) => {
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
              localStorage.removeItem('access_token')
              reject(error)
            })
        })
      } catch (error) {
        localStorage.removeItem('access_token')
      }
    }
  },
  modules: {
  }
})
