<template>
  <v-app>
    <v-container
      fluid
    >
      <v-card  v-if="!b_show_NewEmployeeComponent">
        <v-app-bar
          color="primary"
          dense
          dark
          elevation="1"
        >
          <v-toolbar-title>Masterfile</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="createNewEmployee"
            >
              <v-icon>
                mdi-account-multiple-plus
              </v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>

            <!-- <v-spacer></v-spacer>

            <v-row
              class="mt-2"
              justify="end"
            >
              <v-col cols="8">
                <v-text-field
                v-model="search"
                label="Search"
                single-line
                dense
              ></v-text-field>
              </v-col>
            </v-row> -->

            <v-menu
              left
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
                <v-list
                  dense
                >
                  <v-list-item>
                    <v-list-item-title>Reload</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Print</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="masterfile"
          :loading="loading"
          :search="search"
          :single-select="singleSelect"
          item-key="empl_cde"
          show-select
          fixed-header
          height="500px"
          class="elevation-1"
        >
          <template v-slot:item.avatar__="{ item }">
            <v-avatar size="36">
              <img
                :src="item.avatar__"
                alt="John"
              >
            </v-avatar>
            </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      No data to retrieve
    </template>
  </v-data-table>
</v-card>
<newEmployee v-if="b_show_NewEmployeeComponent" :create="b_createNew" :employeeData="editedItem"></newEmployee>
</v-container>
</v-app>
</template>
<script>
import axios from 'axios'
import { mask } from 'vue-the-mask'
import newEmployee from '@/components/maintenance/NewEmployee.vue'

