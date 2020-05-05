<template>
  <div>
  <v-row justify="center">
    <v-dialog v-model="lb_dialog" persistent max-width="600px">
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template> -->
      <v-card>
        <v-card-title>
          <span class="headline">Create Directory</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="group_no"
                  :items="payrollGroup"
                  label="Payroll Group*"
                  item-text="descript"
                  item-value="group_no"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="part____"
                  :items="itemPart"
                  label="Payroll Type*"
                  item-text="descript"
                  item-value="cntrl_no"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="year____"
                  :items="itemYear_"
                  label="Year*"
                  item-text="descript"
                  item-value="year____"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="month___"
                  :items="itemMos_"
                  label="Month*"
                  item-text="descript"
                  item-value="month___"
                  required
                ></v-select>
              </v-col>
              <!-- payroll start date -->
              <v-col cols="12" sm="6" md="6">
                <v-menu
                  v-model="showStartPicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="strt_dte"
                    label="Choose the date"
                    persistent-hint
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                    <v-date-picker
                        v-model="strt_dte"
                        no-title
                        @input="showPicker = false"
                    ></v-date-picker>
                </v-menu>
              </v-col>
              <!-- payroll end date -->
              <v-col cols="12" sm="6" md="6">
                <v-menu
                  v-model="showLastPicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="last_dte"
                    label="Choose the date"
                    persistent-hint
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                    <v-date-picker
                        v-model="last_dte"
                        no-title
                        @input="showLastPicker = false"
                    ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-model="w2_year_"
                  :items="itemYear_"
                  item-text="descript"
                  item-value="year____"
                  label="W2 Year*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-model="appl_prd"
                  :items="itemAppl"
                  item-text="descript"
                  item-value="appl_prd"
                  label="Application Period*"
                  required
                  v-if="done"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="rele_dte" label="Release Date"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close()">Close</v-btn>
          <v-btn color="blue darken-1" text @click="savePayrollDirectory()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
    <h3>{{ snackText }}</h3>
    <v-btn text @click="snack = false, lb_dialog = false">Close</v-btn>
  </v-snackbar>
  </div>
</template>
<script>
import axios from 'axios'
var moment = require('moment')

