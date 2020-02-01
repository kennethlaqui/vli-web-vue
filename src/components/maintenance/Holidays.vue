<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>
<script>
export default {
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      holidays: [],
      headers: [
        {
          text: 'Employee ID',
          align: 'left',
          sortable: true,
          value: 'empl_cde'
        },
        { text: 'Last Name', value: 'last_nme' },
        { text: 'First Name', value: 'frst_nme' },
        { text: 'Payroll Group', value: 'paygroupDescript' },
        { text: 'Status', value: 'workstatDescript' },
        { text: 'Position', value: 'position', sortable: false, align: 'center' },
        { text: 'Division', value: 'division' },
        { text: 'Department', value: 'department' },
        { text: 'Section', value: 'section' }
      ]
    }
  }
}
</script>
