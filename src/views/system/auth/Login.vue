<template>

  <div>

    <v-main>

      <v-container>

      <v-row
        align="center"
        justify="center"
        class="mt-n12"
      >

        <v-col
          cols="12"
          md="4"
        >

          <v-card
            class="elevation-3"
            width="360"
            outlined
          >

            <systemLogin></systemLogin>

          </v-card>

        </v-col>

      </v-row>

      </v-container>

    </v-main>

    <router-view></router-view>

  </div>

</template>

<script>
import systemLogin from '@/components/auth/system/Login.vue'

export default {
  name: 'Login',
  components: {
    systemLogin
  },
  data () {
    return {
      username: '',
      password: '',
      disabled: false,
      images: {
        company: require('@/assets/android-chrome-192x192.png'),
        profile: require('@/assets/me2.jpg'),
        logo: require('@/assets/vli.png')
      }
    }
  }
}
</script>
