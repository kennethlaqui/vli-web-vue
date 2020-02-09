<template>
  <v-app>
    <div>
      <v-row>
        <v-col cols="12" md="12" lg="12">
          <v-data-table
            v-model="selected"
            :headers="headers0"
            :items="employees"
            item-key="empl_cde"
            class="elevation-2"
            :items-per-page="5"
            :search="search"
          >
            <template v-slot:top>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
                :full-width="true"
                dense
              ></v-text-field>
            </template>
            <template v-slot:item="{ item }">
              <tr @click="getEmployeeCode(item)" :class="{'primary': item.empl_cde === selectRow}">
                <td>
                  <v-layout justify-center>
                    <v-avatar size="36">
                        <img
                          :src="item.avatar__"
                          alt="John"
                        >
                      </v-avatar>
                  </v-layout>
                </td>
                <td>
                  <v-layout justify-center>
                    {{ item.empl_cde }}
                  </v-layout>
                </td>
                <td>
                  <v-layout justify-center>
                    {{ item.last_nme.trim() }}
                  </v-layout>
                </td>
                <td>
                  <v-layout justify-center>
                    {{ item.frst_nme.trim() }}
                  </v-layout>
                </td>
                <td>
                  <v-layout justify-center>
                    {{ item.midl_nme.trim() }}
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
        <v-col cols="12" md="3" lg="3">
          <v-data-table
            :headers="bioHeaders"
            :items="bio"
            class="elevation-2"
            :loading="loading"
            :items-per-page="5"
          >
            <!-- <template v-slot:top>
              <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
            </template> -->
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.dtr_date }}</td>
                <td class="text-xs-center">{{ timeFormat(item.dtr_time) }}</td>
                <td class="text-xs-center">{{ entryType(item.tran_typ) }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      <v-col cols="12" md="9" lg="9">
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
                    v-model="firstTimeIn"
                    v-mask="maskTimeIn"
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
                    v-model="lastTimeOut"
                    v-mask="maskTimeIn"
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
                    v-model="regularHour"
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
                    v-model="regularOt"
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
                    v-model="regularLate"
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
                    v-model="regularUnderTime"
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
  </v-app>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      route: this.$route.params.folder,
      singleSelect: false,
      loading: false,
      clickedDone: false,
      bol: true,
      show: false,
      fromPresent: false,
      selectRow: '',
      testSet: '',
      onThisDateBio: [],
      employeeShift: [],
      dayType: [],
      employeeInfo: '',
      employeeOut: '',
      regularHour: '',
      regularLate: '',
      regularUnderTime: '',
      regularOt: '',
      newValueTimeIn: '',
      newValueTimeOut: '',
      maskTimeIn: '##:##',
      maskTimeOut: '##:##',
      search: '',
      bio: [],
      selected: [],
      employees: [],
      dtrDate: '',
      headers: [
        { text: 'Image', value: 'avatar__', align: 'center', sortable: false },
        {
          text: 'Employee ID',
          align: 'center',
          sortable: false,
          value: 'empl_cde'
        },
        { text: 'Last Name', value: 'last_nme', justifty: 'center' },
        { text: 'First Name', value: 'frst_nme', align: 'center' },
        { text: 'Middle Name', value: 'midl_nme', align: 'center' }
      ],
      bioHeaders: [
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
    headers0 () {
      return this.headers.map(header => Object.assign({}, header, { fixed: false }))
    },
    firstTimeIn: {
      get: function () {
        const firstIn = this.onThisDateBio.map(e => ({
          dtr_time: `${this.timeFormat(e.dtr_time)}`
        }))
        // console.log(firstIn[0].dtr_time)
        return firstIn[0].dtr_time
      },
      set: function (value) {
        this.newValueTimeIn = value
      }
    },
    lastTimeOut: {
      get: function () {
        const lastOut = this.onThisDateBio.map(e => ({
          dtr_time: `${this.timeFormat(e.dtr_time)}`
        }))
        const lastOutLength = this.onThisDateBio.length - 1
        return lastOut[lastOutLength].dtr_time
      },
      set: function (value) {
        this.newValueTimeOut = value
      }
    },
    todayShift () {
      const shift = this.employeeShift.map(e => ({
        shift: `${e.shft_cde.trim()}: ${e.s1_in___} - ${e.s1_out__}`
      }))
      return shift[0].shift
    }
    // comRegularHours () {
    //   return this.regularHours
    // },
    // comRegularLate () {
    //   return this.regularLate
    // }
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
    entryType (entryType) {
      switch (entryType) {
        case '1':
          return 'In'
        case '2':
          return 'Out'
      }
    },
    timeFormat (time) {
      return time.substr(0, 2) + ':' + time.substr(2, 2)
    },
    getEmployeeCode (item) {
      this.selectRow = item.empl_cde
      this.$set(item, 'selected', true)
      this.employeeInfo = item
      this.retrieveBio(item.empl_cde.trim())
    },
    convertTimeToMinutes (time) {
      if (time.indexOf(':') < 0) {
        const mm = parseFloat(time.substr(0, 2) * 60) + parseFloat(time.substr(2, 2))
        return mm
      } else {
        const mm = parseFloat(time.substr(0, 2) * 60) + parseFloat(time.substr(2, 4))
        return mm
      }
    },
    computeRegularHours () {
      let timeIn
      let timeOut
      let mm1
      let mm2
      let diff
      let hh
      let regularHour
      let regularLate
      let regularUnderTime
      // init variables
      this.regularHour = ''
      this.regularLate = ''
      this.regularOt = ''
      this.regularUnderTime = ''
      //  check if manually input
      if (this.newValueTimeIn !== '') {
        timeIn = this.newValueTimeIn.substr(0, 2) + '' + this.newValueTimeIn.substr(3, 4)
        timeOut = this.lastTimeOut.substr(0, 2) + '' + this.lastTimeOut.substr(3, 4)
      } else {
        timeIn = this.firstTimeIn.substr(0, 2) + '' + this.firstTimeIn.substr(3, 4)
        timeOut = this.lastTimeOut.substr(0, 2) + '' + this.lastTimeOut.substr(3, 4)
      }
      if (this.newValueTimeOut !== '') {
        if (this.newValueTimeIn !== '') {
          timeIn = this.newValueTimeIn.substr(0, 2) + '' + this.newValueTimeIn.substr(3, 4)
        }
        timeOut = this.newValueTimeOut.substr(0, 2) + '' + this.newValueTimeOut.substr(3, 4)
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
        case timeIn > employeeShift[0].cstrt_hr:
          mm1 = this.convertTimeToMinutes(timeIn)
          mm2 = this.convertTimeToMinutes(employeeShift[0].cstrt_hr)
          diff = parseFloat(mm1 - mm2)
          hh = parseFloat(diff / 60)
          regularLate = hh + (diff - (hh * 60)) / 60
          this.regularLate = regularLate
      }
      // compute undertime
      switch (true) {
        case timeOut < this.timeFormat(employeeShift[0].clast_pm):
          mm1 = this.convertTimeToMinutes(employeeShift[0].clast_pm)
          mm2 = this.convertTimeToMinutes(timeOut)
          diff = parseFloat(mm1 - mm2)
          hh = parseFloat(diff / 60)
          regularUnderTime = hh + (diff - (hh * 60)) / 60
          this.regularUnderTime = regularUnderTime
      }
      // compute regular hours
      if (timeIn < employeeShift[0].cstrt_hr) {
        timeIn = employeeShift[0].cstrt_hr
      }
      //  am
      mm1 = this.convertTimeToMinutes(timeIn)
      mm2 = this.convertTimeToMinutes(employeeShift[0].clast_am)
      diff = parseFloat(mm2 - mm1)
      hh = parseFloat(diff / 60)
      regularHour = hh + (diff - (hh * 60)) / 60
      this.regularHour = regularHour
      // pm
      mm1 = this.convertTimeToMinutes(employeeShift[0].cstrt_pm)
      mm2 = this.convertTimeToMinutes(timeOut)
      diff = parseFloat(mm2 - mm1)
      hh = parseFloat(diff / 60)
      regularHour += hh + (diff - (hh * 60)) / 60
      this.regularHour = regularHour
      if ((parseFloat(this.regularHour + this.regularLate)) > employeeShift[0].basichrs) {
        this.regularHour = employeeShift[0].basichrs - this.regularLate - this.regularUnderTime
      }
      // compute overtime
      if (timeOut > employeeShift[0].ot_strt_) {
        mm1 = this.convertTimeToMinutes(timeOut)
        mm2 = this.convertTimeToMinutes(employeeShift[0].ot_strt_)
        diff = parseFloat(mm1 - mm2)
        hh = parseFloat(diff / 60)
        this.regularOt = hh.toFixed(2)
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
          axios.get(`u/personne/directory/folder/uploaddtremployee/shift/${this.primekey}/${emplCode}/${this.dtrDate}`)
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
    },
    async retrieveDtrDate () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        await new Promise((resolve, reject) => {
          axios.get(`u/personnel/directory/folder/uploaddtremployee/dtrdate/${this.primekey}/${this.$route.params.folder}`)
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
          axios.get(`u/personnel/directory/folder/uploaddtremployee/bio/${this.primekey}/${emplCode}/${this.dtrDate}`)
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
  }
}
</script>
