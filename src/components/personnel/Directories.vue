<template>

  <v-app>

    <div v-if="showManpower">
      <ManpowerSched
        :fromDirectories=true
        :propPrimekey="this.primekey"
        :propStartDate="this.startDate"
        :propEndDate="this.endDate"
      />
    </div>

    <div v-else>

      <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
        loading
      >

        <template v-slot:header>

          <v-toolbar
            color="primary"
            dark
            elevation="1"
            dense
          >

            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
              dense
            />

              <template v-if="$vuetify.breakpoint.mdAndUp">

                <v-spacer></v-spacer>

                <v-select
                  v-model="sortBy"
                  clearable
                  flat
                  solo-inverted
                  hide-details
                  :items="keys"
                  prepend-inner-icon="mdi-magnify"
                  label="Sort by"
                  dense
                />

                <v-spacer />

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

                    <v-icon>
                      mdi-arrow-up
                    </v-icon>

                  </v-btn>

                  <v-btn
                    depressed
                    color="blue"
                    :value="true"
                  >
                    <v-icon>
                      mdi-arrow-down
                    </v-icon>

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
                  :elevation="hover ? 4 : 2"
                >

                  <v-card-title class="subtitle-1">{{ item.name }}</v-card-title>

                  <v-card-subtitle class="subheading font-weight-light"><v-icon dense>mdi-calendar</v-icon> {{ item.coverage }}</v-card-subtitle>

                  <v-divider />

                  <v-list dense>

                    <v-list-item
                      v-for="(key, index) in filteredKeys"
                      :key="index"
                    >

                      <v-list-item-content class="align-end font-weight-light" :class="{ 'blue--text': sortBy === key }">{{ key }}: {{ item[key.toLowerCase().replace(/\s/g, '')] }}</v-list-item-content>

                    </v-list-item>

                  </v-list>

                  <v-card-actions>

                    <v-spacer />

                    <div>

                      <v-btn
                        :disabled="item.status == 'Payroll Sent To Bank' || item.status == 'Payroll Computed' || item.status == '13th Month Computed'"
                        color="blue darken-1"
                        small
                        text
                      >
                        Edit
                      </v-btn>

                      <v-btn
                        color="blue darken-1"
                        small
                        text
                        @click="manpower(item)"
                      >
                        Manpower
                      </v-btn>

                      <v-btn
                        :disabled="item.status == 'Payroll Sent To Bank' || item.status == 'Payroll Computed' || item.status == '13th Month Computed'"
                        :to="`/personnel/directory/folder/${item.directory}`"
                        color="blue darken-1"
                        small
                        text
                      >
                        Folder
                      </v-btn>

                    </div>

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

                  <v-icon>

                    mdi-chevron-down

                  </v-icon>

                </v-btn>

              </template>

              <v-list>

                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >

                  <v-list-item-title>

                    {{ number }}

                  </v-list-item-title>

                </v-list-item>

              </v-list>

            </v-menu>

            <v-spacer />

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

              <v-icon>
                mdi-chevron-left
              </v-icon>

            </v-btn>

            <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >

              <v-icon>

                mdi-chevron-right

              </v-icon>

            </v-btn>

          </v-row>

        </template>

      </v-data-iterator>

    </div>

  </v-app>

</template>

<script>
import ManpowerSched from '@/components/personnel/Manpower.vue'
import axios from 'axios'
var moment = require('moment')

export default {
  name: 'Directories',
  components: {
    ManpowerSched
  },
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      itemsPerPageArray: [4, 8, 1000],
      sortBy: 'directory',
      itemsPerPage: 10,
      startDate: '',
      endDate: '',
      page: 1,
      search: '',
      filter: {},
      items: [],
      dateArray: [],
      directories: [],
      jsonDirectories: [],
      showManpower: false,
      disabled: false,
      sortDesc: true,
      keys: [
        'Name',
        'Directory',
        'Release',
        'Payroll Group',
        'W2 Year',
        'SSS Period',
        'Status',
        'Days',
        'Processed'
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
    manpower (item) {
      var startDate = new Date(item.coverage.substring(0, 10))
      var endDate = new Date(item.coverage.substring(13, 24))
      this.startDate = moment(startDate).format('YYYY-MM-DD')
      this.endDate = moment(endDate).format('YYYY-MM-DD')
      this.showManpower = true
    },
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
      // if (!this.$cookies.isKey('primekey')) {
      //   this.$router.push({ name: 'userLogout' })
      // }
      this.$store.dispatch('retrieveDirectories', {
        primekey: this.primekey
      })
        .then(response => {
          this.jsonDirectories = this.$store.getters.retrieveDirectories
          this.directories = this.jsonDirectories.map(e => ({
            directory: e.cntrl_no,
            name: `${moment(e.month___, 'MM').format('MMMM')} ${e.year____} - Part ${e.part____}`,
            coverage: `${moment(e.strt_dte).format('MM/DD/YYYY')} - ${moment(e.last_dte).format('MM/DD/YYYY')}`,
            release: e.remarks_,
            payrollgroup: e.descript,
            w2year: e.w2_year_,
            sssperiod: e.appl_prd,
            status: `${this.payrollStatus(e.status__)}`,
            days: `${moment(e.last_dte).diff(`${moment(e.strt_dte)}`, 'days') + 1}`,
            processed: `${e.ttl_empl}`
          }))
          this.items = this.directories
        })
    },
    createDtrFolder (item) {
      // disabled
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
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        axios.post('u/personnel/directory/create/folder', {
          dateArray: this.dateArray,
          primekey: this.primekey,
          cntrl_no: item.directory,
          userName: this.$store.getters.retrieveUser.user_nme
        })
          .then(response => {
            resolve(response)
            this.$emit('getDirectories')
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
    this.$on('getDirectories', () => {
      this.getDirectories()
    })
    // this.countDays()
  },
  mounted () {
    this.$root.$on('saved', () => {
      this.getDirectories()
    })
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
