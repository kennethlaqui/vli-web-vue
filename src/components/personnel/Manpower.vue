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
        <v-col cols="12">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="employees"
            :single-select="singleSelect"
            item-key="empl_cde"
            show-select
            :search="search"
            class="elevation-1"
          >
          </v-data-table>
        </v-col>
      </v-row>
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
      shftFile: [],
      newShft_: '',
      search: '',
      singleSelect: false,
      bol: true,
      selected: [],
      employees: [],
      dteArray: [],
      strtDate: new Date().toISOString().substr(0, 10),
      endDate_: new Date().toISOString().substr(0, 10),
      headers: [
        {
          text: 'Employee ID',
          align: 'left',
          sortable: true,
          value: 'empl_cde'
        },
        { text: 'Last Name', value: 'last_nme', align: 'left' },
        { text: 'First Name', value: 'frst_nme', align: 'left' },
        { text: 'Payroll Group', value: 'paygroupDescript', align: 'left' },
        { text: 'Status', value: 'workstatDescript', align: 'left' },
        { text: 'Position', value: 'position', sortable: false, align: 'left' },
        { text: 'Division', value: 'division', align: 'left' },
        { text: 'Department', value: 'department', align: 'left' },
        { text: 'Section', value: 'section', align: 'left' },
        { text: 'Actions', value: 'action', sortable: false, align: 'center' }
      ]
    }
  },
  methods: {
    retrieveShiftFile () {
      // display all day type
      this.$store.dispatch('retrieveShiftFile', {
        primekey: localStorage.getItem('primekey')
      })
        .then(response => {
          this.shftFile = this.$store.getters.retrieveShiftFile
        })
    },
    async retrieveEmployees () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.bol) {
          await new Promise((resolve, reject) => {
            axios.get('u/personnel/directory/employees/', {
              params: {
                primekey: this.primekey
              }
            })
              .then(response => {
                this.employees = response.data
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
    async createStartEndDate () {
      var strtDate = moment(this.strtDate).format('YYYY-MM-DD')
      var endDate_ = moment(this.endDate_).format('YYYY-MM-DD')
      while (strtDate <= endDate_) {
        this.dteArray.push(moment(strtDate).format('YYYY-MM-DD'))
        strtDate = moment(strtDate).add(1, 'days').format('YYYY-MM-DD')
      }
      this.employees = this.employees.map(e => {
        var obj = Object.assign({}, e)
        obj.dteArray = this.dteArray
        return obj
      })
      console.log(this.employees)
      try {
        await new Promise((resolve, reject) => {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
          axios.post('u/personnel/manpower', {
            primekey: this.primekey,
            employees: this.employees
          })
            .then(response => {
              resolve(response)
              console.log(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      } catch (error) {
      }
    }
  },
  created () {
    this.retrieveShiftFile()
    this.retrieveEmployees()
  }
}
</script>
