<template>

  <div>

    <v-card
      height="500px"
      elevation="1"
    >

      <v-app-bar
        color="blue"
        dense
        dark
        elevation="1"
      >

        <v-btn v-if="$routerHistory.hasPrevious()" :to="{ path: $routerHistory.previous().path }" icon exact>

          <v-icon>mdi-arrow-left</v-icon>

        </v-btn>

        <v-toolbar-title>Client Profile</v-toolbar-title>

      </v-app-bar>

      <v-container fluid>

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
              label="Prefix Name"
              hint="Manually Assign Prefix Name or Generate"
              persistent-hint
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
              label="Address  "
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

        <v-divider></v-divider>

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

      </v-container>

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

    </v-card>

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
      loading: true,
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
  }
}
</script>
