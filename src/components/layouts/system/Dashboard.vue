<template>

  <v-app>

    <!-- <v-system-bar
      app
      color="grey lighten-5"
    >
      <v-spacer></v-spacer>

      <span>{{ timestamp }}</span>

    </v-system-bar> -->

    <v-navigation-drawer
      v-model="drawerRight"
      drawer="false"
      app
      clipped
      right
    >

    <v-list rounded dense>

      <v-subheader>Easy Navigation</v-subheader>

      <v-list-item-group v-model="sideItem">

        <v-list-item
          v-for="(sideItem, item) in sideItems"
          :key="item"
          @click="callFunction(item)"
        >

          <v-list-item-icon>
            <v-icon v-text="sideItem.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="sideItem.text"></v-list-item-title>

          </v-list-item-content>

        </v-list-item>

      </v-list-item-group>

    </v-list>

    </v-navigation-drawer>

      <v-app-bar
        app
        clipped-right
        color="blue"
        dark
        dense
        elevation="1"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

        <v-toolbar-title>System Dashboard</v-toolbar-title>

        <v-spacer />

        <v-btn icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>

        <v-btn icon>

          <v-badge
            v-model="show"
            color="purple"
            overlap
            right
          >

          <template v-slot:badge>

            <span>6</span>

          </template>

          <v-icon>mdi-email</v-icon>

          </v-badge>

        </v-btn>

        <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight" />

      </v-app-bar>

    <!-- left -->
    <v-navigation-drawer
      v-model="drawer"
      app
    >

    <template v-slot:prepend>

      <v-skeleton-loader
        v-if="loading"
        type="list-item-avatar-two-line"
        class="py-1"
      >

      </v-skeleton-loader>

        <v-list-item v-else two-line>

          <v-list-item-avatar>

            <img :src="images.company">

          </v-list-item-avatar>

          <v-list-item-content>

            <v-list-item-title>Virtual Logic Inc.</v-list-item-title>

            <v-list-item-subtitle>System Control Panel</v-list-item-subtitle>

          </v-list-item-content>

        </v-list-item>

    </template>

    <v-divider />

    <v-list
      dense
      rounded
    >

      <v-list-item
        :to="{ name: 'systemDashboard' }"
        link
      >

        <v-list-item-action>

          <v-icon>mdi-view-dashboard-outline</v-icon>

        </v-list-item-action>

        <v-list-item-content>

          <v-list-item-title>Dashboard</v-list-item-title>

        </v-list-item-content>

      </v-list-item>

      <!-- left items -->
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
        color="indigo"
      >

        <template v-slot:activator>

          <v-list-item-content>

            <v-list-item-title v-text="item.title"></v-list-item-title>

          </v-list-item-content>

        </template>

        <!-- left subitems -->
        <v-list-item
          v-for="subItem in item.items"
          :key="subItem.title"
          :to="subItem.url"
          link
        >

          <v-list-item-icon>

            <v-icon v-text="subItem.action"></v-icon>

          </v-list-item-icon>

          <v-list-item-title v-text="subItem.title"></v-list-item-title>

        </v-list-item>

      </v-list-group>

    </v-list>

    <!-- account drawer -->
    <template v-slot:append>

      <v-navigation-drawer
        v-model="drawer"
      >

        <v-divider />

        <div class="px-3 py-3 d-flex">

          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            top
            offset-y
          >

            <template v-slot:activator="{ on }">

              <v-btn
                color="indigo"
                dark
                v-on="on"
                small
                rounded
              >

                Account

              </v-btn>

            </template>

            <v-card>

              <v-system-bar
                dense
                height="10px"
              >

              </v-system-bar>

              <v-list
                dense
              >

                <v-list-item
                  link
                >

                  <v-list-item-avatar>

                    <img :src="images.profile" alt="John">

                  </v-list-item-avatar>

                  <v-list-item-content>

                    <v-list-item-title>{{ fullName }}</v-list-item-title>

                    <v-list-item-subtitle>{{ userName }} - {{ isAdmin ? 'Admin' : 'Personnel' }}</v-list-item-subtitle>

                  </v-list-item-content>

                </v-list-item>

              </v-list>

              <v-divider />

              <v-list
                dense
              >

                <v-list-item
                  v-for="(account, item) in accounts"
                  :key="item"
                  :to="account.url"
                  link
                  @click="callFunction(item)"
                >
                  <v-list-item-icon>

                    <v-icon v-text="account.icon"></v-icon>

                  </v-list-item-icon>

                  <v-list-item-content>

                    <v-list-item-title v-text="account.text"></v-list-item-title>

                  </v-list-item-content>

                </v-list-item>

                <v-list-item
                  link
                  @click="logout()"
                >

                  <v-list-item-icon>

                    <v-icon>mdi-logout-variant</v-icon>

                  </v-list-item-icon>

                  <v-list-item-content>

                    <v-list-item-title>Logout</v-list-item-title>

                  </v-list-item-content>

                </v-list-item>

              </v-list>

            </v-card>

          </v-menu>

          <v-spacer />

          <!-- dark mode -->
          <v-btn
            icon
            small
            @click="toggleTheme"
          >

            <!-- <v-icon v-if="theme == 'dark'">mdi-brightness-4</v-icon> -->

            <v-icon>mdi-brightness-7</v-icon>

          </v-btn>

        </div>

      </v-navigation-drawer>

    </template>

    </v-navigation-drawer>

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
import axios from 'axios'

