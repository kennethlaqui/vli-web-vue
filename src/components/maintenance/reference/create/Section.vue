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
            v-model="form.pos_code"
            label="ID"
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
          @click="$root.$emit('closeSectionDialog')"
        >
          Close
        </v-btn>
      </template>
      <template v-slot:b-submit>
        <v-btn
          color="green darken-1"
          text
          @click="save(), $root.$emit('closeSectionDialog')"
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
  name: 'Section-Create',
  components: {
    DialogReference
  },
  props: {
    title: {
      type: String,
      default: 'Create Section'
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
        pos_code: '',
        descript: '',
        disabled: 'F'
      }
    }
  },
  methods: {
    setDefault (value) {
      this.form = { ...value }
      this.form.primekey = this.primekey
      this.$root.$emit('reloadSection')
    },
    async save () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.$store.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.post('u/maintenance/reference/section/create', this.form)
              .then((response) => {
                resolve(response)
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Successfully Saved'
                this.setDefault(this.formDefault)
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
    this.formDefault = { ...this.form }
    this.form.primekey = this.primekey
    this.trueOrFalse = Vboolean
  }
}
</script>
