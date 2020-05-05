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
          <v-card class="elevation-2" loading>
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Login to VLI System</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="login" id="login">
                <v-text-field
                  label="ID"
                  name="login"
                  prepend-icon="person"
                  type="text"
                  v-model="username"
                />

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                  v-model="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn type="submit" color="success" form="login" :disabled="disabled">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
  <router-view></router-view>
</v-app>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      disabled: false
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