export default {
  name: 'System-Dashboard',
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      fullName: '',
      userName: '',
      companyName: '',
      companyPrex: '',
      moduleName: '',
      timestamp: '',
      vli_subs: '',
      user_num: '',
      user_id_: '',
      user_nme: '',
      userData: {},
      isAdmin: false,
      drawer: true,
      drawer2: true,
      drawerRight: false,
      menu: false,
      themes: null,
      dark: false,
      loading: true,
      showCreateEmployee: false,
      show: false,
      right: false,
      left: false,
      images: {
        company: require('@/assets/android-chrome-192x192.png'),
        profile: require('@/assets/me2.jpg')
      },
      items: [
        {
          action: 'mdi-folder-plus-outline',
          title: 'Clients',
          active: true,
          items: [
            { action: 'mdi-calendar-plus', title: 'Client Request', url: { name: 'systemClients' } },
            { action: 'mdi-calendar-clock', title: 'Subscriber', url: { name: 'manPower' } },
            { action: 'mdi-beach', title: 'Leaves', url: 'about' }
          ]
        }
        // {
        //   action: 'mdi-calculator',
        //   title: 'Payroll',
        //   active: false,
        //   items: [
        //     { action: 'mdi-calculator', title: 'Compute', url: 'about' },
        //     { action: 'mdi-currency-usd', title: 'Others', url: { name: 'PayrollHeader' } }
        //   ]
        // },
        // {
        //   action: 'mdi-file-chart',
        //   title: 'Reports',
        //   active: false,
        //   items: [
        //     { action: 'mdi-beach', title: 'Leave Summary', url: 'about' }
        //   ]
        // },
        // {
        //   action: 'mdi-cog-outline',
        //   title: 'Maintenance',
        //   active: false,
        //   items: [
        //     { action: 'mdi-account-group-outline', title: 'Masterfile', url: { name: 'UserMasterfile' } },
        //     { action: 'mdi-animation-outline', title: 'Reference File', url: { name: 'reference' } }
        //   ]
        // },
        // {
        //   action: 'mdi-fingerprint',
        //   title: 'Biometrics',
        //   active: false,
        //   items: [
        //     { action: 'mdi-upload', title: 'Device', url: { name: 'biometricsDevice' } },
        //     { action: 'mdi-upload', title: 'Online', url: { name: 'biometricsOnline' } },
        //     { action: 'mdi-upload', title: 'API', url: { name: 'biometricsApi' } }
        //   ]
        // }
      ],
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings']
      ],
      sideItem: 1,
      sideItems: [
        { text: 'Create Directory', icon: 'folder' },
        { text: 'Create New Employee', icon: 'people' }
        // { text: 'Events', icon: 'mdi-flag', url: { name: 'easyEvents' } }
      ],
      accounts: [
        { text: 'Switch Company', icon: 'mdi-sync', url: { name: 'UserAssignedCompany' } },
        { text: 'Settings and admin', icon: 'mdi-cog-outline' }
      ]
    }
  },
  computed: {
    // theme () {
    //   return this.$vuetify.theme.dark ? 'dark' : 'light'
    // },
    // loggedIn () {
    //   return this.$store.getters.loggedIn
    // },
    // showDialog () {
    //   return this.$store.getters.showDialog
    // }
  },
  watch: {
    // themes () {
    //   const l = this.themes
    //   this[l] = !this[l]

    //   setTimeout(() => (this[l] = false), 3000)

    //   this.themes = null
    //   this.$vuetify.theme.dark = this.dark
    // }
  },
  methods: {
    getNow () {
      const today = new Date()
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      const dateTime = date + ' ' + time
      this.timestamp = dateTime
    },
    toggleTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    async systemUser () {
      this.loading = true
      try {
        await new Promise((resolve, reject) => {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('system_token')
          axios.get('/s/auth/user', {
          })
            .then(response => {
              this.userName = response.data.username
              this.fullName = response.data.name
              this.isAdmin = response.data.is_admin
              this.loading = false
              resolve(response)
            })
            .catch(error => {
              reject(error)
              this.logout()
            })
        })
      } catch (error) {
        this.logout()
      }
    },
    async retrieveSubscriber () {
      this.loading = true
      try {
        await new Promise((resolve, reject) => {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('system_token')
          axios.get('u/subscriber', {
            params: {
              vli_subs: this.primekey
            }
          })
            .then(response => {
              this.subscriber = response.data
              const subscriber = this.subscriber.map(e => ({
                cntrlNum: `${e.cntrl_no}`,
                vliClnt_: `${e.vli_clnt}`,
                coSname_: `${e.co_sname}`,
                clntPrex: `${e.clnt_pre}`
              }))
              this.companyName = subscriber[0].vliClnt_
              this.companyPrex = subscriber[0].clntPrex
              resolve(response)
              this.loading = false
            })
            .catch(error => {
              reject(error)
            })
        })
      } catch (error) {
      }
    },
    getCurrentUser () {
      this.$store.dispatch('retrieveUser')
        .then(Response => {
          this.vli_subs = this.$store.getters.retrieveUser.vli_subs
          this.user_num = this.$store.getters.retrieveUser.user_num
          this.user_id_ = this.$store.getters.retrieveUser.user_id_
          this.user_nme = this.$store.getters.retrieveUser.user_nme
        })
    },
    logout () {
      this.$store.dispatch('destroySystemToken')
        .then(response => {
          this.$router.push({ name: 'systemHome' })
        })
    },
    easyCreateDirectory () {
      // easynav item # 1
      this.$store.commit('toggleDialog')
    },
    easyCreateNewEmployee () {
    },
    callFunction (item) {
      // add case if easynav is added
      switch (item) {
        case 0:
          this.easyCreateDirectory()
          break
        case 1:
          this.easyCreateNewEmployee()
          break
      }
    }
  },
  created () {
    this.systemUser()
    setInterval(this.getNow, 1000)
    // this.$root.$on('moduleName', (payload) => {
    //   this.moduleName = payload
    // })
    // this.getCurrentUser()
    // this.retrieveSubscriber()
    // this.$root.$on('closeDrawer', (payload) => {
    //   if (payload === true) {
    //     this.drawer = false
    //     this.drawerRight = false
    //   }
    // })
  },
  props: [
    'item'
  ]
}
</script>
