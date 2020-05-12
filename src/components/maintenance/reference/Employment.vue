<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="emplStatDataB"
      :items-per-page="5"
      fixed-header
      class="elevation-1"
    >
        <!-- edit descript -->
      <template v-slot:item.descript="{ item }">
        <v-edit-dialog
          :return-value.sync="item.descript"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close(item)"
        >
          <div>{{ item.descript }}</div>
          <template v-slot:input>
            <div class="mt-4 title">Update Descript</div>
          </template>
          <template v-slot:input>
            <v-text-field
              v-model="item.descript"
              label="Edit"
              single-line
              counter
              autofocus
              @change="getSelectedValue(item)"
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <!-- default payroll group -->
      <template v-slot:item.defu_paygroup="{ item }">
        <v-edit-dialog
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        > {{ buildPayrollGroup(item.defu_paygroup) }}
          <template v-slot:input>
            <v-select
              v-model="item.defu_paygroup"
              :items="payrollGroup"
              item-text="descript"
              item-value="group_no"
              @change="getSelectedValue(item)"
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>
      <!-- default rate type -->
      <template v-slot:item.defu_rate_typ="{ item }">
        <v-edit-dialog
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        > {{ buildRateType(item.defu_rate_typ) }}
          <template v-slot:input>
            <v-select
              v-model="item.defu_rate_typ"
              :items="rateType"
              item-text="text"
              item-value="value"
              @change="getSelectedValue(item)"
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>
      <!-- default compute tax -->
      <template v-slot:item.defu_comp_tax="{ item }">
        <v-edit-dialog
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        > {{ buildBoolean(item.defu_comp_tax) }}
          <template v-slot:input>
            <v-select
              v-model="item.defu_comp_tax"
              :items="trueOrFalse"
              item-text="text"
              item-value="value"
              @change="getSelectedValue(item)"
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>
      <!-- default compute sss -->
      <template v-slot:item.defu_comp_sss="{ item }">
        <v-edit-dialog
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        > {{ buildBoolean(item.defu_comp_sss) }}
          <template v-slot:input>
            <v-select
              v-model="item.defu_comp_sss"
              :items="trueOrFalse"
              item-text="text"
              item-value="value"
              @change="getSelectedValue(item)"
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>
      <!-- default compute philhealth -->
      <template v-slot:item.defu_comp_med="{ item }">
        <v-edit-dialog
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        > {{ buildBoolean(item.defu_comp_med) }}
          <template v-slot:input>
            <v-select
              v-model="item.defu_comp_med"
              :items="trueOrFalse"
              item-text="text"
              item-value="value"
              @change="getSelectedValue(item)"
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>
      <!-- default compute pagibig -->
      <template v-slot:item.defu_comp_pgi="{ item }">
        <v-edit-dialog
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        > {{ buildBoolean(item.defu_comp_pgi) }}
          <template v-slot:input>
            <v-select
              v-model="item.defu_comp_pgi"
              :items="trueOrFalse"
              item-text="text"
              item-value="value"
              @change="getSelectedValue(item)"
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>
      <!-- default minimum wage -->
      <template v-slot:item.defu_min_wage="{ item }">
        <v-edit-dialog
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        > {{ buildBoolean(item.defu_min_wage) }}
          <template v-slot:input>
            <v-select
              v-model="item.defu_min_wage"
              :items="trueOrFalse"
              item-text="text"
              item-value="value"
              @change="getSelectedValue(item)"
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>
      <!-- disabled -->
      <template v-slot:item.disabled="{ item }">
        <v-edit-dialog
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        > {{ buildBoolean(item.disabled) }}
          <template v-slot:input>
            <v-select
              v-model="item.disabled"
              :items="trueOrFalse"
              item-text="text"
              item-value="value"
              @change="getSelectedValue(item)"
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
    <v-snackbar v-model="snack" :color="snackColor">
      <h3>{{ snackText }}</h3>
    <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import axios from 'axios'
// import { Form } from 'vform'
import { Vboolean, VbooleanFn, Vratetype } from '@/util/helper'

export default {
  name: 'employment',
  props: {
    reloadEmployment: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      snackText: '',
      snackColor: '',
      snack: false,
      rateType: [],
      trueOrFalse: [],
      payrollGroup: [],
      emplStatDataB: [],
      headers: [
        { text: 'Code', value: 'cntrl_no', sortable: true },
        { text: 'Description', value: 'descript', sortable: true },
        { text: 'Payroll Group', value: 'defu_paygroup', sortable: true },
        { text: 'Rate Type', value: 'defu_rate_typ', sortable: true },
        { text: 'Minimum Wage', value: 'defu_min_wage', sortable: true },
        { text: 'Tax', value: 'defu_comp_tax', sortable: true },
        { text: 'SSS', value: 'defu_comp_sss', sortable: true },
        { text: 'Pag-ibig', value: 'defu_comp_pgi', sortable: true },
        { text: 'Philhealth', value: 'defu_comp_med', sortable: true },
        { text: 'Disabled', value: 'disabled', sortable: true }
      ],
      form: {
        primekey: '',
        cntrl_no: '',
        descript: '',
        disabled: '',
        defu_paygroup: '',
        defu_rate_typ: '',
        defu_comp_tax: '',
        defu_comp_sss: '',
        defu_comp_med: '',
        defu_comp_pgi: '',
        defu_min_wage: ''
      }
    }
  },
  watch: {
    reloadEmployment: function (value) {
      this.loadEmplStatData()
    }
  },
  methods: {
    buildRateType (value, text) {
      return Vratetype.find(item => item.value === value).text
    },
    buildPayrollGroup (value, descript) {
      // credit: https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
      return this.payrollGroup.find(item => item.group_no === value).descript
    },
    buildBoolean (value) {
      return VbooleanFn(value)
    },
    getSelectedValue (value) {
      this.form = { ...value }
    },
    async saveOrUpdate () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.$store.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.post('u/maintenance/reference/employment/create', this.form)
              .then((response) => {
                resolve(response)
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Successfully Saved'
                this.loadEmplStatData()
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    loadPayrollGroup () {
      this.$store.dispatch('retrievePayrollGroup', {
        primekey: this.primekey
      })
        .then(response => {
          this.payrollGroup = this.$store.getters.retrievePayrollGroup
        })
    },
    loadEmplStatData () {
      this.$store.dispatch('retrieveEmplStatDataB', {
        primekey: this.primekey,
        query___: 'B'
      })
        .then(response => {
          this.emplStatDataB = this.$store.getters.retrieveEmplStatDataB
        })
    },
    save () {
      this.saveOrUpdate()
    },
    cancel () {

    },
    open () {

    },
    close (value) {
      this.form = { ...value }
    }
  },
  created () {
    this.loadPayrollGroup()
    this.loadEmplStatData()
    this.rateType = Vratetype
    this.trueOrFalse = Vboolean
  }
}
</script>
