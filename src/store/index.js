// use lowecase when declaring state as standard
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_URL

function defaultMasterfileReference () {
  return {
    section: [],
    emplstat: [],
    division: [],
    workarea: [],
    workstat: [],
    positions: [],
    department: []
  }
}

export default new Vuex.Store({
  state: {
    defaultMasterfileReference,
    token: localStorage.getItem('access_token') || null,
    user: '',
    primekey: [],
    vli_subs: [], // no getters
    username: '',
    maxemployee: '',
    employeecodechecker: '',
    bank: [],
    folder: [],
    daytype: [],
    section: [],
    division: [],
    workarea: [],
    workstat: [],
    emplstat: [],
    positions: [],
    companies: [],
    shiftfile: [],
    department: [],
    incomeType: [],
    directories: [],
    payrollgroup: [],
    emplstatdata: [],
    workstatdata: [],
    f_emplstatdata: '',
    payrolldirectorybuild: [],
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
    employeeCodeChecker (state) {
      return state.employeecodechecker
    },
    retrievePositions (state) {
      return state.positions
    },
    retrieveEmplStatData (state) {
      return state.emplstatdata
    },
    retrieveEmplStat (state) {
      return state.emplstat
    },
    retrieveWorkStatData (state) {
      return state.workstatdata
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
    retrieveShiftFile (state) {
      return state.shiftfile
    },
    retrieveIncomeType (state) {
      return state.incomeType
    },
    retrievePayrollGroup (state) {
      return state.payrollgroup
    },
    buildPayrollDirectory (state) {
      return state.payrolldirectorybuild
    },
    retrieveBank (state) {
      return state.bank
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
    employeeCodeChecker (state, payload) {
      state.employeecodechecker = payload
    },
    retrieveEmployeeCode (state, payload) {
      state.maxemployee = payload
    },
    retrievePositions (state, payload) {
      state.positions = payload
    },
    retrieveEmplStatData (state, payload) {
      state.emplstatdata = payload
    },
    retrieveEmplStat (state, payload) {
      state.emplstat = payload
    },
    retrieveWorkStatData (state, payload) {
      state.workstatdata = payload
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
    retrieveShiftFile (state, payload) {
      state.shiftfile = payload
    },
    retrieveIncomeType (state, payload) {
      state.incomeType = payload
    },
    retrievePayrollGroup (state, payload) {
      state.payrollgroup = payload
    },
    buildPayrollDirectory (state, payload) {
      state.payrolldirectorybuild = payload
    },
    retrieveBank (state, payload) {
      state.bank = payload
    },
    toggleDialog (state) {
      state.showdialog = !state.showdialog
    },
    resetMasterfileReference (state) {
      const reset = defaultMasterfileReference()
      Object.keys(reset).forEach(key => {
        state[key] = reset[key]
      })
    }
  },
  actions: {
    async retrieveBank (context, payload) {
      if (this.state.bank.length === 0) {
        try {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
          if (context.getters.loggedIn) {
            await new Promise((resolve, reject) => {
              axios.get('l/helper/bank', {
                params: {
                  primekey: payload.primekey
                }
              })
                .then(response => {
                  this.bank = response.data
                  context.commit('retrieveBank', this.bank)
                  resolve(response)
                })
                .catch(error => {
                  reject(error)
                })
            })
          }
        } catch (error) {
        }
      }
    },
    async buildPayrollDirectory (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('u/personnel/directory/build/{primekey?}', {
              params: {
                primekey: payload.primekey
              }
            })
              .then(response => {
                this.payrolldirectorybuild = response.data
                context.commit('buildPayrollDirectory', this.payrolldirectorybuild)
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
    async retrievePayrollGroup (context, payload) {
      // select
      if (this.state.payrollgroup.length === 0) {
        try {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
          if (context.getters.loggedIn) {
            await new Promise((resolve, reject) => {
              axios.get('l/helper/payrollgroup', {
                params: {
                  primekey: payload.primekey
                }
              })
                .then(response => {
                  this.payrollgroup = response.data
                  context.commit('retrievePayrollGroup', this.payrollgroup)
                  resolve(response)
                })
                .catch(error => {
                  reject(error)
                })
            })
          }
        } catch (error) {
        }
      }
    },
    async retrieveIncomeType (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get(`l/helper/incometype/${payload.primekey}`)
              .then(response => {
                this.incomeType = response.data
                context.commit('retrieveIncomeType', this.incomeType)
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
    async retrieveShiftFile (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get(`l/helper/shiftfile/${payload.primekey}`)
              .then(response => {
                this.shiftfile = response.data
                context.commit('retrieveShiftFile', this.shiftfile)
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
      if (this.state.section.length === 0) {
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
      }
    },
    async retrieveDepartment (context, payload) {
      if (this.state.department.length === 0) {
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
      }
    },
    async retrieveDivision (context, payload) {
      if (this.state.division.length === 0) {
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
      }
    },
    async retrievePositions (context, payload) {
      if (this.state.positions.length === 0) {
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
      }
    },
    async retrieveWorkArea (context, payload) {
      if (this.state.workarea.length === 0) {
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
      }
    },
    async retrieveWorkStatData (context, payload) {
      // select
      if (this.state.workstat.length === 0) {
        try {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
          if (context.getters.loggedIn) {
            await new Promise((resolve, reject) => {
              axios.get(`l/helper/workstat/data/${payload.primekey}`)
                .then(response => {
                  this.workstatdata = response.data
                  context.commit('retrieveWorkStatData', this.workstatdata)
                  resolve(response)
                })
                .catch(error => {
                  reject(error)
                })
            })
          }
        } catch (error) {
        }
      }
    },
    async retrieveWorkStat (context, payload) {
      // select
      if (this.state.workstat.length === 0) {
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
      }
    },
    async retrieveEmplStatData (context, payload) {
      // this api contain what query to be executed
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get(`l/helper/emplstat/data/${payload.primekey}/${payload.emp_stat}/${payload.query___}`)
              .then(response => {
                this.emplstatdata = response.data
                context.commit('retrieveEmplStatData', this.emplstatdata)
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
      // select
      if (this.state.emplstat.length === 0) {
        try {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
          if (context.getters.loggedIn) {
            await new Promise((resolve, reject) => {
              axios.get('l/helper/emplstat/', {
                params: {
                  primekey: payload.primekey
                }
              })
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
      }
    },
    async employeeCodeChecker (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('l/helper/employee/code/checker/', {
              params: {
                primekey: payload.primekey,
                tableName: payload.tableName
              }
            })
              .then(response => {
                this.employeecodechecker = response.data
                context.commit('employeeCodeChecker', this.employeecodechecker)
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
      const primekeys = payload.primekey.map((item) => {
        return item.primekey
      })
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('u/login/primekey/company', {
              params: {
                primekey: primekeys,
                vli_subs: this.vli_subs
              }
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
    // async retrieveCompany (context, payload) {
    //   // stringify primekeys
    //   let data = JSON.stringify(payload.primekey)
    //   try {
    //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
    //     if (context.getters.loggedIn) {
    //       await new Promise((resolve, reject) => {
    //         axios({
    //           method: 'post',
    //           url: '/u/login/primekey/company/',
    //           headers: {
    //             'Content-Type': 'application/json'
    //           },
    //           data: data
    //         })
    //           .then(response => {
    //             this.companies = response.data
    //             context.commit('retrieveCompany', this.companies)
    //             resolve(response)
    //           })
    //           .catch(error => {
    //             reject(error)
    //           })
    //       })
    //     }
    //   } catch (error) {
    //   }
    // },
    // -- primekey and vli_subs
    async retrievePrimekey (context, payload) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('u/login/primekey/' + payload.vli_subs + '/' + payload.user_num)
              .then(response => {
                this.primekey = response.data.primekey
                this.vli_subs = response.data.vli_subs
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
