<template>

  <div>

    <v-container>

      <v-card-title>Login to your account</v-card-title>

        <v-card-text>

          <v-form @submit.prevent="login" id="login" class="mt-n4">

            <!-- username label -->
            <v-row>

              <v-col>

                <h4 class="font-weight-regular">Username</h4>

              </v-col>

            </v-row>

            <!-- username field -->
            <v-row class="mt-n4">
              <v-col>

                <v-text-field
                  v-model="username"
                  placeholder="Username"
                  outlined
                  dense
                />

              </v-col>

            </v-row>

            <!-- password label -->
            <v-row class="mt-n8">

              <v-col>

                <h4 class="font-weight-regular">Password</h4>

              </v-col>

            </v-row>

            <!-- password field-->
            <v-row class="mt-n4">

              <v-col>

                <v-text-field
                  v-model="password"
                  placeholder="Password"
                  id="password"
                  type="password"
                  outlined
                  dense
                />

              </v-col>

            </v-row>

            <!-- companies label -->
            <v-row class="mt-n8" v-if="loggedIn">

              <v-col>

                <h4 class="font-weight-regular">Companies</h4>

              </v-col>

            </v-row>

            <!-- companies field-->
            <v-row class="mt-n4" v-if="loggedIn">

            <v-col>

              <v-select
                dense
                outlined
              />

            </v-col>

            </v-row>

            <!-- login button -->
            <v-row class="mt-n4">

              <v-col>

                <v-btn
                  type="submit"
                  color="primary"
                  form="login"
                  :disabled="disabled"
                  block
                  rounded
                  @click="loggedIn = true"
                >

                  Login

                </v-btn>

              </v-col>

            </v-row>

            <v-row>

              <v-col
                align="center"
                justify="center"
              >

                <a>

                  <h3 class="font-weight-regular">Forgot password?</h3>

                </a>

              </v-col>

            </v-row>

            <v-row>

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
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      disabled: false,
      loggedIn: false,
      images: {
        company: require('@/assets/android-chrome-192x192.png'),
        profile: require('@/assets/me2.jpg'),
        logo: require('@/assets/vli.png')
      }
    }
  },
  methods: {
    login () {
      // login and get acccess token
      this.disabled = true
      this.$store.dispatch('retrieveToken', {
        username: this.username,
        password: this.password
      })
        .then(response => {
          this.$router.push({ name: 'UserAssignedCompany' })
        })
    }
  }
}
</script>
