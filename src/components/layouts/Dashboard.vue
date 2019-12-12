<template>
<!-- App.vue -->

<v-app>
  <v-navigation-drawer :clipped="primaryDrawer.clipped" app>
    <!-- -->
  </v-navigation-drawer>

  <v-app-bar :clipped-left="primaryDrawer.clipped" app>
    <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
    />
    <v-toolbar-title>Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="loggedIn" to="/logout" text>Logout</v-btn>
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
