<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="division"
      :items-per-page="5"
      fixed-header
      height="290px"
    >
    <!-- edit descript -->
    <template v-slot:item.descript="{ item }">
      <v-edit-dialog
        v-model="item.descript"
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
    <!-- edit disabled -->
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
import { Vboolean, VbooleanFn } from '@/util/helper'

export default {
  name: 'Division',
  props: {
    reloadDivision: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      maximumChar: v => v.length <= 25 || 'Input too long!',
      snackText: '',
      snackColor: '',
      snack: false,
      trueOrFalse: [],
      division: [],
      headers: [
        { text: 'Code', value: 'pos_code', sortable: true },
        { text: 'Description', value: 'descript', sortable: true },
        { text: 'Disabled', value: 'disabled' }
      ],
      form: {
        primekey: '',
        pos_code: '',
        descript: '',
        disabled: ''
      }
    }
  },
  watch: {
    reloadDivision: function (value) {
      this.loadDivision()
      this.$root.$emit('reloadDivision', false)
    }
  },
  methods: {
    buildBuildItem () {
      this.trueOrFalse = Vboolean
    },
    buildBoolean (value) {
      return VbooleanFn(value)
    },
    getSelectedValue (value) {
      this.form = { ...value }
    },
    save () {
      this.saveOrUpdate()
    },
    cancel () {
      this.saveOrUpdate()
    },
    open () {
    },
    close (value) {
      this.form = { ...value }
    },
    async saveOrUpdate () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.$store.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.post('u/maintenance/reference/division/create', this.form)
              .then((response) => {
                resolve(response)
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Successfully Saved'
                this.loadDivision()
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    loadDivision () {
      this.$store.dispatch('retrieveDivisionData', {
        primekey: this.primekey
      })
        .then(() => {
          this.division = this.$store.getters.retrieveDivisionData
        })
    }
  },
  created () {
    this.loadDivision()
    this.buildBuildItem()
  }
}
</script>
