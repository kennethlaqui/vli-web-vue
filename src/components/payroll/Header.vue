<template>
  <div>
    <v-row>
      <v-col cols="12" md="12" lg="12">
      <v-data-table
        v-model="header"
        :headers="headers"
        :items="directories"
        item-key="empl_cde"
        class="elevation-2 table"
        :items-per-page="5"
        :search="search"
      >
      <template v-slot:item.action="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon exact @click="goToIncome(item)">
            <v-icon class="mr-2">mdi-exit-to-app</v-icon>
          </v-btn>
          </template>
          <span>Upload DTR</span>
        </v-tooltip>
      </template>
      </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      directories: [],
      header: '',
      headers: [
        {
          text: 'Directory #',
          align: 'center',
          sortable: false,
          value: 'cntrl_no'
        },
        { text: 'Year', value: 'year____', justifty: 'center' },
        { text: 'Month', value: 'month___', align: 'center' },
        { text: 'Part', value: 'part____', align: 'center' },
        { text: 'Payroll Group', value: 'descript', justifty: 'center' },
        { text: 'DTR Date Start', value: 'strt_dte', align: 'center' },
        { text: 'DTR Date End', value: 'last_dte', align: 'center' },
        { text: 'Actions', value: 'action', sortable: false, align: 'center' }
      ]
    }
  },
  methods: {
    goToIncome (item) {
      this.$router.push({ name: 'OneTimeIncome', params: { cntrl_no: item.cntrl_no } })
    },
    getDirectories () {
      this.$store.dispatch('retrieveDirectories', {
        primekey: this.primekey
      })
        .then(response => {
          this.directories = this.$store.getters.retrieveDirectories
        })
    }
  },
  created () {
    this.getDirectories()
  }
}
</script>
