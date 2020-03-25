<template>
  <v-app>
    <div>
      <v-card>
        <v-app-bar
      color="deep-purple accent-4"
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
              ></v-text-field>
            </template>
            <v-date-picker v-model="strtDate" no-title scrollable>
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
              ></v-text-field>
            </template>
            <v-date-picker v-model="endDate_" no-title scrollable>
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
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        </v-row>
        <!-- <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-btn class="primary" >Create Manpower</v-btn>
          </v-col>
        </v-row> -->
      </v-card-actions>
      </v-card>
      <v-row>
        <v-col cols="12" sm="4" md="3" lg="3">
          <div>
          <v-data-table
            v-model="dprtSlct"
            :headers="departmentHeader"
            :items="dprtment"
            :single-select="singleSelect"
            item-key="pos_code"
            show-select
            class="elevation-1"
            fixed-header
            height="600px"
          >
        </v-data-table>
        <div class="text-center pt-2">
          <v-btn class="primary" @click="retrieveEmployees()">Search</v-btn>
        </div>
        </div>
        </v-col>
        <v-col cols="12" sm="8" md="9" lg="9">
          <v-data-table
            v-model="manpowerSlct"
            :headers="hdrManpowerCoverage"
            :items="manpowerSchedules.data"
            :single-select="singleSelect"
            item-key="cntrl_no"
            show-select
            class="elevation-1"
            fixed-header
            height="600px"
            v-if="switchManpower"
            hide-actions
          >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.empl_cde }}</td>
              <!-- <td v-for="hdrManpowerCoverages in hdrManpowerCoverage" v-bind:key="hdrManpowerCoverages.empl_cde">{{ item[hdrManpowerCoverages.shft_cde] }}</td> -->
              <td class="text-xs-right">{{ item.shft_cde }}</td>
            </tr>
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
            class="elevation-1"
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
  </v-app>
</template>
<script>
import axios from 'axios'
var moment = require('moment')

export default {
  name: 'Manpower',
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      message: 'Hello',
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      strtMenu: false,
      endMenu_: false,
      loading: false,
      snack: false,
      switchManpower: false,
      shftFile: [],
      newShft_: '',
      snackColor: '',
      snackText: '',
      search: '',
      dprtment: [],
      singleSelect: false,
      bol: true,
      emplSlct: [],
      dprtSlct: [],
      employees: [],
      dteArray: [],
      manpowerSchedules: [],
      hdrManpowerCoverage: [],
      coverage: [],
      manpowerData: [],
      manpowerSlct: [],
      strtDate: new Date().toISOString().substr(0, 10),
      endDate_: new Date().toISOString().substr(0, 10),
      employeesHeader: [
        {
          text: 'Image',
          align: 'left',
          sortable: false,
          value: 'avatar__',
          width: '100px'
        },
        {
          text: 'Employee ID',
          align: 'left',
          sortable: true,
          value: 'empl_cde',
          width: '200px'
        },
        { text: 'Last Name', value: 'last_nme', align: 'left', width: '200px', disabled: true },
        { text: 'First Name', value: 'frst_nme', align: 'left', width: '200px' },
        { text: 'Payroll Group', value: 'paygroupdescript', align: 'left', width: '200px' },
        { text: 'Status', value: 'workstatdescript', align: 'left', width: '200px' },
        { text: 'Position', value: 'position', sortable: false, align: 'left', width: '200px' },
        { text: 'Division', value: 'division', align: 'left', width: '200px' },
        { text: 'Department', value: 'department', align: 'left', width: '200px' },
        { text: 'Section', value: 'section', align: 'left', width: '200px' },
        { text: 'Actions', value: 'action', sortable: false, align: 'center' }
      ],
      departmentHeader: [
        {
          text: 'Department',
          align: 'left',
          sortable: true,
          value: 'descript',
          width: '300px'
        }
      ]
    }
  },
  watch: {
    switchManpower (bol) {
      if (bol) {
        this.retrieveManpowerSchedules()
      }
    }
  },
  methods: {
    retrieveDepartment () {
      this.$store.dispatch('retrieveDepartment', {
        primekey: this.primekey
      })
        .then(response => {
          this.dprtment = this.$store.getters.retrieveDepartment
        })
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
    getManpowerCoverage () {
      this.hdrManpowerCoverage = this.coverage.map(date => ({
        text: `${date}`,
        value: false
      }))
    // this.coverage.forEach(coverage => {
    //   console.log(coverage)
      // this.manpowerData = this.manpowerSchedules.map(e => ({
      //   text: `${coverage}`,
      //   align: 'left',
      //   sortable: false,
      //   value: 'shft_cde',
      //   width: '300px'
      // }))
    // })
    },
    async retrieveManpowerSchedules () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        await new Promise((resolve, reject) => {
          axios.get(`u/personnel/manpower/schedules/${this.primekey}/${this.strtDate}/${this.endDate_}`)
            .then(response => {
              this.manpowerSchedules = response.data
              this.coverage = response.data.strt_dte
              resolve(response)
              console.log(this.manpowerSchedules)
              this.getManpowerCoverage()
            })
            .catch(error => {
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
            axios.get('u/personnel/directory/employees/', {
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
          axios.post('u/personnel/manpower', {
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
    }
  },
  created () {
    this.retrieveShiftFile()
    this.retrieveDepartment()
    // this.retrieveEmployees()
  }
}
</script>
