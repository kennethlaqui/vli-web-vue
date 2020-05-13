<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="workStatData"
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
            :rules="[maximumChar]"
            label="Edit"
            single-line
            counter
            autofocus
            @change="getSelectedValue(item)"
          ></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
    <!-- build T or F to True or False -->
    <template v-slot:item.w_dte_rsgn="{ item }">
      {{ buildBoolean(item.w_dte_rsgn) }}
    </template>
    <!-- edit with date resign -->
    <template v-slot:item.w_dte_rsgn="{ item }">
      <v-edit-dialog
        @save="save"
        @cancel="cancel"
        @open="open"
        @close="close"
      > {{ buildBoolean(item.w_dte_rsgn) }}
        <template v-slot:input>
          <v-select
            v-model="item.w_dte_rsgn"
            :items="trueOrFalse"
            item-text="text"
            item-value="value"
            @change="getSelectedValue(item)"
          ></v-select>
        </template>
      </v-edit-dialog>
    </template>
    <!-- edit show masterfile -->
    <template v-slot:item.show_mst="{ item }">
      <v-edit-dialog
        @save="save"
        @cancel="cancel"
        @open="open"
        @close="close"
      > {{ buildBoolean(item.show_mst) }}
        <template v-slot:input>
          <v-select
            v-model="item.show_mst"
            :items="trueOrFalse"
            item-text="text"
            item-value="value"
            @change="getSelectedValue(item)"
          ></v-select>
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
  name: 'workstat',
  props: {
    reloadWorkStat: {
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
      workStatData: [],
      headers: [
        { text: 'Code', value: 'cntrl_no', sortable: true },
        { text: 'Description', value: 'descript', sortable: true },
        { text: 'With Date Resign', value: 'w_dte_rsgn' },
        { text: 'Show In Mastefile', value: 'show_mst' },
        { text: 'Disbled', value: 'disabled' }
      ],
      form: {
        primekey: '',
        cntrl_no: '',
        descript: '',
        disabled: '',
        show_mst: '',
        w_dte_rsgn: ''
      }
    }
  },
  watch: {
    reloadWorkStat: function (value) {
      this.loadWorkStatData()
      this.$root.$emit('reloadWorkStat', false)
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
            axios.post('u/maintenance/reference/workstat/create', this.form)
              .then((response) => {
                resolve(response)
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Successfully Saved'
                this.loadWorkStatData()
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    },
    loadWorkStatData () {
      this.$store.dispatch('retrieveWorkStatData', {
        primekey: this.primekey
      })
        .then(() => {
          this.workStatData = this.$store.getters.retrieveWorkStatData
        })
    }
  },
  created () {
    this.loadWorkStatData()
    this.buildBuildItem()
  }
}
</script>
