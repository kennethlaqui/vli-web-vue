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
          v-if="loggedIn"
          @click="logout"
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
        <systemLogin></systemLogin>

      </v-container>

    </v-main>

  </v-app>

</template>

<script>
import systemLogin from '@/views/system/auth/Login.vue'

export default {
  name: 'SystemHome',
  components: {
    systemLogin
  },
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
      return this.$store.getters.systemLoggedIn
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('destroySystemToken')
        .then(response => {
          // this.$router.push({ name: 'home' })
        })
    }
  }
}
</script>
