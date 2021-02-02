<template>

  <div>

    <v-stepper non-linear v-model="e1">

      <v-stepper-header>

        <v-stepper-step
          editable
          :complete="e1 > 1"
          step="1"
        >

          Basic Information

        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          editable
          :complete="e1 > 2"
          step="2"
        >

          Owner's Information

        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          editable
          step="3"
        >

          Parameters

        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          editable
          step="4"
        >

          Subscription

        </v-stepper-step>

      </v-stepper-header>

      <v-stepper-items>

        <v-stepper-content step="1">

          <v-row>

            <v-col md="6">

              <!-- company name -->
              <v-text-field
                v-model="form.com_name"
                label="Company Name"
                dense
                outlined
              />

            </v-col>

            <!-- company shortname -->
            <v-col md="3">

              <v-text-field
                v-model="form.co_sname"
                label="Company Short Name"
                dense
                outlined
              />

            </v-col>

            <!-- prefix -->
            <v-col md="3">

              <v-text-field
                v-model="form.co_prefx"
                append-icon="mdi-sync"
                label="Company Prefix Name"
                dense
                outlined
                @click:append="generatePrefix"
              />

            </v-col>

          </v-row>

          <v-row class="mt-n4">

            <v-col md="4">

              <!-- address -->
              <v-text-field
                v-model="form.address_"
                label="Address"
                dense
                outlined
              />

            </v-col>

            <v-col md="3">

              <!-- states -->
              <v-text-field
                v-model="form.state___"
                label="State"
                dense
                outlined
              />

            </v-col>

            <v-col md="3">

              <!-- city -->
              <v-text-field
                v-model="form.city____"
                label="City"
                dense
                outlined
              />

            </v-col>

            <v-col md="2">

              <!-- city -->
              <v-text-field
                v-model="form.zip_code"
                label="Zip Code"
                dense
                outlined
              />

            </v-col>

          </v-row>

          <v-row class="mt-n4">

            <!-- industry -->
            <v-col md="4">

              <v-select
                v-model="form.vli_industry"
                :items="industries"
                label="Industry"
                item-text="descript"
                item-value="cntrl_no"
                dense
                outlined
              ></v-select>

            </v-col>

          </v-row>

          <v-btn
            color="primary"
            @click="e1 = 2"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>

        </v-stepper-content>

          <v-stepper-content step="2">
            <v-row>

              <v-col md="4">

                <!-- first name -->
                <v-text-field
                  v-model="form.frst_nme"
                  label="First Name"
                  dense
                  outlined
                />

              </v-col>

              <v-col md="4">

                <!-- last name -->
                <v-text-field
                  v-model="form.last_nme"
                  label="Last Name"
                  dense
                  outlined
                />

              </v-col>

              <v-col md="4">

                <!-- city -->
                <v-text-field
                  v-model="form.position"
                  label="Position"
                  dense
                  outlined
                />

              </v-col>

            </v-row>

            <v-row class="mt-n4">

              <v-col md="4">

                <!-- email address -->
                <v-text-field
                  v-model="form.email___"
                  label="Email"
                  dense
                  outlined
                />

              </v-col>

              <v-col md="4">

                <!-- mobile -->
                <v-text-field
                  v-model="form.mobile__"
                  label="Mobile"
                  dense
                  outlined
                />

              </v-col>

            </v-row>

            <v-btn
              color="primary"
              @click="e1 = 3"
            >
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-btn
              color="primary"
              @click="e1 = 4"
            >
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="4">

            <v-row>

              <v-col md="2">

                <v-select
                  v-model="form.demo____"
                  :items="demoArray"
                  label="Demo"
                  item-text="descript"
                  item-value="id"
                  dense
                  outlined
                />

              </v-col>

              <v-col md="2">

                <v-select
                  v-model="form.trial_days"
                  :items="trialDaysArray"
                  label="Days"
                  item-text="descript"
                  item-value="id"
                  dense
                  outlined
                />

              </v-col>

              <v-col md="4">

                <!-- start trial -->
                <v-menu
                  ref="strtTrialMenu"
                  v-model="strtTrialMenu"
                  :close-on-content-click="false"
                  :return-value.sync="form.strt_trial"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >

                  <template v-slot:activator="{ on }">

                    <v-text-field
                      v-model="form.strt_trial"
                      label="Start Trial"
                      v-on="on"
                      dense
                      outlined
                    />

                  </template>

                  <!-- dynamic start date show -->
                  <v-date-picker v-model="form.strt_trial" no-title scrollable>

                  <v-spacer></v-spacer>

                  <v-btn text color="primary" @click="strtTrialMenu = false">Cancel</v-btn>

                  <v-btn text color="primary" @click="$refs.strtTrialMenu.save(form.strt_trial)">OK</v-btn>

                  </v-date-picker>

                </v-menu>

              </v-col>

              <v-col md="4">

              <!-- end trial -->
                <v-menu
                  ref="endTrialMenu"
                  v-model="endTrialMenu"
                  :close-on-content-click="false"
                  :return-value.sync="form.end_trial"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >

                  <template v-slot:activator="{ on }">

                    <v-text-field
                      v-model="form.end_trial"
                      label="End Trial"
                      v-on="on"
                      dense
                      outlined
                    />

                  </template>

                  <!-- dynamic start date show -->
                  <v-date-picker v-model="form.end_trial" no-title scrollable>

                  <v-spacer></v-spacer>

                  <v-btn text color="primary" @click="endTrialMenu = false">Cancel</v-btn>

                  <v-btn text color="primary" @click="$refs.endTrialMenu.save(form.end_trial)">OK</v-btn>

                  </v-date-picker>

                </v-menu>

              </v-col>

            </v-row>

            <v-row class="mt-n4">

              <v-col md="2">

                <v-select
                  v-model="form.subscribed"
                  :items="subscribedArray"
                  label="Subscribed"
                  item-text="descript"
                  item-value="id"
                  dense
                  outlined
                />

              </v-col>

              <v-col md="2">

                <v-select
                  v-model="form.disabled"
                  :items="disabledArray"
                  label="Disabled"
                  item-text="descript"
                  item-value="id"
                  dense
                  outlined
                />

              </v-col>

              <v-col md="2">

                <v-text-field
                  v-model="form.com_count"
                  label="Company"
                  dense
                  outlined
                />

              </v-col>

              <v-col md="2">

                <v-select
                  v-model="form.approved"
                  :items="approvedArray"
                  label="Approved"
                  item-text="descript"
                  item-value="id"
                  dense
                  outlined
                />

              </v-col>

            </v-row>

            <v-btn
              color="primary"
              @click="save"
            >
              Save
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>

    </v-stepper>

  </div>

