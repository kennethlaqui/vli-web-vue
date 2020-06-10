<template>
  <div>
    <v-container
      fluid
    >
      <v-row>
        <v-col
        cols="12"
        align="end"
        >
          <v-btn
            small
            @click="addNewSalary"
          >
            Add New
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="salaryFile"
        class="elevation-1"
      >
      <!-- data -->
      <!-- <template v-slot:item="{ item, index }">
        <tr>
          <td :value="index">{{ item.}}</td>
        </tr>
      </template> -->
      <!-- position -->
      <template v-slot:item.pos_code="{ item }">
        <v-edit-dialog
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        > {{ buildPosition(item.pos_code) }}
          <template v-slot:input>
            <v-select
              v-model="item.pos_code"
              :items="position"
              item-text="descript"
              item-value="pos_code"
              @change="getSelectedValue(item)"
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>
      <!-- rate type -->
      <template v-slot:item.rate_typ="{ item }">
        <v-edit-dialog
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        > {{ buildRateType(item.rate_typ) }}
          <template v-slot:input>
            <v-select
              v-model="item.rate_typ"
              :items="rateType"
              item-text="text"
              item-value="value"
              @change="getSelectedValue(item)"
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>
      <!-- edit monthly rate -->
      <template v-slot:item.mrate___="{ item }">
        <v-edit-dialog
          v-model="item.mrate___"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="closeMonthlyRate(item)"
        >
          {{ toNumber(item.mrate___) }}
          <template v-slot:input>
            <div class="mt-4 title">Monthly Rate</div>
          </template>
          <template v-slot:input>
            <v-text-field
              v-model="item.mrate___"
              label="Edit"
              single-line
              counter
              autofocus
              clearable
              :disabled="disabled"
              @change="computeDailyHourlyRateMonthly(item.mrate___)"
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <!-- daily rate -->
      <template v-slot:item.drate___="{ item }">
        <v-edit-dialog
          v-model="item.drate___"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="closeDailyRate(item)"
        >
          {{ toNumber(item.drate___) }}
          <template v-slot:input>
            <div class="mt-4 title">Daily Rate</div>
          </template>
          <template v-slot:input>
            <v-text-field
              v-model="item.drate___"
              label="Edit"
              single-line
              counter
              autofocus
              @change="computeDailyHourlyRateDaily(item.drate___)"
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <!-- edit description -->
      <template v-slot:item.remarks_="{ item }">
        <v-edit-dialog
          v-model="item.remarks_"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close(item)"
        >
          {{ item.remarks_ }}
          <template v-slot:input>
            <div class="mt-4 title">Description</div>
          </template>
          <template v-slot:input>
            <v-text-field
              v-model="item.remarks_"
              label="Edit"
              single-line
              counter
              autofocus
              @change="getSelectedValue(item)"
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <!-- effective date -->
      <template v-slot:item.effectve="{ item }">
        <!-- menu v-model owns every index of the items -->
        <v-menu
          v-model="item.effective"
          :close-on-content-click="false"
          transition="scale-transition"
        >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="item.effectve"
            dense
            v-on="on"
          ></v-text-field>
        </template>
          <v-date-picker
            v-model="item.effectve"
            no-title
            @input="effectivePicker = false"
          ></v-date-picker>
        </v-menu>
      </template>
      </v-data-table>
    </v-container>
    <v-snackbar v-model="snack" :color="snackColor">
        <h3>{{ snackText }}</h3>
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import axios from 'axios'
import { Vratetype } from '@/util/helper'
import { formatNumber } from '@/util/common'
import { buildRateTypeFn } from '@/util/build'

