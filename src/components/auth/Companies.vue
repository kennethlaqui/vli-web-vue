<template>
<v-app>
  <v-content>
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
              <v-toolbar-title>Companies</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="companyLogin" id="proceed">
                <v-select
                  :items=""
                  readonly
                  label="Please choose"
                ></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn type="submit" color="success" form="proceed">Login</v-btn>
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
  data: () => ({
    user_num: '',
    vli_subs: '',
    companies: [],
    proceed: false
  }),
  methods: {
    companyLogin () {
      // after login, get user's info
      this.$store.dispatch('retrieveUser')
        .then(response => {
          this.$store.dispatch('retrieveUserPrimekey', {
            vli_subs: this.$store.getters.retrieveUser.vli_subs,
            user_num: this.$store.getters.retrieveUser.user_num
          })
            .then(response => {
              this.$store.dispatch('retrieveUserAssignedCompany', {
                primekey: 0
              })
                .then(response => {
                  this.companies = this.$store.getters.retrieveUserAssignedCompany.co_name_
                })
            })
        })
    }
  },
  created () {
    this.companyLogin()
  }
}
</script>