export default {
  name: 'Masterfile',
  components: {
    newEmployee
  },
  data () {
    return {
      loading: false,
      search: '',
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      ModalBirthday: false,
      modalDateHired: false,
      modalDateRglr: false,
      modalDateRsgn: false,
      b_show_NewEmployeeComponent: false,
      b_createNew: false,
      bol: true,
      dialog: false,
      primekey: localStorage.getItem('primekey'),
      token: localStorage.getItem('access_token'),
      masterfile: [],
      maskTin: '###-###-###',
      maskSSS: '##-#######-#',
      maskPagIbig: '####-####-####',
      maskPhic: '##-#########-#',
      singleSelect: false,
      selected: [],
      headers: [
        { text: 'Image', value: 'avatar__', align: 'center', sortable: false },
        { text: 'Employee #', value: 'empl_cde', align: 'left', sortable: false },
        { text: 'Last Name', value: 'last_nme' },
        { text: 'First Name', value: 'frst_nme' },
        { text: 'Middle Name', value: 'midl_nme' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        primekey: '',
        empl_cde: '',
        empl_cd2: '',
        asso_cde: '',
        chro_num: '',
        last_nme: '',
        frst_nme: '',
        midl_nme: '',
        midl_ini: '',
        birthday: '',
        sex_____: '',
        cvilstat: '',
        address1: '',
        address2: '',
        address3: '',
        cel_numb: '',
        dte_hire: '',
        dte_rglr: '',
        dte_rsgn: '',
        dte_eoc_: '',
        pos_code: '',
        emp_stat: '',
        workstat: '',
        workarea: '',
        grp_lvl1: '',
        grp_lvl2: '',
        grp_lvl3: '',
        min_wage: '',
        trainee_: '',
        shft_cde: '',
        alw_flex: '',
        compweek: '',
        rest_day: '',
        rest_da2: '',
        bio_reqd: '',
        tmeinout: '',
        earlytme: '',
        alw_ot__: '',
        alw_nsd_: '',
        alw_hol_: '',
        tax_numb: '',
        sss_numb: '',
        pag_ibig: '',
        philhlth: '',
        rate_typ: '',
        alw_payr: ''
      },
      defaultItem: {
        primekey: localStorage.getItem('primekey'),
        empl_cde: '',
        empl_cd2: '',
        asso_cde: '',
        chro_num: '',
        last_nme: '',
        frst_nme: '',
        midl_nme: '',
        midl_ini: '',
        birthday: '',
        sex_____: '',
        cvilstat: '',
        address1: '',
        address2: '',
        address3: '',
        cel_numb: '',
        dte_hire: '',
        dte_rglr: '',
        dte_rsgn: '',
        dte_eoc_: '',
        pos_code: '',
        emp_stat: '',
        workstat: '',
        workarea: '',
        grp_lvl1: '',
        grp_lvl2: '',
        grp_lvl3: '',
        min_wage: 'F',
        trainee_: 'F',
        shft_cde: '',
        alw_flex: 'F',
        compweek: 'F',
        rest_day: '6',
        rest_da2: '7',
        bio_reqd: 'T',
        tmeinout: 'T',
        earlytme: 'F',
        alw_ot__: 'T',
        alw_nsd_: 'T',
        alw_hol_: 'T',
        tax_numb: '',
        sss_numb: '',
        pag_ibig: '',
        philhlth: '',
        rate_typ: 'M',
        alw_payr: 'T'
      },
      gender: [
        {
          id: 'M',
          description: 'Male'
        },
        {
          id: 'F',
          description: 'Female'
        }
      ],
      cvilstat: [
        {
          id: 'S',
          description: 'Single'
        },
        {
          id: 'M',
          description: 'Married'
        }
      ],
      empl_cde: '',
      positions: [],
      emplstat: [],
      workstat: [],
      workarea: [],
      division: [],
      department: [],
      section: []
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Employee' : "Edit Employee's Information"
    },
    computedDialog: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    async retrieveMasterFile () {
      this.loading = true
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
        if (this.bol) {
          await new Promise((resolve, reject) => {
            axios.get('u/maintenance/masterfile/', {
              params: {
                primekey: this.primekey
              }
            })
              .then(response => {
                this.masterfile = response.data
                this.loading = false
                resolve(response)
              })
              .catch(errors => {
                this.loading = true
                reject(errors)
              })
          })
        }
      } catch (error) {
      }
    },
    createNewEmployee () {
      this.b_show_NewEmployeeComponent = true
      this.b_createNew = true
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    editItem (item) {
      this.editedIndex = this.masterfile.indexOf(item)
      this.editedItem = Object.assign({}, item)
      // this.$root.$emit('employeeData', this.editedItem)
      // this.$router.push({ name: 'UserNewEmployee' })
      // this.dialog = true
      this.b_show_NewEmployeeComponent = true
      this.b_createNew = false
    },
    deleteItem (item) {
      const index = this.masterfile.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.masterfile.splice(index, 1)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.masterfile[this.editedIndex], this.editedItem)
      } else {
        this.masterfile.push(this.editedItem)
      }
      this.close()
    },
    selectGender (id) {

    },
    selectCvlStat (id) {

    },
    selectEmplStat (descript) {

    },
    selectWorkStat (descript) {

    },
    selectWorkArea (descript) {

    },
    selectDivision (descript) {

    },
    selectDepartment (descript) {

    },
    selectSection (descript) {

    },
    selectPosition (descript) {

    },
    getMaxEmployeeCode () {
      this.$store.dispatch('retrieveEmployeeCode', {
        primekey: localStorage.getItem('primekey')
      })
        .then(response => {
          this.empl_cde = this.$store.getters.retrieveEmployeeCode
        })
    },
    getWorkStat () {
      this.$store.dispatch('retrieveWorkStat', {
        primekey: localStorage.getItem('primekey')
      })
        .then(response => {
          this.workstat = this.$store.getters.retrieveWorkStat
        })
    },
    getPositions () {
      this.$store.dispatch('retrievePositions', {
        primekey: localStorage.getItem('primekey')
      })
        .then(response => {
          this.positions = this.$store.getters.retrievePositions
        })
    },
    getEmplStat () {
      this.$store.dispatch('retrieveEmplStat')
        .then(response => {
          this.emplstat = this.$store.getters.retrieveEmplStat
        })
    },
    getWorkArea () {
      this.$store.dispatch('retrieveWorkArea', {
        primekey: localStorage.getItem('primekey')
      })
        .then(response => {
          this.workarea = this.$store.getters.retrieveWorkArea
        })
    },
    getDivision () {
      this.$store.dispatch('retrieveDivision', {
        primekey: localStorage.getItem('primekey')
      })
        .then(response => {
          this.division = this.$store.getters.retrieveDivision
        })
    },
    getDepartment () {
      this.$store.dispatch('retrieveDepartment', {
        primekey: localStorage.getItem('primekey')
      })
        .then(response => {
          this.department = this.$store.getters.retrieveDepartment
        })
    },
    getSection () {
      this.$store.dispatch('retrieveSection', {
        primekey: localStorage.getItem('primekey')
      })
        .then(response => {
          this.section = this.$store.getters.retrieveSection
        })
    }
  },
  created () {
    this.retrieveMasterFile()
    this.$root.$on('newEmployee', () => {
      this.b_show_NewEmployeeComponent = false
      this.editedItem = Object.assign({}, this.defaultItem)
      this.retrieveMasterFile()
    })
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  directives: {
    mask
  }
}
</script>
