<template>

  <div>

    <v-card>

      <v-app-bar
        color="blue darken-3"
        dark
        dense
      >

        <v-toolbar-title>Manpower Schedule</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- switch employees button -->
        <v-tooltip bottom>

          <template v-slot:activator="{ on }">

            <!-- button for uploading schedule -->
            <v-btn
              v-if="switchEmployees"
              v-on="on"
              icon
              exact
              @click="(switchEmployees = false, retrieveEmployeeCode())"
            >
              <v-icon>mdi-calendar-clock</v-icon>

            </v-btn>

            <!-- button for manpower schedule -->
            <v-btn
              v-else
              v-on="on"
              icon
              exact
              @click="switchEmployees = true"
            >
              <v-icon>mdi-account-clock-outline</v-icon>

            </v-btn>

          </template>

          <span>Switch Employees/Schedules</span>

        </v-tooltip>

        <!-- save  -->
        <v-btn
          icon
          @click.stop="dialog = true"
        >
        <!-- @click="createStartEndDate()" -->
          <v-icon>mdi-content-save</v-icon>

        </v-btn>

        <!-- delete button -->
        <v-btn icon>

          <v-icon>mdi-trash-can-outline</v-icon>

        </v-btn>

        <!-- dots options -->
        <v-menu
          left
          bottom
        >

          <template v-slot:activator="{ on }">

            <v-btn
              icon
              v-on="on"
            >

              <v-icon>mdi-dots-vertical</v-icon>

            </v-btn>

          </template>

          <v-list dense>

            <v-list-item>

              <v-list-item-title>Download Manpower</v-list-item-title>

            </v-list-item>

            <v-list-item>

              <v-list-item-title>Print Manpower</v-list-item-title>

            </v-list-item>

          </v-list>

        </v-menu>

      </v-app-bar>

      <!-- headers -->
      <v-card-actions>

        <v-row>

          <!-- start date -->
          <v-col cols="12" md="3">

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
                  dense
                />

              </template>

              <!-- dynamic start date show -->
              <div v-if="!switchEmployees">

                <v-date-picker v-model="strtDate" no-title scrollable @change="retrieveEmployeeCode()">

                  <v-spacer></v-spacer>

                  <v-btn text color="primary" @click="strtMenu = false">Cancel</v-btn>

                  <v-btn text color="primary" @click="$refs.strtMenu.save(strtDate)">OK</v-btn>

                </v-date-picker>

              </div>

              <div v-if="switchEmployees">

                <v-date-picker v-model="strtDate" no-title scrollable>

                  <v-spacer></v-spacer>

                  <v-btn text color="primary" @click="strtMenu = false">Cancel</v-btn>

                  <v-btn text color="primary" @click="$refs.strtMenu.save(strtDate)">OK</v-btn>

                </v-date-picker>

              </div>

            </v-menu>

          </v-col>

          <!-- end date -->
          <v-col cols="12" md="3">

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
                  :hint="endDateMessage"
                  persistent-hint
                  readonly
                  v-on="on"
                  class="font-weight-light"
                  dense
                />

              </template>

              <!-- dynamic start date show -->
              <div v-if="!switchEmployees">

                <v-date-picker v-if="!switchEmployees" v-model="endDate_" no-title scrollable @change="retrieveEmployeeCode()">

                  <v-spacer></v-spacer>

                  <v-btn text color="primary" @click="endMenu_ = false">Cancel</v-btn>

                  <v-btn text color="primary" @click="$refs.endMenu_.save(endDate_)">OK</v-btn>

                </v-date-picker>

              </div>

              <div v-if="switchEmployees">

                <v-date-picker v-model="endDate_" no-title scrollable>

                  <v-spacer></v-spacer>

                  <v-btn text color="primary" @click="endMenu_ = false">Cancel</v-btn>

                  <v-btn text color="primary" @click="$refs.endMenu_.save(endDate_)">OK</v-btn>

                </v-date-picker>

              </div>

            </v-menu>

          </v-col>

          <!-- shift -->
          <v-col cols="12" md="3">

            <v-select
              v-model="newShft_"
              :items="shftFile"
              item-text="std_shft"
              item-value="shft_cde"
              label="Shift / Day Type"
              class="font-weight-light"
              dense
            />

          </v-col>

          <!-- payroll group -->
          <v-col cols="12" md="3">

            <v-select
              v-model="payGroup"
              :items="payrollGroup"
              item-text="descript"
              item-value="group_no"
              label="Sort By"
              class="font-weight-light"
              dense
            />

          </v-col>

        </v-row>

      </v-card-actions>

    </v-card>

    <!-- content -->
    <v-row v-if="switchEmployees">

      <v-col cols="12" md="4">

        <v-card>

          <v-card-title>

            <v-text-field
              v-model="dprtmentSearch"
              append-icon="mdi-magnify"
              label="Search Department"
              single-line
              hide-details
              class="mt-n4"
            />

          </v-card-title>

            <!-- List of departments. Left Side. Switch View 1 -->
            <v-data-table
              v-model="dprtSlct"
              :headers="departmentHeader"
              :items="dprtment"
              :single-select="true"
              :loading="loading"
              :search="dprtmentSearch"
              item-key="pos_code"
              show-select
              class="elevation-1 font-weight-light caption"
              fixed-header
              height="600px"
            />

        </v-card>

      </v-col>

      <v-col cols="12" md="8">

        <v-card>

          <v-card-title>

            <v-text-field
              v-model="employeeSearch"
              append-icon="mdi-magnify"
              label="Search Employee"
              single-line
              hide-details
              class="mt-n4"
            />

          </v-card-title>

            <!-- List of employee. Right. Switch View 1 -->
            <v-data-table
              v-model="emplSlct"
              :headers="employeesHeader"
              :items="employees"
              :single-select="singleSelect"
              :loading="loading"
              :search="employeeSearch"
              item-key="empl_cde"
              show-select
              class="elevation-1 font-weight-light caption"
              fixed-header
              height="600px"
            >

              <!-- avatar -->
              <template v-slot:item.avatar__="{ item }">

                <v-avatar size="36">
                  <img
                    :src="item.avatar__"
                    alt="John"
                  >
                </v-avatar>

              </template>

            </v-data-table>

        </v-card>

      </v-col>

    </v-row>

    <!-- view 2 -->
    <!-- deparment and employee codes section -->
    <v-row v-if="!switchEmployees">

      <v-col cols="12" md="4">

        <v-card>

          <v-card-title>

            <v-text-field
              v-model="employeeSchedSearch"
              append-icon="mdi-magnify"
              label="Search Employee"
              single-line
              hide-details
              class="mt-n4"
            />

          </v-card-title>

            <!-- List of employee's code with manpower. Left Side. Switch View 2-->
            <v-data-table
              v-model="employeeSchedSelect"
              :headers="employeeSchedHeader"
              :items="employeeSched"
              :single-select="false"
              :loading="loading"
              :search="employeeSchedSearch"
              item-key="empl_cde"
              group-by="dprtment"
              show-select
              fixed-header
              class="elevation-1 font-weight-light caption"
              height="600px"
            />

        </v-card>

      </v-col>

      <!-- List of manpower schedule per employee. Right Side. Switch View 2 -->
      <v-col cols="12" md="8">

        <v-card>

          <v-card-title>

            <v-text-field
              v-model="manpowerSearch"
              append-icon="mdi-magnify"
              label="Search Schedule"
              single-line
              hide-details
              class="mt-n4"
            />

          </v-card-title>

            <v-data-table
              v-model="manpowerSelect"
              :headers="manpowerHeader"
              :items="manpowerSchedules"
              :loading="loading"
              :search="manpowerSearch"
              :single-select="false"
              item-key="cntrl_no"
              group-by="employee"
              show-select
              fixed-header
              class="elevation-1 font-weight-light caption"
              height="600px"
            >
              <template v-slot:item.data-table-select="{ item, isSelected, select }">

                <v-simple-checkbox
                  :value="isSelected"
                  :readonly="item.uploaded === 'T'"
                  :disabled="item.uploaded === 'T'"
                  @input="select($event)"
                  :ripple=false
                />

              </template>

              <template v-slot:item.avatar__="{ item }">

                <!-- slot-avatar -->
                <v-avatar size="36">

                  <img
                    :src="item.avatar__"
                    alt="John"
                  >

                </v-avatar>

              </template>

              <!-- slot-day -->
              <template v-slot:item.day="{ item }">

                {{ getDay(item.strt_dte) }}

              </template>

              <!-- slot-shift -->
              <template v-slot:item.std_shft="{ item }">

                <v-edit-dialog
                  @save="saveShiftFile"
                  @cancel="cancelShiftFile"
                  @open="openShiftFile"
                  @close="closeShiftFile"
                >
                  {{ item.std_shft }}

                  <template v-slot:input>

                    <v-select
                      v-model="item.shft_cde"
                      :items="shftFile"
                      item-text="std_shft"
                      item-value="shft_cde"
                      label="Available Shift"
                      @change="getNewShift(item)"
                    />

                  </template>

                </v-edit-dialog>

              </template>

            </v-data-table>

        </v-card>

      </v-col>

    </v-row>

    <!-- snack bar -->
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">

      <h3>{{ snackText }}</h3>

      <v-btn text @click="snack = false">Close</v-btn>

    </v-snackbar>

    <!-- dialog save -->
    <v-row justify="center" align="center">

      <dialogSaveUpdate
        v-if="dialog"
        dialog
        title="Save Employee/s Shift?"
        content="You are about to save shift schedule on these employees"
        :dialogsave="this.dialogSave"
      >

        <template v-slot:b-close>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Disagree
          </v-btn>

        </template>

        <template v-slot:b-submit>

          <v-btn
            color="green darken-1"
            text
            @click="createStartEndDate(); dialog = false"
          >
            Agree
          </v-btn>

        </template>

      </dialogSaveUpdate>

    </v-row>

  </div>
