<template>
  <div>
    <v-container
      fluid
    >
      <v-data-table
        :headers="headers"
        :items="salaryFile"
        class="elevation-1"
      >
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
          @close="close(item)"
        >
          {{ toNumber(item.mrate___) }}
          <template v-slot:input>
            <div class="mt-4 title">Update Descript</div>
          </template>
          <template v-slot:input>
            <v-text-field
              v-model="item.mrate___"
              label="Edit"
              single-line
              counter
              autofocus
              @change="computeDailyHourlyRate(item.mrate___)"
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <!-- hourly rate -->
      <template v-slot:item.drate___="{ item }">
        {{ toNumber(item.drate___) }}
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
            <div class="mt-4 title">Update Description</div>
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
        <v-menu
          v-model="effectiveMenu"
          :close-on-content-click="false"
          transition="scale-transition"
        >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="item.effectve"
            label="Date Hired"
            outlined
            dense
            rounded
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
  </div>
</template>
<script>
import axios from 'axios'
import { Vratetype } from '@/util/helper'
import { formatNumber } from '@/util/common'
import { buildRateTypeFn } from '@/util/build'

export default {
  props: {
    employee: {
      type: String
    }
  },
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      effectivePicker: false,
      effectiveMenu: false,
      drate___: '',
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
      ]
    }
  },
  methods: {
    computeDailyHourlyRate (mrate___) {
      let params__ = this.params__.map(item => ({
        yrwrkday: `${item.yrwrkday}`
      }))
      let dailyRate = mrate___ * 12 / params__[0].yrwrkday
      this.drate___ = dailyRate
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
    save () {
    },
    cancel () {
    },
    close () {
    },
    open () {
    }
  },
  created () {
    this.loadParameters()
    this.retrieveSalary()
    this.loadPosition()
    this.rateType = Vratetype
  }
}
</script>
