<template>

  <div>

    <v-main>

      <v-row
        align="center"
        justify="center"
        class="mt-n12"
      >

        <v-col
          cols="12"
          md="6"
        >

          <v-card
            class="elevation-3"
          >

            <clientRegister></clientRegister>

          </v-card>

        </v-col>

      </v-row>

    </v-main>

    <router-view></router-view>

  </div>

</template>

<script>
import clientRegister from '@/components/auth/register/ClientRegister.vue'

export default {
  name: 'Register',
  components: {
    clientRegister
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
