// import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: colors.shades.black
      }
    }
  }
  // remove in production
  // icons: {
  //   iconfont: 'mdi' // default - only for display purposes
  // }
})
