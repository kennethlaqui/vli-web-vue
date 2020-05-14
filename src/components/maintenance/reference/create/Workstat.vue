<template>
  <div>
    <!-- dialog / create -->
    <!-- work status -->
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
          <!-- with date resign -->
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="form.w_dte_rsgn"
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
              v-model="form.show_mst"
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
          @click="$root.$emit('closeWorkstaDialog')"
        >
          Close
        </v-btn>
      </template>
      <template v-slot:b-submit>
        <v-btn
          color="green darken-1"
          text
          @click="save(), $root.$emit('closeWorkstaDialog')"
        >
          Save
        </v-btn>
      </template>
    </DialogReference>
  </div>
</template>
<script>
import axios from 'axios'
import { Vboolean } from '@/util/helper'
import DialogReference from '@/components/maintenance/dialog/Reference'

export default {
  name: 'Workstat-Create',
  components: {
    DialogReference
  },
  props: {
    title: {
      type: String,
      default: 'Create Work Status'
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
      trueOrFalse: [],
      form: {
        primekey: '',
        cntrl_no: '',
        descript: '',
        show_mst: 'F',
        disabled: 'F',
        w_dte_rsgn: 'F'
      }
    }
  },
  methods: {
    setWorkStatDefault (value) {
      this.form = { ...value }
      this.form.primekey = this.primekey
      this.$root.$emit('reloadWorkStat')
    },
    async save () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.$store.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.post('u/maintenance/reference/workstat/create', this.form)
              .then((response) => {
                resolve(response)
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Successfully Saved'
                this.setWorkStatDefault(this.formDefault)
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
    this.formDefault = { ...this.form } // make a copy of work status empty object / default value
    this.form.primekey = this.primekey
    this.trueOrFalse = Vboolean
  }
}
</script>
