<template>
  <v-app>
  <div>
    <v-row>
    <v-col cols="12" md="6" lg="6">
    <v-data-table
      v-model="header"
      :headers="header2"
      :items="incomeType"
      item-key="cntrl_no"
      class="elevation-2 table"
      :items-per-page="5"
      :search="search"
    >
    <template v-slot:item="{ item }">
      <tr @click="getIncomeTypeCode(item)" :class="{'primary': item.cntrl_no === selectRow}">
        <td>
          <v-layout justify-center>
            {{ item.descrip2 }}
          </v-layout>
        </td>
        <td>
          <v-layout justify-center>
            {{ item.descript.trim() }}
          </v-layout>
        </td>
        <td>
          <v-layout justify-center>
            {{ item.cntrl_no }}
          </v-layout>
        </td>
        <td>
          <v-layout justify-center>
            {{ item.taxable_ }}
          </v-layout>
        </td>
      </tr>
    </template>
    </v-data-table>
    </v-col>
    </v-row>
  </div>
  <div>
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <v-data-table
          :headers="headers"
          :items="employees"
          class="elevation-2"
          :items-per-page="5"
          >
        </v-data-table>
      </v-col>
    </v-row>
  </div>
  </v-app>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      oneTimeIncomeTable: '',
      incomeType: [],
      employees: [],
      search: '',
      header: '',
      selectRow: '',
      headers: [
        {
          text: 'Employee Code',
          align: 'left',
          sortable: true,
          value: 'empl_cde'
        },
        { text: 'First Name', value: 'frst_nme' },
        { text: 'Last Name', value: 'last_nme' },
        { text: 'Day Type', value: 'descript' },
        { text: 'Created At', value: 'creat_dt' }
      ],
      header2: [
        { text: 'Abbrvtn', value: 'descrip2' },
        { text: 'Description', value: 'descript' },
        {
          text: 'Control #',
          align: 'left',
          sortable: true,
          value: 'cntrl_no'
        },
        { text: 'Taxable', value: 'taxable_' }
      ]
    }
  },
  methods: {
    getIncomeType () {
      this.$store.dispatch('retrieveIncomeType', {
        primekey: this.primekey
      })
        .then(response => {
          this.incomeType = this.$store.getters.retrieveIncomeType
        })
    },
    getIncomeTypeCode (item) {
      this.selectRow = item.cntrl_no
      this.$set(item, 'selected', true)
    },
    async retrieveEmployees () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.bol) {
          await new Promise((resolve, reject) => {
            axios.get(`u/personnel/directory/uploaddtremployee/${this.primekey}`)
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
    this.getIncomeType()
    this.retrieveEmployees()
  }
}
</script>
