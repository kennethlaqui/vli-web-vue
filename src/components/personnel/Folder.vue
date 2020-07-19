<template>

  <div>

    <v-card>

      <v-app-bar
        color="primary"
        dense
        dark
        elevation="1"
      >

        <!-- back arrow button -->
        <v-tooltip bottom>

          <template v-slot:activator="{ on }">

            <v-btn v-if="$routerHistory.hasPrevious()" :to="{ path: $routerHistory.previous().path }" v-on="on" icon exact>

              <v-icon>mdi-arrow-left</v-icon>

            </v-btn>

          </template>

          <span>Directory</span>

        </v-tooltip>

        <!-- title bar -->
        <v-toolbar-title>DTR Folder</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- create folder -->
        <v-btn
          icon
          @click="createFolder"
        >

          <v-icon>

            mdi-folder-multiple-plus-outline

          </v-icon>

        </v-btn>

        <!-- delete folder -->
        <v-btn
          icon
          @click="deleteFolder"
        >

          <v-icon>

            mdi-delete-alert-outline

          </v-icon>

        </v-btn>

        <!-- switch to employees -->
        <v-tooltip bottom>

          <template v-slot:activator="{ on }">

            <v-btn :to="{ name: 'switchEmployees' }" v-on="on" icon exact>

              <v-icon>mdi-sync</v-icon>

            </v-btn>

          </template>

          <span>Switch to Employees</span>

        </v-tooltip>

        <v-btn icon>

          <v-icon>mdi-dots-vertical</v-icon>

        </v-btn>

      </v-app-bar>

      <!-- folder data table -->
      <v-data-table
        v-model="dt1Selected"
        :headers="headers"
        :items="folder"
        :single-select="singleSelect"
        item-key="cntrl_no"
        show-select
        class="elevation-1 font-weight-light caption"
        :loading="loading"
        :items-per-page="15"
        :search="search"
        fixed-header
        height="500px"
      >

        <!-- build day -->
        <template v-slot:item.day="{ item }">

          {{ buildDayType(item.day) }}

        </template>

        <!-- build day type -->
        <template v-slot:item.descript="{ item }">

          {{ item.descript }}

        </template>

        <!-- action button -->
        <template v-slot:item.action="{ item }">

          <v-tooltip bottom>

            <template v-slot:activator="{ on }">

              <v-btn v-on="on" icon exact @click="editItem(item)">

                <v-icon>mdi-folder-upload-outline</v-icon>

              </v-btn>

            </template>

            <span>Upload DTR Folder</span>

          </v-tooltip>

        </template>

      </v-data-table>

    </v-card>

  </div>

</template>

<script>
import axios from 'axios'
import { Form } from 'vform'
var moment = require('moment')

export default {
  name: 'Folder',
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      userName: '',
      search: '',
      snackColor: '',
      snackText: '',
      folder: [],
      dayType: [],
      dt1Selected: [],
      directoryDate: [],
      dateArray: [],
      loading: false,
      snack: false,
      singleSelect: false,
      form: new Form({
        primekey: localStorage.getItem('primekey'),
        cntrl_no: '',
        day_type: ''
      }),
      headers: [
        {
          text: 'Folder #',
          align: 'left',
          sortable: true,
          value: 'cntrl_no'
        },
        { text: 'DTR Date', value: 'dtr_date', sortable: true },
        { text: 'Day', value: 'day' },
        { text: 'Day Type', value: 'descript' },
        { text: 'Processed', value: 'ttl_empl' },
        { text: 'Created At', value: 'creat_dt' },
        { text: 'Created By', value: 'creat_by' },
        { text: 'Actions', value: 'action', sortable: false, align: 'center' }
      ]
    }
  },
  methods: {
    async deleteFolder () {
      try {
        const filteredFolders = this.dt1Selected.filter(e => {
          return e.ttl_empl === 0
        })
        const folders = filteredFolders.map(e => {
          return e.cntrl_no
        })

        let request = {
          primekey: this.primekey,
          cntrl_no: folders
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        await new Promise((resolve, reject) => {
          axios.post('u/personne/directory/folder/delete/', request)
            .then(response => {
              resolve(response)
              this.retrieveFolder()
            })
            .catch(error => {
              reject(error)
            })
        })
      } catch (error) {
      }
    },
    createFolder () {
      this.$store.dispatch('retrieveDirectoryDate', {
        primekey: this.primekey,
        cntrl_no: this.$route.params.cntrl_no
      })
        .then(response => {
          this.directoryDate = this.$store.getters.retrieveDirectoryDate
          const dates = this.directoryDate.map(e => ({
            strt_dte: `${e.strt_dte}`,
            last_dte: `${e.last_dte}`
          }))
          let startDate = new Date(dates[0].strt_dte)
          let endDate = new Date(dates[0].last_dte)
          let currentDate = moment(startDate)
          let stopDate = moment(endDate)
          while (currentDate <= stopDate) {
            this.dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
            currentDate = moment(currentDate).add(1, 'days')
          }
          return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
            axios.post('u/personnel/directory/create/folder', {
              dateArray: this.dateArray,
              primekey: this.primekey,
              cntrl_no: this.$route.params.cntrl_no,
              userName: this.$store.getters.retrieveUser.user_nme
            })
              .then(response => {
                resolve(response)
                this.retrieveFolder()
              })
              .catch(error => {
                reject(error)
              })
          })
        })
    },
    retrieveFolder () {
      // accept parameter for retrieve
      this.loading = true
      this.dt1Selected = []
      this.$store.dispatch('retrieveFolder', {
        primekey: this.primekey,
        cntrl_no: this.$route.params.cntrl_no
      })
        .then(response => {
          this.folder = this.$store.getters.retrieveFolder
          this.loading = false
        })
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
    async saveDayType () {
      // update day type of folder
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.$store.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            this.form.patch('u/personnel/directory/folder/daytype', {
            })
              .then(response => {
                resolve(response)
                this.$emit('retrieveFolder')
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
    buildDayType (value) {
      return moment(value).format('dddd')
    },
    getSelectedDayType (value) {
      this.form.cntrl_no = value.cntrl_no
      this.form.day_type = value.day_type
    },
    cancelDayType () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    openDayType () {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    closeDayType () {
      this.saveDayType()
    },
    editItem (item) {
      this.$router.push({ name: 'uploadDtr', params: { cntrl_no: this.$route.params.cntrl_no, folder: item.cntrl_no } })
    }
  },
  created () {
    this.retrieveFolder()
    this.retrieveDayType()
    this.$on('retrieveFolder', () => {
      this.retrieveFolder()
    })
    this.userName = this.$store.getters.retrieveUser.user_nme
  }
}
</script>
