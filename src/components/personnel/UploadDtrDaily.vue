<template>
  <div>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-app-bar
            color="primary"
            dense
            dark
          >
          <v-toolbar-title>Verified Employees</v-toolbar-title>
          </v-app-bar>
        <v-data-table
          v-model="selected"
          :headers="headers_"
          :items="employees"
          item-key="empl_cde"
          :items-per-page="5"
          fixed-header
          height="250px"
          class="elavation-1"
        >
          <template v-slot:item="{ item }">
            <tr @click="getEmployeeCode(item)" :class="{'primary': item.empl_cde === selectRow}">
              <td>
                <v-layout>
                  <v-avatar size="36">
                      <img
                        :src="item.avatar__"
                        alt="John"
                      >
                    </v-avatar>
                </v-layout>
              </td>
              <td>
                <v-layout>
                  {{ item.empl_cde }}
                </v-layout>
              </td>
              <td>
                <v-layout>
                  {{ item.last_nme }}
                </v-layout>
              </td>
              <td>
                <v-layout>
                  {{ item.frst_nme }}
                </v-layout>
              </td>
              <td>
                <v-layout>
                  {{ item.midl_nme }}
                </v-layout>
              </td>
            </tr>
          </template>
        </v-data-table>
        </v-card>
      </v-col>
      <!-- bio -->
      <v-col cols="12" md="4">
        <v-card>
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
            <!-- <template v-slot:top>
              <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
            </template> -->
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.dtr_date }}</td>
                <td class="text-xs-center">{{ timeFrmt(item.dtr_time) }}</td>
                <td class="text-xs-center">{{ entryTyp(item.tran_typ) }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-avatar size="36">
            <img
              :src="employeeInfo.avatar__"
              alt="John"
            >
          </v-avatar>{{ employeeInfo.last_nme }}, {{ employeeInfo.frst_nme }} {{ employeeInfo.midl_nme }}</v-card-title>
        <v-card-subtitle>{{ employeeInfo.position }} - {{ rateType(employeeInfo.rate_typ) }}</v-card-subtitle>
        <v-card-actions><v-btn class="primary" @click="computeRegularHours()">Calculate</v-btn></v-card-actions>
        <v-divider></v-divider>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-if="clickedDone"
                  :items="whyNoDtr"
                  item-text="descript"
                  item-value="cntrl_no"
                  label="DTR Type"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-if="fromPresent"
                  :items="whyNoDtr"
                  label="Holidays"
                  outlined
                  dense
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-if="clickedDone"
                  v-model="todayShift"
                  label="Shift"
                  placeholder="Shift Schedule"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-if="clickedDone"
                  v-model="timeIn_c"
                  v-mask="maskTimeIn__"
                  label="In"
                  placeholder="First In"
                  outlined
                  dense
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-if="clickedDone"
                  v-model="timeOutc"
                  v-mask="maskTimeOut_"
                  label="Out"
                  placeholder="Last Out"
                  outlined
                  dense
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- hours output -->
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-if="clickedDone"
                  v-model="rglrHour"
                  label="Regular"
                  placeholder="Regular"
                  outlined
                  dense
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-if="clickedDone"
                  v-model="rglrOt__"
                  label="Overtime"
                  placeholder="Overtime"
                  outlined
                  dense
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-if="clickedDone"
                  v-model="rglrLate"
                  label="Late"
                  placeholder="Late"
                  outlined
                  dense
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-if="clickedDone"
                  v-model="rglrUndr"
                  label="Undertime"
                  placeholder="Undertime"
                  outlined
                  dense
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
    </v-row>
  </div>
    <!-- <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :single-select="singleSelect"
      item-key="name"
      show-select
      class="elevation-2"
    >
      <template v-slot:top>
        <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
      </template>
    </v-data-table> -->
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      route: this.$route.params.folder,
      maskTimeIn__: '##:##',
      maskTimeOut_: '##:##',
      singleSelect: false,
      clickedDone: false,
      fromPresent: false,
      loading: false,
      show: false,
      bol: true,
      employeeInfo: '',
      employeeOut: '',
      rglrHour: '',
      rglrLate: '',
      rglrUndr: '',
      rglrOt__: '',
      timeIn_f: '',
      timeOutf: '',
      selectRow: '',
      dtrDate: '',
      search: '',
      onThisDateBio: [],
      employeeShift: [],
      employees: [],
      selected: [],
      dayType: [],
      bio: [],
      headers_: [
        { text: 'Avatar', value: 'avatar__', sortable: false },
        {
          text: 'Employee ID',
          value: 'empl_cde',
          sortable: true
        },
        { text: 'Last Name', value: 'last_nme', sortable: true },
        { text: 'First Name', value: 'frst_nme', sortable: true },
        { text: 'Middle Name', value: 'midl_nme', sortable: true }
      ],
      bioHeadr: [
        {
          text: 'DTR Date',
          align: 'left',
          sortable: false,
          value: 'dtr_date'
        },
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
  computed: {
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
    rateType (rateType) {
      switch (rateType) {
        case 'M':
          return 'Monthly'
        case 'D':
          return 'Daily'
      }
    },
    entryTyp (entryTyp) {
      switch (entryTyp) {
        case '1':
          return 'In'
        case '2':
          return 'Out'
      }
    },
    timeFrmt (timeFrmt) {
      return timeFrmt.substr(0, 2) + ':' + timeFrmt.substr(2, 2)
    },
    getEmployeeCode (item) {
      this.selectRow = item.empl_cde
      this.$set(item, 'selected', true)
      this.employeeInfo = item
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
          this.rglrUndr = rglrUndr
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
      this.rglrHour = rglrHour
      // pm
      minutes1 = this.convertTimeToMinutes(employeeShift[0].cstrt_pm)
      minutes2 = this.convertTimeToMinutes(timeOut_)
      diffrnts = parseFloat(minutes2 - minutes1)
      hours___ = parseFloat(diffrnts / 60)
      rglrHour += hours___ + (diffrnts - (hours___ * 60)) / 60
      this.rglrHour = rglrHour
      if ((parseFloat(this.rglrHour + this.rglrLate)) > employeeShift[0].basichrs) {
        this.rglrHour = employeeShift[0].basichrs - this.rglrLate - this.rglrUndr
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
              this.clickedDone = true
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
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.bol) {
          await new Promise((resolve, reject) => {
            axios.get(`u/personnel/directory/folder/dtr/employees/${this.primekey}`)
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
    async retrieveBio (emplCode, dtrDate) {
      try {
        this.loading = true
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        await new Promise((resolve, reject) => {
          axios.get(`u/personnel/directory/folder/dtr/bio/${this.primekey}/${emplCode}/${this.dtrDate}`)
            .then(response => {
              this.bio = response.data
              resolve(response)
              this.onThisDateBio = this.bio.filter(obj => {
                return obj.dtr_date === this.dtrDate
              })
              if (this.onThisDateBio.length !== 0) {
                this.retrieveEmployeeShift(emplCode)
              } else {
                this.clickedDone = false
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
    this.retrieveEmployees()
    this.retrieveDtrDate()
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
