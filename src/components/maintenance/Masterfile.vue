<template>
<v-app>
<v-container
  fluid
>
<v-card  v-if="!b_show_NewEmployeeComponent">
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="masterfile"
    :single-select="singleSelect"
    item-key="empl_cde"
    show-select
    class="elevation-1"
    :loading="loading"
    :search="search"
  >
    <template v-slot:item.avatar__="{ item }">
      <v-avatar size="36">
        <img
          :src="item.avatar__"
          alt="John"
        >
      </v-avatar>
    </template>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <!-- <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch> -->
        <v-spacer></v-spacer>
        <v-btn @click="createNewEmployee"></v-btn>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on" small>Create Employee</v-btn>
            </template>
            <v-card>
              <v-toolbar dark color="primary" dense>
                <v-btn icon dark @click="close">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="save">Save</v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-tabs fixed-tabs>
                <v-tab>
                  <!-- <v-icon left>mdi-account</v-icon> -->
                  Personal
                </v-tab>
                <v-tab>
                  <!-- <v-icon left>mdi-lock</v-icon> -->
                  General
                </v-tab>
                <v-tab>
                  <!-- <v-icon left>mdi-access-point</v-icon> -->
                  Government
                </v-tab>
                <v-tab>
                  <!-- <v-icon left>mdi-family</v-icon> -->
                  Family
                </v-tab>
                <v-tab>
                  <!-- <v-icon left>mdi-access-point</v-icon> -->
                  Education
                </v-tab>
                <v-tab>
                  <!-- <v-icon left>mdi-access-point</v-icon> -->
                  Training/Seminar
                </v-tab>
                <v-tab>
                  <!-- <v-icon left>mdi-access-point</v-icon> -->
                  Employment
                </v-tab>
                <v-divider></v-divider>
                <v-tab>
                  <v-icon left>mdi-download</v-icon>
                  Export This Data
                </v-tab>
                <v-tab>
                  <v-icon left>mdi-download</v-icon>
                  Print This Data
                </v-tab>
                <v-divider></v-divider>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <!-- 4 text field -->
                          <v-col cols="12" sm="6" md="3">
                            <v-text-field v-if="editedIndex !== -1" v-model="editedItem.empl_cde" label="Employee ID" disabled></v-text-field>
                            <v-text-field v-else-if="editedIndex == -1" v-model="empl_cde" label="Employee ID"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <v-text-field v-model="editedItem.asso_cde" label="Alternative ID"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <v-text-field v-model="editedItem.empl_cd2" label="Other ID"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <v-text-field v-model="editedItem.chro_num" label="Biometrics ID"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.last_nme" label="Last Name"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.frst_nme" label="First Name"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="2">
                            <v-text-field v-model="editedItem.midl_nme" label="Middle Name" ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="2">
                            <v-text-field v-model="editedItem.midl_ini" label="Middle Initial"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.nickname" label="Nickname"></v-text-field>
                          </v-col>
                          <!-- date picker for birthday -->
                          <v-col cols="12" sm="6" md="4">
                            <v-dialog
                              ref="dialogBirthday"
                              v-model="ModalBirthday"
                              :return-value.sync="date"
                              persistent
                              width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="editedItem.birthday"
                                  label="Birthday"
                                  prepend-icon="event"
                                  readonly
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="editedItem.birthday" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="ModalBirthday = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialogBirthday.save(editedItem.birthday)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>
                          </v-col>
                          <v-col cols="12" sm="6" md="2">
                            <v-select
                              :items="gender"
                              item-text="description"
                              item-value="id"
                              label="Sex"
                              v-model="editedItem.sex_____"
                              @change="selectGender"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="2">
                            <v-select
                              :items="cvilstat"
                              item-text="description"
                              item-value="id"
                              v-model="editedItem.cvilstat"
                              label="Civil Status"
                              @change="selectCvlStat"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.address1" label="Address"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.address2" label="Address 2"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.address3" label="Address 3"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.cel_numb" label="Mobile Number"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <!-- date picker for date hired -->
                          <v-col cols="12" sm="6" md="4">
                            <v-dialog
                              ref="dialogDateHired"
                              v-model="modalDateHired"
                              :return-value.sync="date"
                              persistent
                              width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="editedItem.dte_hire"
                                  label="Date Hired"
                                  prepend-icon="event"
                                  readonly
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="editedItem.dte_hire" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modalDateHired = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialogDateHired.save(editedItem.dte_hire)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>
                          </v-col>
                          <!-- date picker for date regular -->
                          <v-col cols="12" sm="6" md="4">
                            <v-dialog
                              ref="dialogDateRglr"
                              v-model="modalDateRglr"
                              :return-value.sync="date"
                              persistent
                              width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="editedItem.dte_rglr"
                                  label="Date Regular"
                                  prepend-icon="event"
                                  readonly
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="editedItem.dte_rglr" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modalDateRglr = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialogDateRglr.save(editedItem.dte_rglr)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>
                          </v-col>
                          <!-- date picker for date regular -->
                          <v-col cols="12" sm="6" md="4">
                            <v-dialog
                              ref="dialogDateRsgn"
                              v-model="modalDateRsgn"
                              :return-value.sync="date"
                              persistent
                              width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="editedItem.dte_rsgn"
                                  label="Date Resign"
                                  prepend-icon="event"
                                  readonly
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="editedItem.dte_rsgn" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modalDateRsgn = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialogDateRsgn.save(editedItem.dte_rsgn)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>
                          </v-col>
                          <!-- employment status -->
                          <v-col cols="12" sm="6" md="3">
                            <v-select
                              :items="emplstat"
                              item-text="descript"
                              item-value="cntrl_no"
                              label="Employment Status"
                              v-model="editedItem.emp_stat"
                              @change="selectEmplStat"
                          ></v-select>
                          </v-col>
                          <!-- work status -->
                          <v-col cols="12" sm="6" md="3">
                            <v-select
                              :items="workstat"
                              item-text="descript"
                              item-value="cntrl_no"
                              label="Work Status"
                              v-model="editedItem.workstat"
                              @change="selectWorkStat"
                          ></v-select>
                          </v-col>
                          <!-- work area -->
                          <v-col cols="12" sm="6" md="3">
                            <v-select
                              :items="workarea"
                              item-text="descript"
                              item-value="cntrl_no"
                              label="Work Area"
                              v-model="editedItem.workarea"
                              @change="selectWorkArea"
                          ></v-select>
                          </v-col>
                          <!-- positions -->
                          <v-col cols="12" sm="6" md="3">
                            <v-select
                              :items="positions"
                              item-text="descript"
                              item-value="pos_code"
                              label="Positions"
                              v-model="editedItem.pos_code"
                              @change="selectPosition"
                          ></v-select>
                          </v-col>
                          <!-- divisions -->
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              :items="division"
                              item-text="descript"
                              item-value="pos_code"
                              label="Division"
                              v-model="editedItem.grp_lvl1"
                              @change="selectDivision"
                          ></v-select>
                          </v-col>
                          <!-- department  -->
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              :items="department"
                              item-text="descript"
                              item-value="pos_code"
                              label="Department"
                              v-model="editedItem.grp_lvl2"
                              @change="selectDepartment"
                          ></v-select>
                          </v-col>
                          <!-- section -->
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              :items="section"
                              item-text="descript"
                              item-value="pos_code"
                              label="Section"
                              v-model="editedItem.grp_lvl3"
                              @change="selectSection"
                          ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.tax_numb" v-mask="maskTin" label="TIN Number"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.sss_numb" v-mask="maskSSS" label="SSS Number"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.pag_ibig" v-mask="maskPagIbig" label="Pag-ibig Number"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.philhlth" v-mask="maskPhic" label="Philhealth Number"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-card>
          </v-dialog>
      </v-toolbar>
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
        pos_code: '',
        emp_stat: '',
        workstat: '',
        workarea: '',
        grp_lvl1: '',
        grp_lvl2: '',
        grp_lvl3: '',
        tax_numb: '',
        sss_numb: '',
        pag_ibig: '',
        philhlth: ''
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
        pos_code: '',
        emp_stat: '',
        workstat: '',
        workarea: '',
        grp_lvl1: '',
        grp_lvl2: '',
        grp_lvl3: '',
        tax_numb: '',
        sss_numb: '',
        pag_ibig: '',
        philhlth: ''
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
    // this.getPositions()
    // this.getEmplStat()
    // this.getWorkStat()
    // this.getWorkArea()
    // this.getDivision()
    // this.getDepartment()
    // this.getSection()
    // this.getMaxEmployeeCode()
    this.$root.$on('create', () => {
      this.b_show_NewEmployeeComponent = false
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
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
