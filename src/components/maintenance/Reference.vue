<template>
  <div>
    <v-app-bar
      color="primary"
      dense
      dark
    >
      <v-btn
        icon
      >
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <v-toolbar-title>Reference Files</v-toolbar-title>

      <v-spacer></v-spacer>
        <!-- work status button -->
        <v-btn
          v-if="settings.panelIndex === 0"
          v-show="settings.panelShow"
          class="mr-4"
          icon
          @click="dialog.d_workstat = true, dialog.dialogTitle='Create Work Status'"
        >
          <v-icon>mdi-account-multiple-plus</v-icon>
        </v-btn>
        <!-- employment status -->
        <v-btn
          v-if="settings.panelIndex === 1"
          v-show="settings.panelShow"
          class="mr-4"
          icon
          @click="dialog.d_employment = true, dialog.dialogTitle='Create Employment Status'"
        >
          <v-icon>mdi-folder</v-icon>
        </v-btn>
    </v-app-bar>
    <v-expansion-panels v-model="settings.panelIndex">
      <!-- 1st row -->
      <v-expansion-panel>
        <v-expansion-panel-header>Work Status</v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- Work status component -->
          <Workstat :reloadWorkStat="reloadWorkStat"></Workstat>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- 2nd row -->
      <v-expansion-panel>
        <v-expansion-panel-header>Employment</v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- Employment status component -->
          <Employment :reloadEmployment="reloadEmployment"></Employment>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- work status -->
    <DialogReference
      v-if="dialog.d_workstat"
      :title="dialog.dialogTitle"
      dialog
      width="800px"
    >
      <template v-slot:body>
        <v-row>
          <!-- ID -->
          <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="f_workStat.cntrl_no"
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
            v-model="f_workStat.descript"
            label="Description"
            outlined
            dense
            rounded
          >
          </v-text-field>
          </v-col>
          <!-- with date resign -->
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="f_workStat.w_dte_rsgn"
              :items="trueOrFalse"
              item-text="text"
              item-value="value"
              label="Date Resign"
              hint="Enable Date Resign Field."
              persistent-hint
              outlined
              dense
              rounded
            ></v-select>
          </v-col>
          <!-- show in masterfille -->
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="f_workStat.show_mst"
              :items="trueOrFalse"
              item-text="text"
              item-value="value"
              label="Masterfile"
              hint="Display In Masterfile."
              persistent-hint
              outlined
              dense
              rounded
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <!-- show in masterfille -->
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="f_workStat.disabled"
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
          @click="dialog.d_workstat = false"
        >
          Close
        </v-btn>
      </template>
      <template v-slot:b-submit>
        <v-btn
          color="green darken-1"
          text
          @click="saveWorkStat(), dialog.d_workstat = false, reloadWorkStat = false"
        >
          Save
        </v-btn>
      </template>
    </DialogReference>
    <!-- employment dialog -->
    <DialogReference
      v-if="dialog.d_employment"
      :title="dialog.dialogTitle"
      dialog
      width="800px"
    >
      <template v-slot:body>
        <v-row>
          <!-- ID -->
          <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="f_employment.cntrl_no"
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
            v-model="f_employment.descript"
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
              v-model="f_employment.defu_paygroup"
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
              v-model="f_employment.defu_rate_typ"
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
              v-model="f_employment.defu_comp_tax"
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
              v-model="f_employment.defu_comp_sss"
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
              v-model="f_employment.defu_comp_med"
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
              v-model="f_employment.defu_comp_pgi"
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
              v-model="f_employment.defu_min_wage"
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
              v-model="f_employment.disabled"
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
          @click="dialog.d_employment = false"
        >
          Close
        </v-btn>
      </template>
      <template v-slot:b-submit>
        <v-btn
          color="green darken-1"
          text
          @click="saveEmployment(), dialog.d_employment = false, reloadEmployment = false"
        >
          Save
        </v-btn>
      </template>
    </DialogReference>
  </div>
</template>
<script>
import axios from 'axios'
// import { Form } from 'vform'
import { Vboolean, Vratetype } from '@/util/helper'
import Employment from '@/components/maintenance/reference/Employment'
import Workstat from '@/components/maintenance/reference/Workstat'
import DialogReference from '@/components/maintenance/dialog/Reference'

export default {
  name: 'Reference',
  components: {
    Workstat,
    DialogReference,
    Employment
  },
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      f_workStatDefault: '',
      f_employmentDefault: '',
      reloadWorkStat: false,
      reloadEmployment: false,
      rateType: [],
      trueOrFalse: [],
      payrollGroup: [],
      dialog: {
        dialogTitle: '',
        d_workstat: false,
        d_employment: false
      },
      settings: {
        panelIndex: -1,
        panelShow: false
      },
      f_workStat: {
        primekey: '',
        cntrl_no: '',
        descript: '',
        show_mst: 'F',
        disabled: 'F',
        w_dte_rsgn: 'F'
      },
      f_employment: {
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
  watch: {
    'settings.panelIndex': function () {
      typeof this.settings.panelIndex === 'undefined' ? this.settings.panelShow = false : this.settings.panelShow = true
    }
  },
  methods: {
    setWorkStatDefault (value) {
      this.f_workStat = { ...value }
      this.f_workStat.primekey = this.primekey
      this.reloadWorkStat = true
    },
    setEmploymentDefault (value) {
      this.f_employment = { ...value }
      this.f_employment.primekey = this.primekey
      this.reloadEmployment = true
    },
    async saveWorkStat () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.$store.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.post('u/maintenance/reference/workstat/create', this.f_workStat)
              .then((response) => {
                resolve(response)
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Successfully Saved'
                this.setWorkStatDefault(this.f_workStatDefault)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    async saveEmployment () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.$store.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.post('u/maintenance/reference/employment/create', this.f_employment)
              .then((response) => {
                resolve(response)
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Successfully Saved'
                this.setEmploymentDefault(this.f_employmentDefault)
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
    this.f_workStatDefault = { ...this.f_workStat } // make a copy of work status empty object / default value
    this.f_employmentDefault = { ...this.f_employment }
    this.f_workStat.primekey = this.primekey
    this.f_employment.primekey = this.primekey
    this.trueOrFalse = Vboolean
    this.rateType = Vratetype
    this.loadPayrollGroup()
  }
}
</script>
