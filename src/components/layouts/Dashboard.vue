<template>
  <v-app>
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
      <!-- <v-btn @click="showCreateEmployee = !showCreateEmployee" text>Create New Employee</v-btn> -->
    </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-right
      color="blue darken-3"
      dark
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Dashboard</v-toolbar-title>
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
          <v-list-item-title>{{ companyName }}</v-list-item-title>
          <v-list-item-subtitle>{{ companyPrex }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>
    <!-- <v-system-bar ></v-system-bar> -->
    <!-- <v-list
      dense
      tile
      nav
    >
    <v-list-group>
      <template v-slot:activator>
        <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/1.jpg">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user_nme }}</v-list-item-title>
            <v-list-item-subtitle>{{ user_id_ }}</v-list-item-subtitle>
        </v-list-item-content>
      </template>
      <v-list-group
          no-action
          sub-group
        >
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>My Account</v-list-item-title>
            </v-list-item-content>
        </template>
        <v-list-item
            v-for="(admin, i) in admins"
            :key="i"
            link
        >
          <v-list-item-title v-text="admin[0]"></v-list-item-title>
          <v-list-item-icon>
            <v-icon v-text="admin[1]"></v-icon>
          </v-list-item-icon>
      </v-list-item>
      </v-list-group>
    </v-list-group> -->
    <!-- </v-list> -->

    <v-list
      dense
      rounded
    >

      <v-list-item
        :to="{ name: 'userDashboard' }"
        link
      >
        <v-list-item-action>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

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

      <!-- <v-list-group
        prepend-icon="account_circle"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(admin, i) in admins"
            :key="i"
            link
          >
            <v-list-item-icon>
              <v-icon v-text="admin[1]"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="admin[0]"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list-group> -->
    </v-list>
        <!-- <div class="pa-2">
          <v-btn v-if="loggedIn" :to="{ name: 'UserAssignedCompany' }" block small>Switch Company</v-btn>
        </div>
        <div class="pa-2">
          <v-btn v-if="loggedIn" :to="{ name: 'userLogout' }" block small>Logout</v-btn>
        </div> -->

      <template v-slot:append>
        <v-navigation-drawer
          v-model="drawer"
        >
        <v-divider></v-divider>
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

            <v-card
            >
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
                    <v-list-item-title>{{ user_nme }}</v-list-item-title>
                    <v-list-item-subtitle v-if="user_num == 0">{{ user_id_ }} - Admin</v-list-item-subtitle>
                    <v-list-item-subtitle v-else>{{ user_id_ }}</v-list-item-subtitle>
                  </v-list-item-content>

                  <!-- <v-list-item-action>
                    <v-btn
                      :class="fav ? 'red--text' : ''"
                      icon
                      @click="fav = !fav"
                    >
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                  </v-list-item-action> -->
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
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
                    <v-icon>logout</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
          <v-spacer></v-spacer>
          <v-btn
            icon
            small
            @click="themes = 'dark'"
          >
            <v-icon v-if="dark">mdi-brightness-4</v-icon>
            <v-icon v-else>mdi-brightness-7</v-icon>
          </v-btn>
        </div>
        </v-navigation-drawer>
        <!-- <div class="pa-2">
          <v-btn v-if="loggedIn" :to="{ name: 'UserAssignedCompany' }" block small>Switch Company</v-btn>
        </div>
        <div class="pa-2">
          <v-btn v-if="loggedIn" :to="{ name: 'userLogout' }" block small>Logout</v-btn>
        </div> -->
      </template>

    <!-- <v-footer
      color="blue darken-3"
      class="white--text"
      absolute
      elevation="3"
      height="50px"
    >
      <span>VLI System</span>
      <v-spacer />
      <span>&copy; 2019</span>
    </v-footer> -->
    </v-navigation-drawer>

    <!-- <v-navigation-drawer
      v-model="left"
      fixed
      temporary
    /> -->

    <!-- Sizes your content based upon application components -->
    <v-content>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- <div v-if="showCreateEmployee">
          <MasterFile></MasterFile>
        </div> -->
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

    <!-- <v-navigation-drawer
      v-model="right"
      fixed
      right
      temporary
    /> -->

    <!-- <v-footer
      app
      color="blue darken-3"
      class="white--text"
    >
      <span>VLI System</span>
      <v-spacer />
      <span>&copy; 2019</span>
    </v-footer> -->
  <CreateDirectoryComponent v-if="showDialog"></CreateDirectoryComponent>
  </v-app>
</template>

<script>
import axios from 'axios'
import CreateDirectoryComponent from '@/components/easynav/EasyCreateDirectory.vue'

export default {
  name: 'Dashboard',
  components: {
    CreateDirectoryComponent
  },
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      username: 'Kenneth Laqui',
      companyName: '',
      companyPrex: '',
      vli_subs: '',
      user_num: '',
      user_id_: '',
      user_nme: '',
      userData: {},
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
          action: 'mdi-folder-plus',
          title: 'Personnel',
          active: true,
          items: [
            { action: 'mdi-calendar-plus', title: 'Encode DTR', url: { name: 'directory' } },
            { action: 'mdi-calendar-clock', title: 'Manpower', url: { name: 'manPower' } }
          ]
        },
        {
          action: 'mdi-calculator',
          title: 'Payroll',
          active: false,
          items: [
            { action: 'mdi-cached', title: 'Compute Payroll', url: 'about' },
            { action: 'mdi-currency-usd', title: 'Salaries', url: 'about' },
            { action: 'mdi-currency-usd', title: 'One-Time Income', url: { name: 'PayrollHeader' } },
            { action: 'mdi-currency-usd', title: 'Other Income', url: 'about' },
            { action: 'mdi-currency-usd', title: 'One-Time Deduct', url: 'about' },
            { action: 'mdi-currency-usd', title: 'Other Deduct', url: 'about' }
          ]
        },
        {
          action: 'mdi-newspaper',
          title: 'Reports',
          active: false,
          items: [
            { action: 'mdi-beach', title: 'Leave Summary', url: 'about' },
            { action: 'mdi-coin', title: 'Salaries', url: 'about' }
          ]
        },
        {
          action: 'settings',
          title: 'Maintenance',
          active: false,
          items: [
            { action: 'mdi-account-multiple-outline', title: 'Masterfile', url: { name: 'UserMasterfile' } },
            { action: 'mdi-animation', title: 'Reference File', url: { name: 'reference' } },
            { action: 'mdi-upload', title: 'Upload Bio', url: { name: 'biometrics' } }
          ]
        }
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
        { text: 'Switch Company', icon: 'sync', url: { name: 'UserAssignedCompany' } },
        { text: 'Settings and admin', icon: 'settings' }
      ]
    }
  },
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    },
    showDialog () {
      return this.$store.getters.showDialog
    }
  },
  watch: {
    themes () {
      const l = this.themes
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.themes = null
      this.$vuetify.theme.dark = this.dark
    }
  },
  methods: {
    async retrieveSubscriber () {
      this.loading = true
      try {
        await new Promise((resolve, reject) => {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
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
      this.$store.dispatch('destroyToken')
        .then(response => {
          this.$router.push({ name: 'userLogout' })
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
    this.getCurrentUser()
    this.retrieveSubscriber()
  },
  props: [
    'item'
  ]
}
</script>
