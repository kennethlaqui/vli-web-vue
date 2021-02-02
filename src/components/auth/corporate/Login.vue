<template>

  <div>

    <v-container>

      <v-card-title>Login to your account</v-card-title>

        <v-card-text>

          <v-form @submit.prevent="login" id="login" class="mt-n4">

            <!-- username label -->
            <v-row v-show="loginSuccess === false">

              <v-col>

                <h4 class="font-weight-regular">Username</h4>

              </v-col>

            </v-row>

            <!-- username field -->
            <v-row class="mt-n4" v-show="loginSuccess === false">
              <v-col>

                <v-text-field
                  v-model="username"
                  placeholder="Username"
                  :disabled="loginSuccess === true"
                  outlined
                  dense
                />

              </v-col>

            </v-row>

            <!-- password label -->
            <v-row class="mt-n8" v-show="loginSuccess === false">

              <v-col>

                <h4 class="font-weight-regular">Password</h4>

              </v-col>

            </v-row>

            <!-- password field-->
            <v-row class="mt-n4" v-show="loginSuccess === false">

              <v-col>

                <v-text-field
                  v-model="password"
                  placeholder="Password"
                  id="password"
                  type="password"
                  :disabled="loginSuccess === true"
                  v-show="loginSuccess === false"
                  outlined
                  dense
                />

              </v-col>

            </v-row>

            <!-- companies label -->
            <v-row v-show="loginSuccess">

              <v-col>

                <h4 class="font-weight-regular">Company</h4>

              </v-col>

            </v-row>

            <!-- companies field-->
            <v-row class="mt-n4" v-show="loginSuccess">

            <v-col>

              <v-select
                :items="companies"
                item-text="com_name"
                item-value="primekey"
                dense
                outlined
              />

            </v-col>

            </v-row>

            <!-- login button -->
            <v-row class="mt-n4">

              <v-col>

                <v-btn
                  v-if="loginSuccess === false"
                  type="submit"
                  color="primary"
                  form="login"
                  :disabled="disabled"
                  block
                  rounded
                >

                  Login

                </v-btn>

                <v-btn
                  v-else
                  color="primary"
                  block
                  rounded
                >

                  Proceed

                </v-btn>

              </v-col>

            </v-row>

            <!-- proceed button-->
            <!-- <v-row class="mt-n4" v-if="loggedIn">

              <v-col>
              </v-col>

            </v-row> -->

            <v-row v-show="loginSuccess === false">

              <v-col
                align="center"
                justify="center"
              >

                <a>

                  <h3 class="font-weight-regular">Forgot password?</h3>

                </a>

              </v-col>

            </v-row>

            <v-row v-show="loginSuccess === false">

              <v-col>

                <v-btn
                  :to="{ name: 'clientRegister' }"
                  block
                  rounded
                  outlined
                >

                  Create an account

                </v-btn>

              </v-col>

            </v-row>

          </v-form>

        </v-card-text>

    </v-container>

    <router-view></router-view>

  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      disabled: false,
      loggedIn: false,
      loginSuccess: false,
      companies: [],
      autheticatedUserID: '',
      images: {
        company: require('@/assets/android-chrome-192x192.png'),
        profile: require('@/assets/me2.jpg'),
        logo: require('@/assets/vli.png')
      }
    }
  },
  methods: {
    login () {
      this.$root.$emit('loginLoading', true)
      // login and get acccess token
      this.disabled = true
      this.$store.dispatch('retrieveToken', {
        username: this.username,
        password: this.password
      })
        .then(() => {
          this.$store.dispatch('authenticatedUser', {
          })
            .then(() => {
              this.autheticatedUserID = this.$store.getters.authenticatedUser.cntrl_no
              this.$root.$emit('loginLoading', false)
              this.getCompany()
            })
        })
    },
    async getCompany () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.$store.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('c/login/company/', {
              params: {
                cntrl_no: this.autheticatedUserID
              }
            })
              .then(response => {
                this.companies = response.data
                this.loginSuccess = true
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
        }
      } catch (error) {
      }
    }
  }
}
</script>
