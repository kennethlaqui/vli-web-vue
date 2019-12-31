<template>
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
  </v-data-table>
</template>
<script>
var moment = require('moment')
export default {
  data () {
    return {
      loading: false,
      folder: [],
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
        { text: 'Created At', value: 'creat_dt' }
      ]
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
    }
  },
  created () {
    this.getFolder()
  }
}
</script>