export default {
  props: {
    employee: String
  },
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      drate___: '',
      dailyRate: '',
      snackText: '',
      snackColor: '',
      hourlyRate: '',
      snack: false,
      disabled: false,
      effectivePicker: false,
      params__: [],
      rateType: [],
      position: [],
      salaryFile: [],
      headers: [
        { text: 'Effective Date', value: 'effectve', sortable: true },
        { text: 'Position', value: 'pos_code', sortable: true },
        { text: 'Rate Type', value: 'rate_typ' },
        { text: 'Monthly Rate', value: 'mrate___' },
        { text: 'Daily Rate', value: 'drate___' },
        { text: 'Hourly Rate', value: 'hrate___' },
        { text: 'Description', value: 'remarks_' }
      ],
      defaultItem: [
        {
          effectve: '',
          pos_code: 0,
          rate_typ: '',
          mrate___: '',
          drate___: '',
          hrate___: '',
          remarks_: ''
        }
      ]
    }
  },
  methods: {
    computeDailyHourlyRateMonthly (rate____) {
      // global parameters
      let params__ = this.params__.map(item => ({
        yrwrkday: `${item.yrwrkday}`
      }))
      // get the daily rate base on monthly salary
      let dailyRate = rate____ * 12 / params__[0].yrwrkday
      this.dailyRate = dailyRate.toFixed(2)
      // get the hourly rate base on monthly salary
      let hourlyRate = (rate____ * 12) / params__[0].yrwrkday / 8
      this.hourlyRate = hourlyRate.toFixed(2)
    },
    computeDailyHourlyRateDaily (rate____) {
      // get the hourly rate base on daily rate
      let hourlyRate = rate____ / 8
      this.hourlyRate = hourlyRate.toFixed(2)
    },
    setDefault () {
    },
    buildRateType (value) {
      return buildRateTypeFn(value)
    },
    buildPosition (value, descript) {
      // credit: https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
      const position = this.position.find(item => item.pos_code === value)
      return position.descript
    },
    toNumber (value) {
      return formatNumber(value)
    },
    getSelectedValue (item) {
    },
    async retrieveSalary () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.$store.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get(`u/maintenance/salary/${this.primekey}/${this.employee}`)
              .then(response => {
                this.salaryFile = response.data
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
    loadPosition () {
      this.$store.dispatch('retrievePositions', {
        primekey: this.primekey
      })
        .then(response => {
          this.position = this.$store.getters.retrievePositions
        })
    },
    loadParameters () {
      this.$store.dispatch('retrieveParameters', {
        primekey: this.primekey
      })
        .then(response => {
          this.params__ = this.$store.getters.retrieveParameters
        })
    },
    addNewSalary () {
      if (this.salaryFile.length !== 0) {
        this.snack = true
        this.snackColor = 'warning'
        this.snackText = 'One entry at a time.'
      }
      this.salaryFile = [ ...this.defaultItem ]
      this.$set(this.salaryFile, 'effectve', '')
      this.$set(this.salaryFile, 'pos_code', '')
      this.$set(this.salaryFile, 'rate_typ', '')
      this.$set(this.salaryFile, 'mrate___', '')
      this.$set(this.salaryFile, 'drate___', '')
      this.$set(this.salaryFile, 'hrate___', '')
      this.$set(this.salaryFile, 'remarks_', '')
    },
    save () {
    },
    cancel () {
    },
    close () {
    },
    closeMonthlyRate (item) {
      const itemIndex = this.salaryFile.indexOf(item)
      this.$set(this.salaryFile[itemIndex], 'drate___', this.dailyRate)
      this.$set(this.salaryFile[itemIndex], 'hrate___', this.hourlyRate)
    },
    closeDailyRate (item) {
      const itemIndex = this.salaryFile.indexOf(item)
      this.$set(this.salaryFile[itemIndex], 'hrate___', this.hourlyRate)
    },
    open () {
    }
  },
  created () {
    this.loadParameters()
    this.retrieveSalary()
    // this.$root.$on('createEmployee', (payload) => {
    //   console.log(payload)
    //   if (payload === false) {
    //     this.retrieveSalary()
    //   }
    // })
    this.loadPosition()
    this.rateType = Vratetype
  }
}
</script>
