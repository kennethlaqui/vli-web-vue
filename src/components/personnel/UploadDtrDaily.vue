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
          <v-card-title>{{ employeeInfo.last_nme }}, {{ employeeInfo.frst_nme }} {{ employeeInfo.midl_nme }}</v-card-title>
          <v-card-subtitle>{{ employeeInfo.position }} - {{ rateType(employeeInfo.rate_typ) }}</v-card-subtitle>
          <v-divider></v-divider>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-if="clickedDone"
                    v-model="shiftSchedule"
                    label="Shift"
                    placeholder="Shift Schedule"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-if="clickedDone"
                    v-model="firstTimeIn"
                    label="In"
                    placeholder="First In"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-if="clickedDone"
                    v-model="lastTimeOut"
                    label="Out"
                    placeholder="Last Out"
                    outlined
                    dense
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
      selectRow: '',
      onThisDateBio: [],
      onThisDateBio2: [],
      employeeInfo: '',
      employeeOut: '',
      shiftSchedule: '07:30 - 19:30',
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
      ]
    }
  },
  computed: {
    headers0 () {
      return this.headers.map(header => Object.assign({}, header, { fixed: false }))
    },
    uploaded () {
      return 'Not yet'
    },
    firstTimeIn () {
      const firstIn = this.onThisDateBio.map(e => ({
        dtr_time: `${this.timeFormat(e.dtr_time)}`
      }))
      return firstIn[0].dtr_time
    },
    lastTimeOut () {
      const lastOut = this.onThisDateBio.map(e => ({
        dtr_time: `${this.timeFormat(e.dtr_time)}`
      }))
      const lastOutLength = this.onThisDateBio.length - 1
      return lastOut[lastOutLength].dtr_time
    }
    // emplCode () {
    //   const selectedRow = this.selected[0]
    //   return selectedRow ? selectedRow.empl_cde : ''
    //   // return this.empl_cde ? selectedRow.empl_cde
    //   // return  selectedRow ? selectedRow.empl_cde
    //   // console.log(selectedRow)
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
      return time.slice(0, 2) + ':' + time.slice(2, 4)
    },
    getEmployeeCode (item) {
      this.selectRow = item.empl_cde
      this.$set(item, 'selected', true)
      this.employeeInfo = item
      this.retrieveBio(item.empl_cde.trim())
    },
    retrieveShift () {

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
              this.onThisDateBio = this.bio.filter(obj => {
                return obj.dtr_date === this.dtrDate
              })
              this.onThisDateBio2 = this.onThisDateBio
              this.clickedDone = true
              resolve(response)
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
  }
}
</script>
