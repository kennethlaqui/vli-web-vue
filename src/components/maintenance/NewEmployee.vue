<template>
<v-app>
  <v-card v-show="show">
    <v-app-bar
      color="primary"
      dense
      dark
      elevation="3"
    >
      <v-toolbar-title v-text="c_cardTitle"></v-toolbar-title>
      <v-spacer></v-spacer>
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
          <v-list-item @click="reload">
            <v-list-item-title>Reload</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Print</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-row
      class="py-3"
      justify="center"
    >
      <v-avatar
        class="profile"
        color="grey"
        size="100"
        rounded
      >
        <v-img :src="images.profile"></v-img>
      </v-avatar>
    </v-row>
    <v-row class="mt-n6">
      <v-col cols="12" md="12">
        <v-card-title v-text="h_firstname" class="justify-center font-weight-light"></v-card-title >
      </v-col>
    </v-row>
    <v-row class="mt-n12">
      <v-col cols="12" md="12">
        <v-card-subtitle v-text="h_position" align="center"></v-card-subtitle>
      </v-col>
    </v-row>
    <!-- tabs component -->
    <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
    >
      <v-tab
        v-for="tabHeader in tabHeaders"
        :key="tabHeader"
        class="font-weight-light"
      >
        {{ tabHeader }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <!-- personal -->
      <v-tab-item>
        <v-card flat>
          <v-container>
          <!-- IDs -->
          <v-row class="mt-4">
            <!-- system id -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="form.empl_cde"
                label="System ID"
                hint="System Generated"
                persistent-hint
                outlined
                dense
                rounded
                readonly
              ></v-text-field>
            </v-col>
            <!-- company ID -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="form.asso_cde"
                label="Company ID"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
            <!-- biometrics ID -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="form.chro_num"
                label="Biometrics ID"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
            <!-- reserve ID -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="form.empl_cd2"
                label="Reserve ID"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- end of IDs-->
          <v-divider></v-divider>
          <!-- names -->
          <v-row>
            <!-- last name -->
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="form.last_nme"
                label="Last name"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
            <!-- first name -->
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="form.frst_nme"
                label="First name"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
            <!-- middle name -->
            <v-col cols="12" sm="6" md="2">
              <v-text-field
                v-model="form.midl_nme"
                label="Middle name"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
            <!-- middle initial -->
            <v-col cols="12" sm="6" md="2">
              <v-text-field
                v-model="form.midl_ini"
                label="Middle initial"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- end of names-->
          <!-- 3rd row -->
          <v-row class="mt-n4">
          <!-- nickname -->
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="form.nickname"
              label="Nickname"
              outlined
              dense
              rounded
            ></v-text-field>
          </v-col>
          <!-- birthday -->
          <v-col cols="12" sm="6" md="3">
            <v-menu
              v-model="birthdayMenu"
              :close-on-content-click="false"
              transition="scale-transition"
            >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="form.birthday"
                label="Birthday"
                hint="YYYY-MM-DD"
                persistent-hint
                outlined
                dense
                rounded
                v-on="on"
              ></v-text-field>
            </template>
              <v-date-picker
                v-model="form.birthday"
                no-title
                @input="birthdayPicker = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <!-- sex -->
          <v-col cols="12" sm="6" md="2">
            <v-select
              v-model="form.sex_____"
              :items="gender"
              item-text="description"
              item-value="id"
              label="Gender"
              outlined
              dense
              rounded
            ></v-select>
          </v-col>
          <!-- civil status -->
          <v-col cols="12" sm="6" md="2">
            <v-select
              v-model="form.cvilstat"
              :items="civilStatus"
              item-text="description"
              item-value="id"
              label="Civil Status"
              outlined
              dense
              rounded
            ></v-select>
          </v-col>
          </v-row>
          <!-- end of 3rd row -->
          <!-- 4th row -->
          <!-- address/city/state/zip -->
          <!-- end of 4th row -->
          <!-- 5th row -->
          <v-row class="mt-n4">
            <!-- mobile number -->
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Mobile number"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
            <!-- email -->
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Mobile number"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- end of 5th row  -->
          </v-container>
        </v-card>
      </v-tab-item>
      <!-- end of personal -->
      <!-- general -->
      <v-tab-item>
        <v-card flat>
          <v-container>
            <!-- Dates and work status-->
            <v-row class="mt-4">
              <!-- work status -->
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-model="form.workstat"
                  :items="workStat"
                  item-text="descript"
                  item-value="cntrl_no"
                  label="Work Status"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- date hired -->
              <v-col cols="12" sm="6" md="3">
                <v-menu
                  v-model="dateHiredMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="form.dte_hire"
                    label="Date hired"
                    outlined
                    dense
                    rounded
                    v-on="on"
                  ></v-text-field>
                </template>
                  <v-date-picker
                    v-model="form.dte_hire"
                    no-title
                    @input="dateHiredPicker = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <!-- date regular -->
              <v-col cols="12" sm="6" md="3">
                <v-menu
                  v-model="dateRegularMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="form.dte_rglr"
                    label="Date regular"
                    outlined
                    dense
                    rounded
                    v-on="on"
                  ></v-text-field>
                </template>
                  <v-date-picker
                    v-model="form.dte_rglr"
                    no-title
                    @input="dateRegularPicker = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <!-- date resign -->
              <v-col cols="12" sm="6" md="3">
                <v-menu
                  v-model="dateResignMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="form.dte_rsgn"
                    label="Date resign"
                    outlined
                    dense
                    rounded
                    v-on="on"
                    :disabled="c_dateResign"
                  ></v-text-field>
                </template>
                  <v-date-picker
                    v-model="form.dte_rsgn"
                    no-title
                    @input="dateResignPicker = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
              <!-- end of dates and work status -->
              <!-- 2nd row -->
            <v-row class="mt-n4">
              <!-- employment status -->
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="form.emp_stat"
                  :items="emplStat"
                  item-text="descript"
                  item-value="cntrl_no"
                  label="Employment status"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- positions -->
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="form.pos_code"
                  :items="positions"
                  item-text="descript"
                  item-value="pos_code"
                  label="Positions"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- work area -->
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="form.workarea"
                  :items="workArea"
                  item-text="descript"
                  item-value="cntrl_no"
                  label="Work Area"
                  outlined
                  dense
                  rounded
              ></v-select>
              </v-col>
            </v-row>
              <!-- end of 2nd row -->
              <!-- 3rd row -->
            <v-row class="mt-n4">
              <!-- divisions -->
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="form.grp_lvl1"
                  :items="division"
                  item-text="descript"
                  item-value="pos_code"
                  label="Division"
                  outlined
                  dense
                  rounded
              ></v-select>
              </v-col>
              <!-- department  -->
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="form.grp_lvl2"
                  :items="department"
                  item-text="descript"
                  item-value="pos_code"
                  label="Department"
                  outlined
                  dense
                  rounded
              ></v-select>
              </v-col>
              <!-- section -->
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="form.grp_lvl3"
                  :items="section"
                  item-text="descript"
                  item-value="pos_code"
                  label="Section"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
            </v-row>
            <!-- end of 3rd row -->
          </v-container>
        </v-card>
      </v-tab-item>
      <!-- end of general -->
      <!-- general -->
      <v-tab-item>
        <v-card flat>
          <v-container>
          <!-- government -->
          <v-row class="mt-4">
            <!-- tin number -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="form.tax_numb"
                v-mask="maskTin"
                label="Tin number"
                outlined
                dense
                rounded
              >
              </v-text-field>
            </v-col>
            <!-- sss number -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="form.sss_numb"
                v-mask="maskSss"
                label="Sss number"
                outlined
                dense
                rounded
              >
              </v-text-field>
            </v-col>
            <!-- pagibig number -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="form.pag_ibig"
                v-mask="maskPagibig"
                label="Pagibig number"
                outlined
                dense
                rounded
              >
              </v-text-field>
            </v-col>
            <!-- philhealth number -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="form.philhlth"
                v-mask="maskPhic"
                label="Philhealth number"
                outlined
                dense
                rounded
              >
              </v-text-field>
            </v-col>
          </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        max-width="400"
      >
        <v-card>
          <v-card-title>Save new employee {{ this.form.empl_cde }}?</v-card-title>
          <v-card-text>
            Note: You are not allowed to change the System Code after you agree.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Disagree
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="dialogSave = true, dialog = false"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-if="create" @click.stop="dialog = true" text>Save</v-btn>
      <v-btn v-if="!create" @click ="update" text>Update</v-btn>
      <v-btn @click="cancel" text>Cancel</v-btn>
    </v-card-actions>
    <v-snackbar v-model="snack" :timeout="snackTimeOut" :color="snackColor">
        <h3>{{ snackText }}</h3>
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</v-app>
</template>
<script>
import axios from 'axios'
import { Form } from 'vform'
import { mask } from 'vue-the-mask'
import dmasterfilesave from '@/components/dialogs/masterfile/MasterFileSave.vue'

export default {
  name: 'NewEmployee',
  components: {
    dmasterfilesave
  },
  props: {
    employeeData: Object,
    create: Boolean
  },
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      h_firstname: '',
      h_position: '',
      snackText: '',
      snackColor: '',
      m_maskTin: null,
      m_section: null,
      m_maskSss: null,
      m_position: null,
      m_workStat: null,
      m_workArea: null,
      m_emplStat: null,
      m_maskPhic: null,
      m_division: null,
      m_department: null,
      m_maskPagibig: null,
      section: [],
      workStat: [],
      emplStat: [],
      workArea: [],
      division: [],
      positions: [],
      department: [],
      snackTimeOut: 3000,
      maskTin: '###-###-###',
      maskSss: '##-#######-#',
      maskPagibig: '####-####-####',
      maskPhic: '##-#########-#',
      tab: null,
      birthday: null,
      dateHired: null,
      dateResign: null,
      dateRegular: null,
      show: true,
      snack: false,
      dialog: false,
      loading: true,
      dialogSave: false,
      birthdayMenu: false,
      birthdayPicker: false,
      dateHiredMenu: false,
      dateHiredPicker: false,
      dateRegularMenu: false,
      dateRegularPicker: false,
      dateResignMenu: false,
      dateResignPicker: false,
      disable_dateResign: true,
      images: {
        company: require('@/assets/android-chrome-192x192.png'),
        profile: require('@/assets/me2.jpg')
      },
      tabHeaders: [
        'Personal', 'General', 'Government'
      ],
      gender: [
        {
          id: 'M',
          description: 'Male'
        },
        {
          id: 'F',
          description: 'Female'
        },
        {
          id: 'O',
          description: 'Others'
        }
      ],
      civilStatus: [
        {
          id: 'S',
          description: 'Single'
        },
        {
          id: 'M',
          description: 'Married'
        }
      ],
      form: new Form({
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
      })
    }
  },
  computed: {
    c_cardTitle () {
      return this.create ? 'Create New Employee' : 'Edit Employee Information'
    },
    c_dateResign: {
      get: function () {
        let disable = null
        const filterDateResign = this.workStat.filter((item) => {
          return item.cntrl_no === this.employeeData.workstat
        })
        const withDateResign = filterDateResign.map((item) => {
          return item.w_dte_rsgn
        })
        const objectArray = Object.entries(withDateResign)
        objectArray.forEach(([key, value]) => {
          disable = value
        })
        // disable date resign if this value is F (true)
        return disable === null ? true : disable === 'F'
      },
      set: function (newValue) {
        this.employeeData.workstat = newValue
      }
    }
    // h_position: {
    //   // getters
    //   get: function () {
    //     const findPosition = this.positions.find((item) => {
    //       return item.pos_code === this.m_position
    //     })
    //     if (this.m_position !== null) {
    //       console.log(findPosition)
    //       const position = findPosition.map((item) => {
    //         return item.descript
    //       })
    //       return position
    //     }
    //     return findPosition
    //   },
    //   // setters
    //   set: function (newValue) {
    //     this.m_position = newValue
    //   }
    // }
  },
  watch: {
    // endpoint: take note if you removed this watcher then you need to be make sure that the props are copied to new object to avoid data lose
    dialogSave: function (value) {
      if (value) {
        this.save()
        this.dialogSave = false
      }
    }
    // create: function (value) {
    //   console.log(value)
    //   if (value) {
    //     // create new
    //     this.cloneProps()
    //   } else {
    //     // edit
    //     this.cloneProps()
    //   }
    // }
  },
  methods: {
    reload () {
      this.$store.commit('resetMasterfileSelect')
      setTimeout(() => {
        this.loadWorkStat()
        this.loadEmplStat()
        this.loadPositions()
        this.loadWorkArea()
        this.loadSection()
        this.loadDepartment()
        this.loadDivision()
      }, 3000)
    },
    cancel () {
      this.$root.$emit('create', false)
    },
    cloneProps () {
      // this also a reset form
      const employeeData = this.employeeData
      this.form = new Form()
      Object.keys(employeeData).forEach(key => {
        this.form[key] = employeeData[key]
      })
      // option 2
      // this.form = Object.assign({}, employeeData)
      // option 3
      // this.form = { ...this.employeeData }
    },
    update () {

    },
    save () {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
      if (this.$store.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          this.form.post('u/maintenance/masterfile/create')
            .then(response => {
              resolve(response)
              this.snack = true
              this.snackColor = 'success'
              this.snackText = 'Successfully added!'
              this.snackTimeOut = 3000
              this.cloneProps()
              this.requestEmployeeCode()
            })
            .catch(error => {
              reject(error)
              this.snack = true
              this.snackColor = 'error'
              this.snackText = 'Error while saving.'
              this.snackTimeOut = 3000
            })
        })
      }
    },
    header () {
      this.h_firstname = 'Kenneth Kim Aguilar Laqui'
      this.h_position = 'Software Engineer'
    },
    checkEmployeeCode () {
      // call this function before save
      this.$store.dispatch('employeeCodeChecker', {
        primekey: this.primekey,
        tableName: 's_empl_mst'
      })
        .then(response => {
          if (this.form.empl_cde === response.data) {
            this.snack = true
            this.snackColor = 'error'
            this.snackText = 'System code is already exist. !'
            this.snackTimeOut = 6000
          }
        })
    },
    requestEmployeeCode () {
      this.$store.dispatch('retrieveEmployeeCode', {
        primekey: this.primekey
      })
        .then(response => {
          this.form.empl_cde = this.$store.getters.retrieveEmployeeCode
          this.form.empl_cd2 = this.$store.getters.retrieveEmployeeCode
          this.form.asso_cde = this.$store.getters.retrieveEmployeeCode
          this.form.chro_num = this.$store.getters.retrieveEmployeeCode
        })
    },
    loadWorkStat () {
      this.$store.dispatch('retrieveWorkStat', {
        primekey: this.primekey
      })
        .then(response => {
          this.workStat = this.$store.getters.retrieveWorkStat
        })
    },
    loadEmplStat () {
      this.$store.dispatch('retrieveEmplStat', {
        primekey: this.primekey
      })
        .then(response => {
          this.emplStat = this.$store.getters.retrieveEmplStat
        })
    },
    loadPositions () {
      this.$store.dispatch('retrievePositions', {
        primekey: this.primekey
      })
        .then(response => {
          this.positions = this.$store.getters.retrievePositions
        })
    },
    loadWorkArea () {
      this.$store.dispatch('retrieveWorkArea', {
        primekey: this.primekey
      })
        .then(response => {
          this.workArea = this.$store.getters.retrieveWorkArea
        })
    },
    loadDivision () {
      this.$store.dispatch('retrieveDivision', {
        primekey: this.primekey
      })
        .then(response => {
          this.division = this.$store.getters.retrieveDivision
        })
    },
    loadDepartment () {
      this.$store.dispatch('retrieveDepartment', {
        primekey: this.primekey
      })
        .then(response => {
          this.department = this.$store.getters.retrieveDepartment
        })
    },
    loadSection () {
      this.$store.dispatch('retrieveSection', {
        primekey: this.primekey
      })
        .then(response => {
          this.section = this.$store.getters.retrieveSection
        })
    }
  },
  created () {
    this.header()
    if (this.create) {
      // run once
      this.cloneProps()
      this.requestEmployeeCode()
    } else {
      // run once
      this.cloneProps()
    }
    this.loadWorkStat()
    this.loadEmplStat()
    this.loadPositions()
    this.loadWorkArea()
    this.loadSection()
    this.loadDepartment()
    this.loadDivision()
  },
  directives: {
    mask
  }
}
</script>
