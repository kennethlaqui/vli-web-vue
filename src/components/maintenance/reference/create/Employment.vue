<template>
  <div>
    <DialogReference
      v-if="dialog"
      :title="title"
      dialog
      width="800px"
    >
      <template v-slot:body>
        <v-row>
          <!-- ID -->
          <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="form.cntrl_no"
            label="ID"
            hint="Must Unique and One Character Only."
            persistent-hint
            outlined
            dense
            rounded
          >
          </v-text-field>
          </v-col>
          <!-- description -->
          <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="form.descript"
            label="Description"
            outlined
            dense
            rounded
          >
          </v-text-field>
          </v-col>
          <!-- payroll group -->
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="form.defu_paygroup"
              :items="payrollGroup"
              item-text="descript"
              item-value="group_no"
              label="Payroll Group"
              outlined
              dense
              rounded
            ></v-select>
          </v-col>
          <!-- rate type -->
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="form.defu_rate_typ"
              :items="rateType"
              item-text="text"
              item-value="value"
              label="Rate Type"
              outlined
              dense
              rounded
            ></v-select>
          </v-col>
        </v-row>
        <!-- 2nd row -->
        <v-row>
          <!-- tax -->
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="form.defu_comp_tax"
              :items="trueOrFalse"
              item-text="text"
              item-value="value"
              label="Tax"
              hint="Compute"
              persistent-hint
              outlined
              dense
              rounded
            ></v-select>
          </v-col>
          <!-- sss -->
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="form.defu_comp_sss"
              :items="trueOrFalse"
              item-text="text"
              item-value="value"
              label="SSS"
              hint="Compute"
              persistent-hint
              outlined
              dense
              rounded
            ></v-select>
          </v-col>
          <!-- tax -->
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="form.defu_comp_med"
              :items="trueOrFalse"
              item-text="text"
              item-value="value"
              label="Philhealth"
              hint="Compute"
              persistent-hint
              outlined
              dense
              rounded
            ></v-select>
          </v-col>
          <!-- pagibig -->
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="form.defu_comp_pgi"
              :items="trueOrFalse"
              item-text="text"
              item-value="value"
              label="Pagibig"
              hint="Compute"
              persistent-hint
              outlined
              dense
              rounded
            ></v-select>
          </v-col>
        </v-row>
        <!-- 3rd row -->
        <v-row>
          <!-- minimum wage -->
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="form.defu_min_wage"
              :items="trueOrFalse"
              item-text="text"
              item-value="value"
              label="Minimum Wage"
              outlined
              dense
              rounded
            ></v-select>
          </v-col>
          <!-- disable -->
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="form.disabled"
              :items="trueOrFalse"
              item-text="text"
              item-value="value"
              label="Disable"
              outlined
              dense
              rounded
            ></v-select>
          </v-col>
        </v-row>
      </template>
      <template v-slot:b-close>
        <v-btn
          color="green darken-1"
          text
          @click="$root.$emit('closeEmploymentDialog')"
        >
          Close
        </v-btn>
      </template>
      <template v-slot:b-submit>
        <v-btn
          color="green darken-1"
          text
          @click="save(), $root.$emit('closeEmploymentDialog')"
        >
          Save
        </v-btn>
      </template>
    </DialogReference>
  </div>
</template>
<script>
import axios from 'axios'
import { Vboolean, Vratetype } from '@/util/helper'
import DialogReference from '@/components/maintenance/dialog/Reference'

export default {
  name: 'Employment-Create',
  components: {
    DialogReference
  },
  props: {
    title: {
      type: String,
      default: 'Create Employment'
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      formDefault: '',
      rateType: [],
      trueOrFalse: [],
      payrollGroup: [],
      form: {
        primekey: '',
        cntrl_no: '',
        descript: '',
        disabled: 'F',
        defu_paygroup: '',
        defu_rate_typ: 'M',
        defu_comp_tax: 'T',
        defu_comp_sss: 'T',
        defu_comp_med: 'T',
        defu_comp_pgi: 'T',
        defu_min_wage: 'F'
      }
    }
  },
  methods: {
    setEmploymentDefault (value) {
      this.form = { ...value }
      this.form.primekey = this.primekey
      this.$root.$emit('reloadEmployment')
    },
    async save () {
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
                this.setEmploymentDefault(this.formDefault)
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
    }
  },
  created () {
    this.formDefault = { ...this.form }
    this.form.primekey = this.primekey
    this.trueOrFalse = Vboolean
    this.rateType = Vratetype
    this.loadPayrollGroup()
  }
}
</script>
