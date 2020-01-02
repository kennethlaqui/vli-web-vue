<template>
  <div>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="folder"
    :single-select="singleSelect"
    item-key="cntrl_no"
    show-select
    class="elevation-2"
    :loading="loading"
  >
    <template v-slot:top>
      <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
    </template>
    <template v-slot:item.day="{ item }">
      {{ getDay(item.day) }}
    </template>
    <template v-slot:item.descript="props">
    <v-edit-dialog
      :return-value.sync="folder.descript"
      @save="save"
      @cancel="cancel"
      @open="open"
      @close="close"
    > {{ props.item.descript }}
      <template v-slot:input>
        <v-select
          v-model="props.item.descript"
          :items="dayType"
          item-text="descript"
          item-value="cntrl_no"
          label="Choose Day Type"
          @change="getSelectedDayType(props)"
        ></v-select>
      </template>
    </v-edit-dialog>
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
  </v-data-table>
  <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
    {{ snackText }}
    <v-btn text @click="snack = false">Close</v-btn>
  </v-snackbar>
  </div>
</template>
<script>
import axios from 'axios'
var moment = require('moment')

export default {
  name: 'Folder',
  data () {
    return {
      snack: false,
      snackColor: '',
      snackText: '',
      loading: false,
      folder: [],
      dayType: [],
      dayTypeId: '',
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: 'Folder #',
          align: 'left',
          sortable: true,
          value: 'cntrl_no'
        },
        { text: 'DTR Date', value: 'dtr_date' },
        { text: 'Day', value: 'day' },
        { text: 'Day Type', value: 'descript' },
        { text: 'Created At', value: 'creat_dt' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      items: ['Foo', 'Bar', 'Fizz', 'Buzz']
    }
  },
  methods: {
    getFolder () {
      this.loading = true
      this.$store.dispatch('retrieveFolder', {
        primekey: localStorage.getItem('primekey'),
        cntrl_no: this.$route.params.cntrl_no
      })
        .then(response => {
          this.folder = this.$store.getters.retrieveFolder
          this.loading = false
        })
    },
    getDay (value) {
      return moment(value).format('dddd')
    },
    getDayType () {
      this.$store.dispatch('retrieveDayType', {
        primekey: localStorage.getItem('primekey')
      })
        .then(response => {
          this.dayType = this.$store.getters.retrieveDayType
        })
    },
    getSelectedDayType (value) {
      console.log(value)
      this.dayTypeCntrlNo = value.item.cntrl_no
      this.dayTypeId = value.item.day_type
    },
    save () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        axios.patch('u/personnel/directory/folder/daytype', {
          params: {
            primekey: localStorage.getItem('primekey'),
            cntrl_no: this.dayTypeCntrlNo,
            day_type: this.dayTypeId
          }
        })
          .then(response => {
            console.log(response)
          })
      } catch (error) {

      }
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Data saved'
    },
    cancel () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    open () {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    close () {
      console.log('Dialog closed')
    }
  },
  created () {
    this.getFolder()
    this.getDayType()
  }
}
</script>
