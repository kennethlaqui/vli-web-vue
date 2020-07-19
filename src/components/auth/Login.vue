<template>
<div>
  <v-content>
    <v-container
      fluid
    >
      <v-row
        align="center"
        justify="center"
        class="mt-n12"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-card
            class="elevation-2"
            height="500px"
            width="360"
          >
            <!-- <v-toolbar
              color="primary"
              dark
              flat
              dense
            >
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer />
            </v-toolbar> -->
            <v-card-text>
              <v-row class="mt-n2">
                <v-col cols="12" align="center">
                  <v-avatar
                    class="profile"
                    color="grey"
                    size="60"
                    rounded
                  >
                    <v-img :src="this.images.logo" alt="john"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="12">
                  <h1 align="center">Login</h1>
                </v-col>
                <v-col cols="12" class="mt-n2">
                  <h3 align="center">Sign in to your account</h3>
                </v-col>
              </v-row>
              <v-form @submit.prevent="login" id="login">
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Username"
                      type="text"
                      v-model="username"
                      dense
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      id="password"
                      label="Password"
                      type="password"
                      v-model="password"
                      dense
                    />
                  </v-col>
                </v-row>
                <v-row class="mt-n2">
                  <v-col>
                    <v-btn
                      type="submit"
                      color="success"
                      form="login"
                      :disabled="disabled"
                      block
                      rounded
                    >
                      Login
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col align="center" justify="center">
                    <a>
                      <h3 class="font-weight-regular">Forgot password?</h3>
                    </a>
                  </v-col>
                </v-row>
                <v-row class="mt-4">
                  <v-col>
                    <v-btn
                      :to="{ name: 'clientRegister' }"
                      block
                      rounded
                      outlined
                    >
                      Register
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <!-- <v-card-actions>
              <v-spacer />
              <v-btn type="submit" color="success" form="login" :disabled="disabled">Login</v-btn>
            </v-card-actions> -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
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
      images: {
        company: require('@/assets/android-chrome-192x192.png'),
        profile: require('@/assets/me2.jpg'),
        logo: require('@/assets/Guin-Logo.png')
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
