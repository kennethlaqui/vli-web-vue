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
                v-model="profile.com_name"
                label="Company Name"
                dense
                outlined
              />

            </v-col>

            <!-- company shortname -->
            <v-col md="3">

              <v-text-field
                v-model="shortName"
                label="Company Short Name"
                dense
                outlined
              />

            </v-col>

            <!-- prefix -->
            <v-col md="3">

              <v-text-field
                v-model="prefix"
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
                v-model="profile.address_"
                label="Address"
                dense
                outlined
              />

            </v-col>

            <v-col md="3">

              <!-- states -->
              <v-text-field
                v-model="profile.state___"
                label="State"
                dense
                outlined
              />

            </v-col>

            <v-col md="3">

              <!-- city -->
              <v-text-field
                v-model="profile.city____"
                label="City"
                dense
                outlined
              />

            </v-col>

            <v-col md="2">

              <!-- city -->
              <v-text-field
                v-model="profile.zip_code"
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
                v-model="profile.vli_industry"
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
                  v-model="profile.frst_nme"
                  label="First Name"
                  dense
                  outlined
                />

              </v-col>

              <v-col md="4">

                <!-- last name -->
                <v-text-field
                  v-model="profile.last_nme"
                  label="Last Name"
                  dense
                  outlined
                />

              </v-col>

              <v-col md="4">

                <!-- city -->
                <v-text-field
                  v-model="profile.position"
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
                  v-model="profile.email___"
                  label="Email"
                  dense
                  outlined
                />

              </v-col>

              <v-col md="4">

                <!-- mobile -->
                <v-text-field
                  v-model="profile.mobile__"
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
            <!-- <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card> -->

            <v-btn
              color="primary"
              @click="e1 = 1"
            >
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>

    </v-stepper>

      <!-- </v-container> -->

      <!-- <v-tabs
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

    </v-tabs> -->

    <!-- </v-card> -->

  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'clientView',
  props: {
    profileId: {
      type: String
    }
  },
  data () {
    return {
      shortName: '',
      prefixExist: '',
      cntrl_no: '',
      prefix: '',
      tab: null,
      e1: 1,
      loading: true,
      industries: [],
      profile: [],
      tabHeaders: [
        'Personal', 'General', 'Government', 'Payroll', 'Salary'
      ]
    }
  },
  methods: {
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
  }
}
</script>
