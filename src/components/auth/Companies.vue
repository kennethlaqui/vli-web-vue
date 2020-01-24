<template>
<v-app>
  <v-content v-if="!loading">
    <v-container
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-card class="elevation-12">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Welcome, {{ this.welcome }}</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
                <v-select
                  v-model="primekey"
                  :items="companies"
                  item-text="co_name_"
                  item-value="primekey"
                  label="Choose your company"
                  @change="getSelectedValue"
                >
                </v-select>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn type="submit" color="success" :disabled="disabled" @click="proceedToDashboard()">Proceed</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</v-app>
</template>
<script>
export default {
  name: 'UserAssignedCompany',
  data () {
    return {
      welcome: '',
      primekey: '',
      user_num: '',
      vli_subs: '',
      user_id_: '',
      user_nme: '',
      companies: [],
      loading: true,
      disabled: true
    }
  },
  methods: {
    welcomeUser () {
      this.$store.dispatch('retrieveUser')
        .then(response => {
          this.loading = false
          this.welcome = this.$store.getters.retrieveUser.user_nme
        })
    },
    companyLogin () {
      // after login, get user's info
      this.$store.dispatch('retrieveUser')
        .then(response => {
          // retrieve primekey based on vli_subs and user_num from retrieveUser
          this.$store.dispatch('retrievePrimekey', {
            vli_subs: this.$store.getters.retrieveUser.vli_subs,
            user_num: this.$store.getters.retrieveUser.user_num
          })
            .then(response => {
              // retrieve company associate with primekey
              this.$store.dispatch('retrieveCompany', {
                primekey: this.$store.getters.retrievePrimekey
              })
                .then(response => {
                  this.companies = this.$store.getters.retrieveCompany
                })
            })
        })
    },
    getSelectedValue () {
      this.disabled = false
      // this.$cookies.set('primekey', this.primekey, '1d')
      localStorage.setItem('primekey', this.primekey)
    },
    proceedToDashboard () {
      this.$router.push({ name: 'userDashboard' })
    }
  },
  created () {
    this.welcomeUser()
    this.companyLogin()
  }
}
</script>
