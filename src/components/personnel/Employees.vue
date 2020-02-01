<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="employees"
    :single-select="singleSelect"
    item-key="name"
    show-select
    class="elevation-1"
  >
    <template v-slot:top>
      <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
    </template>
  </v-data-table>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      bol: true,
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
                console.log(this.employees)
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
    this.retrieveEmployees()
  }
}
</script>
