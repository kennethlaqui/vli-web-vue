<template>
<!-- App.vue -->
<v-app>
  <v-app-bar :clipped-left="primaryDrawer.clipped" color="white" app elevation="2">
    <v-toolbar-title>Virtual Logic Inc.</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn to="/" class="font-weight-regular" text>PRODUCT</v-btn>
      <v-btn to="/about" class="font-weight-regular" text>SUPPORT</v-btn>
      <v-btn to="/about" class="font-weight-regular" text>PLANS</v-btn>
      <v-btn to="/about" class="font-weight-regular" text>DOCS</v-btn>
      <v-btn v-if="!loggedIn" :to="{ name: 'userLogin' }" class="font-weight-regular" text>Login</v-btn>

      <!-- <v-btn v-if="!loggedIn" :to="{ name: 'clientRegister' }" text>Register</v-btn> -->
      <v-btn v-if="loggedIn" :to="{ name: 'UserAssignedCompany' }" class="font-weight-regular" text>Dashboard</v-btn>
      <v-btn v-if="loggedIn" :to="{ name: 'userLogout' }" class="font-weight-regular" text>Logout</v-btn>
    </v-toolbar-items>
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

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
    },
    images: {
      company: require('@/assets/android-chrome-192x192.png')
    }
  }),
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  }
}
</script>
