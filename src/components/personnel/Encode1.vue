<template>
<v-card>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="directories"
    :single-select="singleSelect"
    item-key="cntrl_no"
    show-select
    class="elevation-1"
    :loading="loading"
    :search="search"
  >
    <template v-slot:item.avatar__="{ item }">
      <v-avatar size="36">
        <img
          :src="item.avatar__"
          alt="John"
        >
      </v-avatar>
    </template>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      No data to retrieve
    </template>
  </v-data-table>
</v-card>
</template>
<script>
import axios from 'axios'
// import { PayrollStatus } from '../../mixins/common/common'
var moment = require('moment')

export default {
  // mixins: [PayrollStatus],
  data () {
    return {
      selected: [],
      loading: false,
      dateArray: [],
      directories: [],
      disabled: false,
      itemsPerPageArray: [4, 8, 1000],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 10,
      sortBy: 'coverage',
      items: [],
      headers: [
        { text: 'Folder #', value: 'cntrl_no', align: 'left', sortable: true },
        { text: 'Year', value: 'year____' },
        { text: 'Month', value: 'month___' },
        { text: 'Part', value: 'part____' },
        { text: 'Date Start', value: 'strt_dte' },
        { text: 'Date End', value: 'last_dte' },
        { text: 'Payout', value: 'remarks_' },
        { text: 'Payroll Group', value: 'descript' },
        { text: 'W2 Year', value: 'w2_year_' },
        { text: 'Actions', value: 'action', sortable: false }
      ]
    }
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== `Name`)
    }
  },
  methods: {
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
    getDirectories () {
      // this function must be equal to data `keys`. List items will remove any space in between by using replace(/\s/g, '') and lowercase the string
      // this function map the json file then concatenate or mapping the object
      this.$store.dispatch('retrieveDirectories', {
        primekey: localStorage.getItem('primekey')
      })
        .then(response => {
          this.directories = this.$store.getters.retrieveDirectories
        })
    },
    createDtrFolder (item) {
      // will generate dates between from and to dates
      var startDate = new Date(item.coverage.substring(0, 10))
      var endDate = new Date(item.coverage.substring(13, 24))
      var currentDate = moment(startDate)
      var stopDate = moment(endDate)
      while (currentDate <= stopDate) {
        this.dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
        currentDate = moment(currentDate).add(1, 'days')
      }
      return new Promise((resolve, reject) => {
        axios.post('u/personnel/encode/create/dtr/folder', {
          dateArray: this.dateArray,
          primekey: localStorage.getItem('primekey'),
          cntrl_no: item.folder
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    payrollStatus (status) {
      switch (status) {
        case '0':
          return 'Initial Value'

        case '1':
          return 'Copied DTR / Bonus Searched / Merged'

        case '2':
          return 'Payroll Computed'

        case '3':
          return 'Payroll Sent To Bank'

        case 'A':
          return 'Last Pay Computed'

        case 'B':
          return '13th Month Computed'
      }
    }
  },
  created () {
    this.getDirectories()
  }
}
</script>
<style>
  .v-list {
    font-size: 0.9em;
  }
  .v-list-item {
    align-items: 'right';
  }
</style>
