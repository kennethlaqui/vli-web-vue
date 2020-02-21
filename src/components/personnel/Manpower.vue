<template>
  <v-app>
    <div>
      <v-card max-height="100px">
      <v-card-actions>
        <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Picker in menu"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Picker in menu"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="newShft_"
            :items="shftFile"
            item-text="std_shft"
            item-value="shft_cde"
            label="Choose Day Type"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-btn class="primary" >Create Manpower</v-btn>
        </v-col>
        </v-row>
      </v-card-actions>
      </v-card>
      <v-row>
        <v-col cols="12">
          <v-layout column style="height: 90vh">
          <v-flex md6 style="overflow: auto">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="employees"
            :single-select="singleSelect"
            item-key="empl_cde"
            show-select
            class="elevation-1"
            group-by="department"
            fixed-header
            headers-length
          >
          </v-data-table>
          </v-flex>
          </v-layout>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>
<script>
import axios from 'axios'

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
      shftFile: [],
      newShft_: '',
      singleSelect: false,
      bol: true,
      selected: [],
      employees: [],
      headers: [
        {
          text: 'Employee ID',
          align: 'left',
          sortable: true,
          value: 'empl_cde'
        },
        { text: 'Last Name', value: 'last_nme' },
        { text: 'First Name', value: 'frst_nme' },
        { text: 'Payroll Group', value: 'paygroupDescript' },
        { text: 'Status', value: 'workstatDescript' },
        { text: 'Position', value: 'position', sortable: false, align: 'center' },
        { text: 'Division', value: 'division' },
        { text: 'Department', value: 'department' },
        { text: 'Section', value: 'section' }
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
    }
  },
  created () {
    this.retrieveShiftFile()
    this.retrieveEmployees()
  }
}
</script>
