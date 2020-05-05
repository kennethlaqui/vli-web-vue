<template>
  <v-app>
    <v-container>
    <div>
      <v-card>
        <v-app-bar
          color="primary"
          dense
          dark
        >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>Manpower</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-switch v-on="on" v-model="switchManpower" label="Schedule" class="pa-4 mt-5"></v-switch>
        </template>
        {{ switchManpower }}
        <span>View Schedules</span>
      </v-tooltip>

      <v-btn icon>
        <v-icon>mdi-delete-variant</v-icon>
      </v-btn>

      <v-btn icon>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon exact>
              <v-icon>mdi-sync</v-icon>
            </v-btn>
          </template>
          <span>View Schedules</span>
        </v-tooltip>
      </v-btn>

      <v-btn icon @click="createStartEndDate()">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>Download Manpower</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Print Manpower</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
      <!-- <v-card-subtitle>Coverage</v-card-subtitle> -->
      <v-card-actions>
        <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-menu
            ref="strtMenu"
            v-model="strtMenu"
            :close-on-content-click="false"
            :return-value.sync="strtDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="strtDate"
                label="Start Date"
                prepend-icon="event"
                readonly
                v-on="on"
                class="font-weight-light"
              ></v-text-field>
            </template>
            <v-date-picker v-model="strtDate" no-title scrollable @change="retrieveEmployeeCode()">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="strtMenu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.strtMenu.save(strtDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-menu
            ref="endMenu_"
            v-model="endMenu_"
            :close-on-content-click="false"
            :return-value.sync="endDate_"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="endDate_"
                label="End Date"
                prepend-icon="event"
                readonly
                v-on="on"
                class="font-weight-light"
              ></v-text-field>
            </template>
            <v-date-picker v-model="endDate_" no-title scrollable @change="retrieveEmployeeCode()">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="endMenu_ = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.endMenu_.save(endDate_)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="newShft_"
            :items="shftFile"
            item-text="std_shft"
            item-value="shft_cde"
            label="Shift"
            class="font-weight-light"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            class="font-weight-light"
          ></v-text-field>
        </v-col>
        </v-row>
      </v-card-actions>
      </v-card>
      <!-- deparment and employee codes section -->
      <v-row>
        <v-col cols="12" sm="4" md="4" lg="4">
          <div>
          <v-data-table
            v-model="employeeWithScheduleSelect"
            :headers="employeesWithSchedulesHeader"
            :items="employeeWithSchedules"
            :single-select="singleSelect"
            :loading="loading"
            item-key="empl_cde"
            show-select
            class="elevation-1 font-weight-light caption"
            fixed-header
            height="600px"
            v-if="switchManpower"
          >
        </v-data-table>
        <v-data-table
            v-model="dprtSlct"
            :headers="departmentHeader"
            :items="dprtment"
            :single-select="singleSelect"
            :loading="loading"
            item-key="pos_code"
            show-select
            class="elevation-1 font-weight-light caption"
            fixed-header
            height="600px"
            v-else
          >
        </v-data-table>
        <div class="text-center pt-2">
          <v-btn v-if="switchManpower" class="primary" @click="retrieveEmployeeWithManpower()">Search</v-btn>
          <v-btn v-else class="primary" @click="retrieveEmployees()">Search</v-btn>
        </div>
        </div>
        </v-col>
        <!-- employee and manpower schedules -->
        <v-col cols="12" sm="12" md="8" lg="8">
          <v-data-table
            v-model="manpowerSlct"
            :headers="employeesWithManpowerHeader"
            :items="manpowerSchedules"
            :loading="loading"
            item-key="cntrl_no"
            class="elevation-1 font-weight-light caption"
            fixed-header
            height="600px"
            group-by="employee"
            v-if="switchManpower"
          >
          <template v-slot:item.avatar__="{ item }">
            <v-avatar size="36">
              <img
                :src="item.avatar__"
                alt="John"
              >
            </v-avatar>
          </template>
          <template v-slot:item.day="{ item }">
            {{ getDay(item.strt_dte) }}
          </template>
          <template v-slot:item.std_shft="{ item }">
            <v-edit-dialog
              @save="saveShiftFile"
              @cancel="cancelShiftFile"
              @open="openShiftFile"
              @close="closeShiftFile"
            > {{ item.std_shft }}
              <template v-slot:input>
                <v-select
                  v-model="item.shft_cde"
                  :items="shftFile"
                  item-text="std_shft"
                  item-value="shft_cde"
                  label="Available Shift"
                  @change="getNewShift(item)"
                ></v-select>
              </template>
            </v-edit-dialog>
          </template>
          </v-data-table>
          <v-data-table
            v-model="emplSlct"
            :headers="employeesHeader"
            :items="employees"
            :single-select="singleSelect"
            :loading="loading"
            item-key="empl_cde"
            show-select
            :search="search"
            class="elevation-1 font-weight-light caption"
            fixed-header
            height="600px"
            v-else
          >
            <template v-slot:item.avatar__="{ item }">
            <v-avatar size="36">
              <img
                :src="item.avatar__"
                alt="John"
              >
            </v-avatar>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        <h3>{{ snackText }}</h3>
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
    </div>
    </v-container>
  </v-app>
