<template>

  <div>

    <v-main>

      <v-row
        align="end"
        justify="end"
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
            :loading="loading"
          >
            <v-tabs
            >
              <v-tab>Corporate</v-tab>

              <v-tab>Personal</v-tab>

              <!-- corporate -->
              <v-tab-item>

                <corporateLogin></corporateLogin>

              </v-tab-item>

              <!-- personal -->
              <v-tab-item>

                <personalLogin></personalLogin>

              </v-tab-item>

            </v-tabs>

          </v-card>

        </v-col>

      </v-row>

    </v-main>

    <router-view></router-view>

  </div>

</template>

<script>
import corporateLogin from '@/components/auth/corporate/Login.vue'
import personalLogin from '@/components/auth/personal/Login.vue'

export default {
  name: 'Login',
  components: {
    corporateLogin,
    personalLogin
  },
  data () {
    return {
      username: '',
      password: '',
      loading: false,
      disabled: false,
      images: {
        company: require('@/assets/android-chrome-192x192.png'),
        profile: require('@/assets/me2.jpg'),
        logo: require('@/assets/vli.png')
      }
    }
  },
  created () {
    this.$root.$on('loginLoading', (value) => {
      this.loading = value
    })
  }
}
</script>
