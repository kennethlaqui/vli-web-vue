export const PayrollStatus = {
  data () {
    return {
      status: 1
    }
  },
  methods: {
    payrollStatus: function (status) {
      switch (this.status) {
        case '0':
          return 'Initial Value'

        case '1':
          return 'Copied DTR / Bonus Searched / Merged'

        case '2':
          return 'Payroll Computed'

        case '3':
          return 'Payroll Sent To Bank'

        case 'A':
          return 'Last Pay Computed'

        case 'B':
          return '13th Month Computed'
      }
    }
  }
}
