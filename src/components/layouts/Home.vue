<template>

  <v-app>

    <v-toolbar
      color="white"
      dense
    >

      <v-toolbar-title class="grey--text">Virtual Logic Inc</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        class="grey--text"
        to="/about"
        text
      >

        About Us

      </v-btn>

      <v-btn
        class="grey--text"
        to="/product"
        text
        plain
      >

        Product

      </v-btn>

      <v-btn
        class="grey--text"
        to="/about"
        text
      >

        Support

      </v-btn>

      <v-btn
        class="grey--text"
        to="/about"
        text
      >

        Pricing

      </v-btn>

      <v-btn
        class="grey--text"
        to="/about"
        text
      >

        Documentaion

      </v-btn>

      <v-btn
        class="grey--text"
        v-if="!loggedIn"
        :to="{ name: 'userLogin' }"
        text
      >

        Login

      </v-btn>

      <v-btn
        class="grey--text"
        v-if="loggedIn"
        :to="{ name: 'UserAssignedCompany' }"
        text
      >

        Dashboard

      </v-btn>

      <v-btn
        class="grey--text"
        v-if="loggedIn"
        :to="{ name: 'userLogout' }"
        text
      >

        Logout

      </v-btn>

    </v-toolbar>

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
