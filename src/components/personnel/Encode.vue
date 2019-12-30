<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
          dense
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="search"
            label="Search"
            dense
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              clearable
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="search"
              label="Sort by"
              dense
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
              dense
            >
              <v-btn
                depressed
                color="blue"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                depressed
                color="blue"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.cntrl_no"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
          <v-hover v-slot:default="{ hover }">
            <v-card
              class="mx-auto"
              max-width="400"
              :elevation="hover ? 12 : 2"
            >
              <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>
              <v-card-subtitle class="subheading black--text"><v-icon dense>mdi-calendar</v-icon> {{ item.coverage }}</v-card-subtitle>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                >
                  <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === key }">{{ key }}: {{ item[key.toLowerCase().replace(/\s/g, '')] }}</v-list-item-content>
                </v-list-item>
              </v-list>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="disabled" color="blue darken-1" text>Edit Directory</v-btn>
                <v-btn @click="createDtr(item)" color="blue darken-1" text>Create DTR</v-btn>
                <!-- <v-btn v-else-if="!createDtr" color="blue darken-1" text>Upload DTR</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-hover>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
// import { PayrollStatus } from '../../mixins/common/common'
var moment = require('moment')

export default {
  // mixins: [PayrollStatus],
  data () {
    return {
      dateArray: [],
      dtrDate: [],
      jsonDirectories: [],
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
      keys: [
        'Name',
        'Folder',
        'Description',
        'Payroll Group',
        'W2 Year',
        'SSS Period',
        'Status'
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
      // this function must be equal to data `keys`. List items remove any space in between by using replace(/\s/g, '') and lowercase the string
      // this function map the json file then concatenate or mapping the object
      this.$store.dispatch('retrieveDirectories', {
        primekey: localStorage.getItem('primekey')
      })
        .then(response => {
          this.jsonDirectories = this.$store.getters.retrieveDirectories
          this.directories = this.jsonDirectories.map(e => ({
            folder: e.cntrl_no,
            name: `${moment(e.month___, 'MM').format('MMMM')} ${e.year____} ( Part ${e.part____} )`,
            coverage: `${moment(e.strt_dte).format('MM/DD/YYYY')} - ${moment(e.last_dte).format('MM/DD/YYYY')}`,
            description: e.remarks_,
            payrollgroup: e.descript,
            w2year: e.w2_year_,
            sssperiod: e.appl_prd,
            status: `${this.payrollStatus(e.status__)}`
          }))
          this.items = this.directories
          if (this.items.status !== 0) {
            this.disabled = true
          }
        })
    },
    createDtr (item) {
      var startDate = new Date(item.coverage.substring(0, 10))
      var endDate = new Date(item.coverage.substring(13, 24))

      var currentDate = moment(startDate)
      var stopDate = moment(endDate)
      while (currentDate <= stopDate) {
        this.dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
        currentDate = moment(currentDate).add(1, 'days')
      }
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
