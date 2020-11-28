<template>
  <div>

    <v-card>

      <v-app-bar
        color="primary"
        dense
        dark
        elevation="1"
      >

        <v-toolbar-title>Employees With Manpower</v-toolbar-title>

        <v-spacer></v-spacer>

          <!-- edit manpower -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                v-on="on"
              >
                <v-icon>
                  mdi-calendar-clock
                </v-icon>
              </v-btn>
            </template>
            <span>Edit Manpower</span>
          </v-tooltip>

          <!-- single select -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-switch v-on="on" v-model="singleSelect" class="pa-4 mt-5"></v-switch>
            </template>
            <span>Single Select</span>
          </v-tooltip>

          <!-- show employees table -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-switch v-on="on" v-model="showEmployees" class="pa-4 mt-5"></v-switch>
            </template>
            <span>Hide Employees</span>
          </v-tooltip>

      </v-app-bar>

        <!-- employees -->
        <v-data-table
          v-if="showEmployees"
          v-model="dt1Selected"
          :headers="headers_"
          :items="employees"
          item-key="empl_cde"
          :items-per-page="5"
          :single-select="singleSelect"
          show-select
          fixed-header
          height="300px"
          class="elavation-1 font-weight-light caption"
          @item-selected="singleItemSelect"
        />

    </v-card>
    <!-- bio log -->
    <!-- <v-card>
      <v-app-bar
        color="primary"
        dense
        dark
      >
      <v-toolbar-title>Logs: {{ this.dtrDate }}</v-toolbar-title>
      </v-app-bar>
      <v-data-table
        :headers="bioHeadr"
        :items="bio"
        :loading="loading"
        :items-per-page="5"
        fixed-header
        height="250px"
        class="elavation-1"
      >
        <template v-slot:top>
          <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
        </template>
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.empl_cde }}</td>
            <td>{{ item.dtr_date }}</td>
            <td>{{ timeFrmt(item.dtr_time) }}</td>
            <td>{{ entryTyp(item.tran_typ) }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card> -->
    <v-row v-if="dt1Selected.length > 0">

      <v-col cols="12">

        <v-card
          v-if="showDtrEntry"
        >

          <v-row
            class="py-3"
            justify="center"
          >

            <v-avatar
              class="profile"
              color="grey"
              size="100"
              rounded
            >

              <v-img :src="this.employee.avatar__" alt="john" />

            </v-avatar>

          </v-row>

          <!-- full name -->
          <v-row class="mt-n6">

            <v-col cols="12" md="12">

              <v-card-title class="justify-center font-weight-light">

                {{ employee.last_nme }} {{ employee.frst_nme }} {{ employee.midl_nme }}

              </v-card-title >

            </v-col>

          </v-row>

          <!-- position and rate type -->
          <v-row class="mt-n12">

            <v-col cols="12" md="12">

              <v-card-subtitle align="center">

                {{ employee.position }} - {{ rateType(employee.rate_typ) }}

              </v-card-subtitle>

            </v-col>

          </v-row>

          <!-- <v-card-actions>
            <v-btn class="primary" @click="computeRegularHours()">Calculate</v-btn>
            <v-btn class="primary" @click="retrieveBio()">Bio</v-btn>
          </v-card-actions> -->
          <v-divider></v-divider>

          <!-- dtr entry -->
          <v-form>

            <v-container>

              <v-row>

                <!-- dtr type -->
                <v-col cols="12" md="3">

                  <v-select
                    v-if="dataRetrieved"
                    :items="whyNoDtr"
                    item-text="descript"
                    item-value="cntrl_no"
                    label="DTR Type"
                    outlined
                    dense
                    rounded
                  />

                </v-col>

                <!-- shift -->
                <v-col cols="12" md="3">

                  <v-text-field
                    v-if="dataRetrieved"
                    v-model="todayShift"
                    label="Shift"
                    placeholder="Shift Schedule"
                    outlined
                    dense
                    readonly
                    rounded
                  />

                </v-col>

                <!-- Time-In -->
                <v-col cols="12" md="3">

                  <v-text-field
                    v-if="dataRetrieved"
                    v-model="timeIn_c"
                    v-mask="maskTimeIn__"
                    label="Time In"
                    placeholder="Time In"
                    outlined
                    dense
                    rounded
                  />

                </v-col>

                <!-- Time out -->
                <v-col cols="12" md="3">

                  <v-text-field
                    v-if="dataRetrieved"
                    v-model="timeOutc"
                    v-mask="maskTimeOut_"
                    label="Time Out"
                    placeholder="Time Out"
                    outlined
                    dense
                    rounded
                  />

                </v-col>

                <!-- <v-col cols="12" sm="6" md="3">

                  <v-select
                    v-if="fromPresent"
                    :items="whyNoDtr"
                    label="Holidays"
                    outlined
                    dense
                  />

                </v-col> -->

              </v-row>

              <!-- hours output -->
              <v-row>

                <v-col cols="12" md="3">

                  <!-- regular hours -->
                  <v-text-field
                    v-if="dataRetrieved"
                    v-model="rglrHour"
                    label="Regular"
                    placeholder="Regular"
                    outlined
                    dense
                    rounded
                  />

                </v-col>

                <v-col cols="12" md="3">

                  <!-- overtime -->
                  <v-text-field
                    v-if="dataRetrieved"
                    v-model="rglrOt__"
                    label="Overtime"
                    placeholder="Overtime"
                    outlined
                    dense
                    rounded
                  />

                </v-col>

                <v-col cols="12" md="3">

                  <!-- late -->
                  <v-text-field
                    v-if="dataRetrieved"
                    v-model="rglrLate"
                    label="Late"
                    placeholder="Late"
                    outlined
                    dense
                    rounded
                  />

                </v-col>

                <v-col cols="12" md="3">

                  <!-- undertime -->
                  <v-text-field
                    v-if="dataRetrieved"
                    v-model="rglrUndr"
                    label="Undertime"
                    placeholder="Undertime"
                    outlined
                    dense
                    rounded
                  />

                </v-col>

              </v-row>

            </v-container>

          </v-form>

          <v-card-actions>

            <v-spacer></v-spacer>

            <v-btn text>Save</v-btn>

            <!-- <v-btn v-if="!create" @click.stop="dialog = true" text>Update</v-btn> -->

            <v-btn text>Cancel</v-btn>

          </v-card-actions>

          <!-- <v-snackbar v-model="snack" :timeout="snackTimeOut" :color="snackColor">

              <h3>{{ snackText }}</h3>

            <v-btn text @click="snack = false">Close</v-btn>

          </v-snackbar> -->

        </v-card>

      </v-col>

    </v-row>

  </div>

</template>

<script>
// import { bus } from '@/main.js'
import axios from 'axios'
import { VbuildRateTypeFn } from '@/util/build'

export default {
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      route: this.$route.params.folder,
      maskTimeIn__: '##:##',
      maskTimeOut_: '##:##',
      temporaryData: false,
      showEmployees: true,
      showDtrEntry: true,
      singleSelect: true,
      dataRetrieved: false,
      fromPresent: false,
      loading: false,
      show: false,
      bol: true,
      employeeInfo: '',
      employeeOut: '',
      snackColor: '',
      snackText: '',
      employee: '',
      rglrHour: '',
      rglrLate: '',
      rglrUndr: '',
      rglrOt__: '',
      timeIn_f: '',
      timeOutf: '',
      selectRow: '',
      dtrDate: '',
      search: '',
      snackTimeOut: 3000,
      payGroup: [],
      emplCodeArray: [],
      onThisDateBio: [],
      employeeShift: [],
      employees: [],
      dt1Selected: [],
      dayType: [],
      bio: [],
      headers_: [
        {
          text: 'System ID',
          value: 'empl_cde',
          width: '180px',
          sortable: true
        },
        { text: 'Last Name', value: 'last_nme', width: '180px', sortable: true },
        { text: 'First Name', value: 'frst_nme', width: '180px', sortable: true },
        { text: 'Middle Name', value: 'midl_nme', width: '180px', sortable: true },
        { text: 'Division', value: 'division', width: '180px', sortable: true },
        { text: 'Department', value: 'department', width: '180px', sortable: true },
        { text: 'Section', value: 'section', width: '180px', sortable: true },
        { text: 'Position', value: 'position', width: '180px', sortable: true }
      ],
      bioHeadr: [
        {
          text: 'Employee ID',
          align: 'left',
          sortable: true,
          value: 'empl_cde'
        },
        { text: 'Date', align: 'left', sortable: true, value: 'dtr_date' },
        { text: 'Time', value: 'dtr_time' },
        { text: 'Description', value: 'tran_typ' }
      ],
      whyNoDtr: [
        {
          cntrl_no: 0,
          descript: 'Present'
        },
        {
          cntrl_no: 'R',
          descript: 'Restday'
        },
        {
          cntrl_no: 'A',
          descript: 'Absent'
        },
        {
          cntrl_no: 'H',
          descript: 'Holidays'
        },
        {
          cntrl_no: 'P',
          descript: 'Paid Holiday'
        }
      ]
    }
  },
  watch: {
    dt1Selected () {
      this.dt1Selected.length > 1 ? this.showDtrEntry = false : this.showDtrEntry = true
      this.dt1Selected.length > 1 ? this.employee = null : this.temporaryData = true
      this.dt1Selected.length === 1 ? this.retrieveBio() : this.temporaryData = true
    }
  },
  computed: {
    selectedRow () {
      const selectRow = this.selected[0]
      return selectRow ? `${selectRow.empl_cde}` : 'no data selected'
    },
    timeIn_c: {
      get: function () {
        const timeIn__ = this.onThisDateBio.map(e => ({
          dtr_time: `${this.timeFrmt(e.dtr_time)}`
        }))
        // console.log(firstIn[0].dtr_time)
        return timeIn__[0].dtr_time
      },
      set: function (value) {
        this.timeIn_f = value
      }
    },
    timeOutc: {
      get: function () {
        const timeOut_ = this.onThisDateBio.map(e => ({
          dtr_time: `${this.timeFrmt(e.dtr_time)}`
        }))
        const timeOutLength = this.onThisDateBio.length - 1
        return timeOut_[timeOutLength].dtr_time
      },
      set: function (value) {
        this.timeOutf = value
      }
    },
    todayShift () {
      const shiftSch = this.employeeShift.map(e => ({
        shift: `${e.shft_cde.trim()}: ${e.s1_in___} - ${e.s1_out__}`
      }))
      return shiftSch[0].shift
    }
  },
  methods: {
    clearTextField () {
      this.rglrHour = null
      this.rglrLate = null
      this.rglrUndr = null
      this.rglrOt__ = null
    },
    singleItemSelect (item) {
      this.employee = item.item
    },
    rateType (rateType) {
      return VbuildRateTypeFn(rateType)
    },
    entryTyp (entryTyp) {
      switch (entryTyp) {
        case '1':
          return 'In'
        case '2':
          return 'Out'
        default:
          return 'Unknown'
      }
    },
    timeFrmt (timeFrmt) {
      return timeFrmt.substr(0, 2) + ':' + timeFrmt.substr(2, 2)
    },
    getEmployeeCode (item) {
      // this.selectRow = item.empl_cde
      // this.$set(item, 'selected', true)
      // this.employeeInfo = item
      this.retrieveBio(item.empl_cde)
    },
    convertTimeToMinutes (timeFrtA) {
      if (timeFrtA.indexOf(':') < 0) {
        const mm = parseFloat(timeFrtA.substr(0, 2) * 60) + parseFloat(timeFrtA.substr(2, 2))
        return mm
      } else {
        const mm = parseFloat(timeFrtA.substr(0, 2) * 60) + parseFloat(timeFrtA.substr(2, 4))
        return mm
      }
    },
    computeRegularHours () {
      let timeIn__
      let timeOut_
      let minutes1
      let minutes2
      let diffrnts
      let hours___
      let rglrHour
      let rglrLate
      let rglrUndr
      // init variables
      this.rglrHour = ''
      this.rglrLate = ''
      this.rglrOt__ = ''
      this.rglrUndr = ''
      //  check if manually input
      if (this.timeIn_f !== '') {
        timeIn__ = this.timeIn_f.substr(0, 2) + '' + this.timeIn_f.substr(3, 4)
        timeOut_ = this.timeOutc.substr(0, 2) + '' + this.timeOutc.substr(3, 4)
      } else {
        timeIn__ = this.timeIn_c.substr(0, 2) + '' + this.timeIn_c.substr(3, 4)
        timeOut_ = this.timeOutc.substr(0, 2) + '' + this.timeOutc.substr(3, 4)
      }
      if (this.timeOutf !== '') {
        if (this.timeIn_f !== '') {
          timeIn__ = this.timeIn_f.substr(0, 2) + '' + this.timeIn_f.substr(3, 4)
        }
        timeOut_ = this.timeOutf.substr(0, 2) + '' + this.timeOutf.substr(3, 4)
      }
      // init data
      const employeeShift = this.employeeShift.map(e => ({
        cstrt_hr: `${e.cstrt_hr}`,
        clast_am: `${e.clast_am}`,
        clast_pm: `${e.clast_pm}`,
        cstrt_pm: `${e.cstrt_pm}`,
        with_brk: `${e.with_brk}`,
        basichrs: `${e.basichrs}`,
        ot_strt_: `${e.ot_strt_}`
      }))
      // compute late
      switch (true) {
        case timeIn__ > employeeShift[0].cstrt_hr:
          minutes1 = this.convertTimeToMinutes(timeIn__)
          minutes2 = this.convertTimeToMinutes(employeeShift[0].cstrt_hr)
          diffrnts = parseFloat(minutes1 - minutes2)
          hours___ = parseFloat(diffrnts / 60)
          rglrLate = hours___ + (diffrnts - (hours___ * 60)) / 60
          this.rglrLate = rglrLate
      }
      // compute undertime
      switch (true) {
        case timeOut_ < this.timeFrmt(employeeShift[0].clast_pm):
          minutes1 = this.convertTimeToMinutes(employeeShift[0].clast_pm)
          minutes2 = this.convertTimeToMinutes(timeOut_)
          diffrnts = parseFloat(minutes1 - minutes2)
          hours___ = parseFloat(diffrnts / 60)
          rglrUndr = hours___ + (diffrnts - (hours___ * 60)) / 60
          this.rglrUndr = rglrUndr.toFixed(2)
      }
      // compute regular hours
      if (timeIn__ < employeeShift[0].cstrt_hr) {
        timeIn__ = employeeShift[0].cstrt_hr
      }
      //  am
      minutes1 = this.convertTimeToMinutes(timeIn__)
      minutes2 = this.convertTimeToMinutes(employeeShift[0].clast_am)
      diffrnts = parseFloat(minutes2 - minutes1)
      hours___ = parseFloat(diffrnts / 60)
      rglrHour = hours___ + (diffrnts - (hours___ * 60)) / 60
      this.rglrHour = rglrHour.toFixed(2)
      // pm
      minutes1 = this.convertTimeToMinutes(employeeShift[0].cstrt_pm)
      minutes2 = this.convertTimeToMinutes(timeOut_)
      diffrnts = parseFloat(minutes2 - minutes1)
      hours___ = parseFloat(diffrnts / 60)
      rglrHour += hours___ + (diffrnts - (hours___ * 60)) / 60
      this.rglrHour = rglrHour.toFixed(2)
      if ((parseFloat(this.rglrHour + this.rglrLate)) > employeeShift[0].basichrs) {
        this.rglrHour = employeeShift[0].basichrs - this.rglrLate - this.rglrUndr.toFixed(2)
      }
      // compute overtime
      if (timeOut_ > employeeShift[0].ot_strt_) {
        minutes1 = this.convertTimeToMinutes(timeOut_)
        minutes2 = this.convertTimeToMinutes(employeeShift[0].ot_strt_)
        diffrnts = parseFloat(minutes1 - minutes2)
        hours___ = parseFloat(diffrnts / 60)
        this.rglrOt__ = hours___.toFixed(2)
      }
    },
    retrieveDayType () {
      // display all day type
      this.$store.dispatch('retrieveDayType', {
        primekey: localStorage.getItem('primekey')
      })
        .then(response => {
          this.dayType = this.$store.getters.retrieveDayType
        })
    },
    async retrieveEmployeeShift (emplCode) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        await new Promise((resolve, reject) => {
          axios.get(`u/personne/directory/folder/dtr/shift/${this.primekey}/${emplCode}/${this.dtrDate}`)
            .then(response => {
              this.employeeShift = response.data
              resolve(response)
              this.dataRetrieved = true
              this.computeRegularHours()
            })
            .catch(error => {
              reject(error)
            })
        })
      } catch (error) {

      }
    },
    async retrieveEmployees () {
      let request = {
        primekey: this.primekey,
        coverage: ['2019-11-01'],
        group_no: ['01']
      }
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.$store.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.post('u/personnel/directory/folder/dtr/employees/', request)
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
    async retrieveDtrDate () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        await new Promise((resolve, reject) => {
          axios.get(`u/personnel/directory/folder/dtr/date/${this.primekey}/${this.$route.params.folder}`)
            .then(response => {
              this.dtrDate = response.data
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      } catch (error) {
      }
    },
    async retrieveBio () {
      try {
        this.loading = true
        // time in / out
        const emplCodeArray = this.dt1Selected.map((item) => {
          return item.empl_cde
        })
        let request = {
          primekey: this.primekey,
          empl_cde: emplCodeArray,
          dtr_date: this.dtrDate
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        await new Promise((resolve, reject) => {
          axios.post('u/personnel/directory/folder/dtr/bio/', request)
            .then(response => {
              this.bio = response.data
              resolve(response)
              // check if bio exist
              if (this.bio.length === 0) {
                this.clearTextField()
                this.dataRetrieved = true
              } else {
                // retrieve only bion based on dtr date
                this.onThisDateBio = this.bio.filter(obj => {
                  return obj.dtr_date === this.dtrDate
                })
                if (this.onThisDateBio.length !== 0) {
                  // accept first element only
                  this.retrieveEmployeeShift(emplCodeArray[0])
                } else {
                  this.dataRetrieved = true
                }
              }
              this.loading = false
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
    this.retrieveDtrDate()
    this.retrieveEmployees()
    this.retrieveDayType()
    this.$root.$emit('closeDrawer', true)
  }
}
</script>
<style scoped>
  table.v-table tbody td {
    font-size: 1px !important;
  }
</style>
