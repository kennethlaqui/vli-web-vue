<template>
<!-- App.vue -->

<v-app>
  <v-app-bar :clipped-left="primaryDrawer.clipped" app>

    <v-toolbar-title>Virtual Logic Inc.</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/about" text>About</v-btn>
      <v-btn v-if="!loggedIn" :to="{ name: 'userLogin' }" text>Login</v-btn>
      <v-btn v-if="!loggedIn" :to="{ name: 'clientRegister' }" text>Register</v-btn>
      <v-btn v-if="loggedIn" :to="{ name: 'UserAssignedCompany' }" text>Dashboard</v-btn>
      <v-btn v-if="loggedIn" :to="{ name: 'userLogout' }" text>Logout</v-btn>
    </v-toolbar-items>
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-content>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-content>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>
<script>
export default {
  data: () => ({
    drawers: ['Default (no property)', 'Permanent', 'Temporary'],
    primaryDrawer: {
      model: null,
      type: 'default (no property)',
      clipped: true,
      floating: false,
      mini: false
    },
    footer: {
      inset: false
    }
  }),
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  }
}
</script>
