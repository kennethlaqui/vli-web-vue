<template>

  <v-app>

    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      color="primary"
      dark
      app>

      <v-toolbar-title>Virtual Logic Inc.</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>

        <v-btn
          to="/"
          text
        >
          About Us
        </v-btn>

        <v-btn
          to="/"
          text
        >
          Product
        </v-btn>

        <v-btn
          to="/about"
          text
        >
          Support
        </v-btn>

        <v-btn
          to="/about"
          text
        >
          Pricing
        </v-btn>

        <v-btn
          to="/about"
          text
        >
          Documentaion
        </v-btn>

        <v-btn
          v-if="!loggedIn"
          :to="{ name: 'userLogin' }"
          text
        >
          Login
        </v-btn>

        <v-btn
          v-if="loggedIn"
          :to="{ name: 'UserAssignedCompany' }"
        >
          Dashboard
        </v-btn>

        <v-btn
          v-if="loggedIn"
          :to="{ name: 'userLogout' }"
          text
        >
          Logout
        </v-btn>

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