export default {
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      showStartPicker: false,
      showLastPicker: false,
      lb_dialog: true,
      snack: false,
      done: true,
      snackColor: '',
      snackText: '',
      group_no: '',
      part____: '',
      year____: '',
      month___: '',
      strt_dte: null,
      last_dte: null,
      w2_year_: '',
      appl_prd: '',
      rele_dte: '',
      payrollGroup: [],
      payrollDirectoryBuild: [],
      itemPart: [
        {
          'cntrl_no': '1',
          'descript': '1st Part'
        },
        {
          'cntrl_no': '2',
          'descript': '2nd Part'
        }
      ],
      itemYear_: [
        {
          'year____': '2019',
          'descript': '2019'
        },
        {
          'year____': '2020',
          'descript': '2020'
        },
        {
          'year____': '2021',
          'descript': '2021'
        }
      ],
      itemAppl: [
        {
          'appl_prd': this.applYear + '01',
          'descript': this.applYear + ' - January'
        },
        {
          'appl_prd': moment().format('YYYY') + '02',
          'descript': moment().format('YYYY') + ' - February'
        },
        {
          'appl_prd': moment().format('YYYY') + '03',
          'descript': moment().format('YYYY') + ' - March'
        },
        {
          'appl_prd': moment().format('YYYY') + '04',
          'descript': moment().format('YYYY') + ' - April'
        },
        {
          'appl_prd': moment().format('YYYY') + '05',
          'descript': moment().format('YYYY') + ' - May'
        },
        {
          'appl_prd': moment().format('YYYY') + '06',
          'descript': moment().format('YYYY') + ' - June'
        },
        {
          'appl_prd': moment().format('YYYY') + '07',
          'descript': moment().format('YYYY') + ' - July'
        },
        {
          'appl_prd': moment().format('YYYY') + '08',
          'descript': moment().format('YYYY') + ' - August'
        },
        {
          'appl_prd': moment().format('YYYY') + '09',
          'descript': moment().format('YYYY') + ' - September'
        },
        {
          'appl_prd': moment().format('YYYY') + '10',
          'descript': moment().format('YYYY') + ' - October'
        },
        {
          'appl_prd': moment().format('YYYY') + '11',
          'descript': moment().format('YYYY') + ' - November'
        },
        {
          'appl_prd': moment().format('YYYY') + '12',
          'descript': moment().format('YYYY') + ' - December'
        }
      ],
      itemMos_: [
        {
          'month___': '01',
          'descript': 'January'
        },
        {
          'month___': '02',
          'descript': 'February'
        },
        {
          'month___': '03',
          'descript': 'March'
        },
        {
          'month___': '04',
          'descript': 'April'
        },
        {
          'month___': '05',
          'descript': 'May'
        },
        {
          'month___': '06',
          'descript': 'June'
        },
        {
          'month___': '07',
          'descript': 'July'
        },
        {
          'month___': '08',
          'descript': 'August'
        },
        {
          'month___': '09',
          'descript': 'September'
        },
        {
          'month___': '10',
          'descript': 'October'
        },
        {
          'month___': '11',
          'descript': 'November'
        },
        {
          'month___': '12',
          'descript': 'December'
        }
      ]
    }
  },
  computed: {
    applYear () {
      const applYear = this.year____ !== moment().format('YYYY') ? this.year____ : moment().format('YYYY')
      return moment(applYear).format('YYYY')
    }
  },
  methods: {
    async savePayrollDirectory () {
      try {
        await new Promise((resolve, reject) => {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
          axios.post('u/personnel/directory/create', {
            primekey: this.primekey,
            group_no: this.group_no,
            part____: this.part____,
            year____: this.year____,
            month___: this.month___,
            strt_dte: this.strt_dte,
            last_dte: this.last_dte,
            rele_dte: this.rele_dte
          })
            .then(response => {
              resolve(response)
              this.snack = true
              this.snackColor = 'success'
              this.snackText = 'Diretory Created'
              this.$root.$emit('saved')
            })
            .catch(error => {
              reject(error)
              this.snack = true
              this.snackColor = 'error'
              this.snackText = 'Error in Creation'
            })
        })
      } catch (error) {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Error in Creation'
      }
    },
    buildPayrollDirectory () {
      this.$store.dispatch('buildPayrollDirectory', {
        primekey: this.primekey
      })
        .then(response => {
          this.payrollDirectoryBuild = this.$store.getters.buildPayrollDirectory
          const payrollDirectoryDetails = this.payrollDirectoryBuild.map(e => ({
            groupNum: `${e.group_no}`,
            part____: `${e.part____}`,
            year____: `${e.year____}`,
            month___: `${e.month___}`,
            strtDate: `${moment(e.strt_dte).format('YYYY-MM-DD')}`,
            lastDate: `${moment(e.last_dte).format('YYYY-MM-DD')}`,
            w2Year__: `${e.year____}`,
            applPrd_: `${e.year____}${e.month___}`,
            releDate: `${e.rele_dte}`
          }))
          this.group_no = payrollDirectoryDetails[0].groupNum
          this.part____ = payrollDirectoryDetails[0].part____
          this.year____ = payrollDirectoryDetails[0].year____
          this.month___ = payrollDirectoryDetails[0].month___
          this.strt_dte = payrollDirectoryDetails[0].strtDate
          this.last_dte = payrollDirectoryDetails[0].lastDate
          this.w2_year_ = payrollDirectoryDetails[0].w2Year__
          this.appl_prd = payrollDirectoryDetails[0].applPrd_
          this.rele_dte = payrollDirectoryDetails[0].releDate
        })
    },
    retrievePayrollGroup () {
      // accept parameter for retrieve
      this.$store.dispatch('retrievePayrollGroup', {
        primekey: this.primekey
      })
        .then(response => {
          this.payrollGroup = this.$store.getters.retrievePayrollGroup
        })
    },
    save () {
      this.$router.push({ name: 'encodeDtr' })
      this.lb_dialog = false
    },
    close () {
      this.lb_dialog = false
      this.$store.commit('toggleDialog')
    }
  },
  created () {
    this.retrievePayrollGroup()
    this.buildPayrollDirectory()
  }
}
</script>