</template>
<script>
import axios from 'axios'
import { Form } from 'vform'
var moment = require('moment')

export default {
  name: 'Manpower',
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      message: 'Hello',
      date: new Date().toISOString().substr(0, 10),
      x: [],
      menu: false,
      modal: false,
      menu2: false,
      strtMenu: false,
      endMenu_: false,
      loading: false,
      snack: false,
      switchManpower: false,
      searchManpower: false,
      shftFile: [],
      newShft_: '',
      snackColor: '',
      snackText: '',
      search: '',
      dprtment: [],
      singleSelect: false,
      checkbox: true,
      bol: true,
      emplSlct: [],
      dprtSlct: [],
      employees: [],
      dteArray: [],
      employeeWithSchedules: [],
      employeeWithScheduleSelect: [],
      manpowerSchedules: [],
      manpowerSlct: [],
      strtDate: new Date().toISOString().substr(0, 10),
      endDate_: new Date().toISOString().substr(0, 10),
      form: new Form({
        primekey: '',
        cntrl_no: '',
        shft_cde: ''
      }),
      employeesHeader: [
        {
          text: 'Image',
          align: 'left',
          sortable: false,
          value: 'avatar__',
          width: '100px',
          divider: true
        },
        {
          text: 'Employee ID',
          align: 'left',
          sortable: true,
          value: 'empl_cde',
          width: '200px',
          divider: true
        },
        { text: 'Last Name', value: 'last_nme', align: 'left', width: '200px', divider: true },
        { text: 'First Name', value: 'frst_nme', align: 'left', width: '200px', divider: true },
        { text: 'Payroll Group', value: 'paygroupdescript', align: 'left', width: '200px', divider: true },
        { text: 'Status', value: 'workstatdescript', align: 'left', width: '200px', divider: true },
        { text: 'Position', value: 'position', sortable: false, align: 'left', width: '200px', divider: true },
        { text: 'Division', value: 'division', align: 'left', width: '200px', divider: true },
        { text: 'Department', value: 'department', align: 'left', width: '200px', divider: true },
        { text: 'Section', value: 'section', align: 'left', width: '200px', divider: true },
        { text: 'Actions', value: 'action', sortable: false, align: 'center', divider: true }
      ],
      departmentHeader: [
        {
          text: 'Department',
          align: 'left',
          sortable: true,
          value: 'descript',
          width: '300px'
        }
      ],
      employeesWithSchedulesHeader: [
        {
          text: 'Employee #',
          align: 'left',
          sortable: true,
          width: '120px',
          value: 'empl_cde',
          divider: true
        },
        { text: 'Last Name', value: 'last_nme', align: 'left', width: '200px', divider: true },
        { text: 'First Name', value: 'frst_nme', align: 'left', width: '200px', divider: true },
        { text: 'Department', value: 'dprtment', align: 'left', width: '200px', divider: true }
      ],
      employeesWithManpowerHeader: [
        {
          text: 'Profile',
          align: 'center',
          sortable: true,
          value: 'avatar__',
          divider: true
        },
        {
          text: 'Date',
          align: 'left',
          sortable: true,
          value: 'strt_dte',
          divider: true,
          resizable: true
        },
        { text: 'Day', value: 'day', align: 'left', divider: true },
        { text: 'Shift', value: 'std_shft', align: 'left', divider: true },
        { text: 'Hours', value: 'ttl_hrs_', align: 'left', divider: true },
        { text: 'Overtime', value: 'ot_hrs__', align: 'left', divider: true }
      ]
    }
  },
  watch: {
    switchManpower (value) {
      if (value) {
        this.retrieveEmployeeCode()
      }
    },
    employeeWithScheduleSelect (value) {
      return value.length > 0 ? this.retrieveEmployeeWithManpower() : ''
    },
    dprtSlct (value) {
      return value.length > 0 ? this.retrieveEmployees() : ''
    }
  },
  methods: {
    retrieveDepartment () {
      this.loading = true
      this.$store.dispatch('retrieveDepartment', {
        primekey: this.primekey
      })
        .then(response => {
          this.dprtment = this.$store.getters.retrieveDepartment
          this.loading = false
        })
    },
    async updateEmployeeShift () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.$store.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            this.form.patch('u/personnel/manpower/shift/update', {
            })
              .then(response => {
                resolve(response)
                this.$emit('retrieveEmployeeWithManpower')
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Data saved'
    },
    retrieveShiftFile () {
      // display all day type
      this.$store.dispatch('retrieveShiftFile', {
        primekey: this.primekey
      })
        .then(response => {
          this.shftFile = this.$store.getters.retrieveShiftFile
        })
    },
    async retrieveEmployeeWithManpower () {
      this.loading = true
      const employeeCode = this.employeeWithScheduleSelect.map(e => {
        return e.empl_cde
      })
      // retrieve manpower schedule of employee based on primekey, employee code, start and end date
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        await new Promise((resolve, reject) => {
          axios.get('u/personnel/manpower/', {
            params: {
              primekey: this.primekey,
              empl_cde: employeeCode,
              strtDate: this.strtDate,
              endDate_: this.endDate_
            }
          })
            .then(response => {
              this.manpowerSchedules = response.data.manpower
              resolve(response)
              this.loading = false
            })
            .catch(error => {
              reject(error)
            })
        })
      } catch (error) {
      }
    },
    async retrieveEmployeeCode () {
      // retrieve all employee code based on primekey, start and end date
      this.loading = true
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        await new Promise((resolve, reject) => {
          axios.get(`u/personnel/manpower/employeecode/${this.primekey}/${this.strtDate}/${this.endDate_}`)
            .then(response => {
              this.employeeWithSchedules = response.data.employeeCode
              resolve(response)
              this.loading = false
            })
            .catch(error => {
              this.getErrorStatus(error)
              reject(error)
            })
        })
      } catch (error) {
      }
    },
    async retrieveEmployees () {
      this.loading = true
      const dprtSlct = this.dprtSlct.map(e => {
        return e.pos_code
      })
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.bol) {
          await new Promise((resolve, reject) => {
            axios.get('u/personnel/manpower/employees/', {
              params: {
                primekey: this.primekey,
                dprtment: dprtSlct
              }
            })
              .then(response => {
                this.employees = response.data
                resolve(response)
                this.loading = false
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    async createStartEndDate () {
      if (this.newShft_.length === 0) {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Invalid Shift'
        return
      }
      var strtDate = moment(this.strtDate).format('YYYY-MM-DD')
      var endDate_ = moment(this.endDate_).format('YYYY-MM-DD')
      this.dteArray.length = 0
      while (strtDate <= endDate_) {
        this.dteArray.push(moment(strtDate).format('YYYY-MM-DD'))
        strtDate = moment(strtDate).add(1, 'days').format('YYYY-MM-DD')
      }
      try {
        await new Promise((resolve, reject) => {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
          axios.post('u/personnel/manpower/create', {
            primekey: this.primekey,
            employees: this.emplSlct,
            dteArray: this.dteArray,
            shiftCde: this.newShft_
          })
            .then(response => {
              resolve(response)
              this.snack = true
              this.snackColor = 'success'
              this.snackText = 'Data save'
            })
            .catch(error => {
              reject(error)
              this.snack = true
              this.snackColor = 'error'
              this.snackText = 'Error in data'
            })
        })
      } catch (error) {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Error in data'
      }
    },
    getDay (value) {
      return moment(value).format('dddd')
    },
    getErrorStatus (arg) {
      switch (arg.response.status) {
        case 500:
          this.snack = true
          this.snackColor = 'error'
          this.snackText = 'Internal Server Error'
          break

        case 429:
          this.snack = true
          this.snackColor = 'error'
          this.snackText = 'Too Many Request. Try Again Later.'
          break
      }
    },
    cancelShiftFile () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    openShiftFile () {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    closeShiftFile () {
      this.saveShiftFile()
    },
    saveShiftFile () {
      this.updateEmployeeShift()
    },
    getNewShift (item) {
      this.form.primekey = this.primekey
      this.form.cntrl_no = item.cntrl_no
      this.form.shft_cde = item.shft_cde
    }
  },
  created () {
    this.retrieveShiftFile()
    this.retrieveDepartment()
    this.$on('retrieveEmployeeWithManpower', () => {
      this.retrieveEmployeeWithManpower()
    })
  }
}
</script>