</template>

<script>
import axios from 'axios'
// var moment = require('moment')

export default {
  name: 'clientView',
  props: {
    profileId: {
      type: String
    }
  },
  data () {
    return {
      form: {
        cntrl_no: '',
        com_name: '',
        address_: '',
        state___: '',
        city____: '',
        zip_code: '',
        frst_nme: '',
        last_nme: '',
        position: '',
        mobile__: '',
        email___: '',
        email_verified_at: '',
        vli_industry: '',
        othr_com: '',
        src_uuid: '',
        approved: 'F',
        vli_subs_hdr: '',
        created_at: '',
        updated_at: '',
        updated_by: '',
        co_sname: '',
        co_prefx: '',
        demo____: 'F',
        trial_days: '1',
        strt_trial: '',
        end_trial: '',
        com_count: '1',
        subscribed: 'F',
        disabled: 'F'
      },
      shortName: '',
      prefixExist: '',
      cntrl_no: '',
      prefix: '',
      strtTrial: '',
      endTrial: '',
      demo: 'T',
      subscribed: 'F',
      disabled: 'F',
      approved: 'F',
      companyCount: 1,
      trialDays: '1',
      strtTrialMenu: false,
      endTrialMenu: false,
      tab: null,
      e1: 1,
      loading: true,
      industries: [],
      profile: [],
      tabHeaders: [
        'Personal', 'General', 'Government', 'Payroll', 'Salary'
      ],
      demoArray: [
        {
          id: 'T',
          descript: 'Yes'
        },
        {
          id: 'F',
          descript: 'No'
        }
      ],
      subscribedArray: [
        {
          id: 'T',
          descript: 'Yes'
        },
        {
          id: 'F',
          descript: 'No'
        }
      ],
      disabledArray: [
        {
          id: 'T',
          descript: 'Yes'
        },
        {
          id: 'F',
          descript: 'No'
        }
      ],
      trialDaysArray: [
        {
          id: '7',
          descript: '7'
        },
        {
          id: '15',
          descript: '15'
        },
        {
          id: '30',
          descript: '30'
        }
      ],
      approvedArray: [
        {
          id: 'T',
          descript: 'Yes'
        },
        {
          id: 'F',
          descript: 'No'
        }
      ]
    }
  },
  watch: {
    // end_trial () {
    //   this.form.strt_trial = moment(new Date()).add(this.trial_days, 'days').format('YYYY-MM-DD')
    // }
  },
  methods: {
    // initDate () {
    //   this.form.strt_trial = moment(new Date()).add(7, 'days').format('YYYY-MM-DD')
    // },
    generatePrefix () {
      let split = this.profile.com_name.split(' ')
      let length = 3
      let result = ''
      for (let i = 0; i < length; i++) {
        result += split[i].charAt(0).toUpperCase()
      }
      this.getPrefix(result)
      this.prefix = result
    },
    save () {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('system_token')
      if (this.$store.getters.systemLoggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('s/client/approve', this.form)
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    async getIndustries () {
      try {
        await new Promise((resolve, reject) => {
          axios.get('l/helper/common/industry')
            .then(response => {
              this.industries = response.data
              resolve(response)
            })
            .catch(errors => {
              reject(errors)
            })
        })
      } catch (error) {
      }
    },
    async getPrefix (prefixValue) {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('system_token')
        if (this.$store.getters.systemLoggedIn) {
          await new Promise((resolve, reject) => {
            axios.get(`l/helper/prefix/${prefixValue}`)
              .then(response => {
                this.prefixExist = response.data
                resolve(response)
              })
              .catch(errors => {
                reject(errors)
              })
          })
        }
      } catch (error) {
      }
    },
    async clientProfile () {
      this.loading = true
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('system_token')
        if (this.$store.getters.systemLoggedIn) {
          await new Promise((resolve, reject) => {
            axios.get(`s/client/profile/${this.$route.params.cntrl_no}`)
              .then(response => {
                this.profile = response.data[0]
                Object.keys(this.profile).forEach(key => {
                  this.form[key] = this.profile[key]
                })
                // console.log(this.form.trial_days)
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
    }
  },
  created () {
    this.clientProfile()
    this.getIndustries()
    this.initDate()
    // console.log(profile)
  }
}
</script>