</template>
<script>
import axios from 'axios'
import { Form } from 'vform'
import dialogSaveUpdate from '@/components/dialogs/masterfile/DialogSaveUpdate.vue'
var moment = require('moment')

export default {
  name: 'Manpower',
  props: {
    propPrimekey: {

    },
    propStartDate: {
      type: String
    },
    propEndDate: {
      type: String
    },
    fromDirectories: {
      type: Boolean,
      default: false
    }
  },
  components: {
    dialogSaveUpdate
  },
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      endDateMessage: '0 Day/s',
      employeeSchedSearch: '',
      dprtmentSearch: '',
      employeeSearch: '',
      manpowerSearch: '',
      snackColor: '',
      snackText: '',
      payGroup: '00',
      newShft_: '',
      date: new Date().toISOString().substr(0, 10),
      strtDate: new Date().toISOString().substr(0, 10),
      endDate_: new Date().toISOString().substr(0, 10),
      switchEmployees: true,
      searchManpower: false,
      singleSelect: false,
      doNotProcess: false,
      dialogSave: false,
      strtMenu: false,
      endMenu_: false,
      loading: false,
      dialog: false,
      snack: false,
      employeeSchedSelect: [],
      manpowerSchedules: [],
      manpowerSelect: [],
      employeeSched: [],
      payrollGroup: [],
      dateArray: [],
      employees: [],
      emplSlct: [],
      dprtSlct: [],
      shftFile: [],
      dteArray: [],
      dprtment: [],
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
        { text: 'Status', value: 'workstatDescript', align: 'left', width: '200px', divider: true },
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
      employeeSchedHeader: [
        {
          text: 'Employee #',
          align: 'left',
          sortable: true,
          width: '120px',
          value: 'empl_cde',
          divider: true
        },
        { text: 'Last Name', value: 'last_nme', align: 'left', width: '120px', divider: true },
        { text: 'First Name', value: 'frst_nme', align: 'left', width: '120 px', divider: true },
        { text: 'Department', value: 'dprtment', align: 'left', width: '200px', divider: true }
      ],
      manpowerHeader: [
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
    strtDate (value) {
      if (value > this.endDate_) {
        this.snack = true
        this.snackText = 'Start date is greater than End Date'
        this.snackColor = 'error'
        this.doNotProcess = true
        this.strtDate = this.date
      }
      this.countDays()
      this.dprtSlct.length > 0 && this.retrieveEmployees()
    },
    endDate_ (value) {
      if (value < this.strtDate) {
        this.snack = true
        this.snackText = 'End Date must be greater than Start Date'
        this.snackColor = 'error'
        this.doNotProcess = true
        this.endDate_ = this.date
      }
      this.countDays()
      this.dprtSlct.length > 0 && this.retrieveEmployees()
    },
    payGroup (value) {
      console.log(value)
      if (this.dprtSlct.length > 0) {
        value && this.retrieveEmployees()
      }
    },
    switchEmployees (value) {
      value ? this.doNotProcess = true : this.doNotProcess = false
    },
    employeeSchedSelect (value) {
      return value.length > 0 ? this.retrieveEmployeeWithManpower() : ''
    },
    dprtSlct () {
      this.retrieveEmployees()
    }
  },
  methods: {
    setDtrDate () {
      this.primekey = this.propPrimekey
      this.strtDate = this.propStartDate
      this.endDate_ = this.propEndDate
    },
    countDays () {
      var count = moment(this.endDate_).diff(moment(this.strtDate), 'days') + 1
      this.endDateMessage = count + ' Day/s'
    },
    loadDepartment () {
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
    loadPayrollGroup () {
      this.$store.dispatch('retrievePayrollGroup', {
        primekey: this.primekey
      })
        .then(response => {
          this.payrollGroup = this.$store.getters.retrievePayrollGroup
          this.payrollGroup.push(
            {
              group_no: '00',
              descript: 'All'
            }
          )
        })
    },
    loadShiftFile () {
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
      const employeeCode = this.employeeSchedSelect.map(e => {
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
      if (this.doNotProcess) return
      this.loading = true
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        await new Promise((resolve, reject) => {
          axios.get(`u/personnel/manpower/employeecode/${this.primekey}/${this.strtDate}/${this.endDate_}`)
            .then(response => {
              this.employeeSched = response.data.employeeCode
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
      while (this.dprtSlct.length === 0) {
        this.employees = []
        return
      }
      this.loading = true
      const dprtSlct = this.dprtSlct.map(e => {
        return e.pos_code
      })
      this.dateArray.length = 0
      var startDate = new Date(this.strtDate)
      var endDate = new Date(this.endDate_)
      var currentDate = moment(startDate)
      var stopDate = moment(endDate)
      while (currentDate <= stopDate) {
        this.dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
        currentDate = moment(currentDate).add(1, 'days')
      }
      // let request = {
      //   primekey: this.primekey,
      //   dprtment: dprtSlct,
      //   group_no: this.payGroup.split(', ')
      // }
      let request = {
        primekey: this.primekey,
        coverage: this.dateArray,
        dprtment: dprtSlct,
        group_no: this.payGroup.split(', ')
      }
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.$store.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.post('u/personnel/manpower/employees/', request)
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
      if (this.emplSlct.length === 0) {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Please Select Employee'
        return
      }
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
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.$store.getters.loggedIn) {
          await new Promise((resolve, reject) => {
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
        }
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
    this.fromDirectories && this.setDtrDate()
    this.countDays()
    this.loadPayrollGroup()
    this.loadShiftFile()
    this.loadDepartment()
    this.$on('retrieveEmployeeWithManpower', () => {
      this.retrieveEmployeeWithManpower()
    })
    this.$root.$emit('closeDrawer', true)
    this.$root.$emit('moduleName', 'Personnel')
  }
}
</script>
