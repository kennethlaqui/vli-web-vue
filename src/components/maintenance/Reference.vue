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
          @click="dialog.d_emplymnt = true, dialog.dialogTitle='Create Employment Status'"
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
          <Employment></Employment>
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
    <!-- employment -->
    <DialogReference
      v-if="dialog.d_emplymnt"
      :title="dialog.dialogTitle"
      dialog
      width="800px"
    >
      <template v-slot:body>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
          <v-text-field
          >
          </v-text-field>
          </v-col>
        </v-row>
      </template>
    </DialogReference>
  </div>
</template>
<script>
import axios from 'axios'
import { Form } from 'vform'
import { Vboolean } from '@/util/helper'
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
      reloadWorkStat: false,
      trueOrFalse: [],
      dialog: {
        dialogTitle: '',
        d_workstat: false,
        d_emplymnt: false
      },
      settings: {
        panelIndex: -1,
        panelShow: false
      },
      f_workStat: new Form({
        primekey: '',
        cntrl_no: '',
        descript: '',
        show_mst: 'F',
        disabled: 'F',
        w_dte_rsgn: 'F'
      })
    }
  },
  watch: {
    'settings.panelIndex': function () {
      typeof this.settings.panelIndex === 'undefined' ? this.settings.panelShow = false : this.settings.panelShow = true
    }
  },
  methods: {
    loadPrimekeys () {
      this.f_workStat.primekey = this.primekey
    },
    setWorkStatDefault (value) {
      const data = value
      Object.keys(data).forEach(key => {
        this.f_workStat[key] = data[key]
      })
      this.f_workStat.primekey = this.primekey
      this.reloadWorkStat = true
    },
    setEmploymentDefault (value) {
      const data = value
      Object.keys(data).forEach(key => {
        this.f_workStat[key] = data[key]
      })
    },
    async saveWorkStat () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.$store.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            this.f_workStat.post('u/maintenance/reference/workstat/create')
              .then((response) => {
                resolve(response)
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Successfully Saved'
                this.reloadWorkStat = true
                this.setWorkStatDefault(this.f_workStatDefault)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    }
  },
  created () {
    this.f_workStatDefault = { ...this.f_workStat } // make a copy of work status empty object / default value
    this.loadPrimekeys()
    this.trueOrFalse = Vboolean
  }
}
</script>
