<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerRight"
      drawer="false"
      app
      clipped
      right
    >
    <v-list shaped dense>
      <v-subheader>Easy Navigation</v-subheader>
      <v-list-item-group v-model="sideItem" color="primary">
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
          <v-icon>mdi-apps</v-icon>
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
    <!-- <v-system-bar ></v-system-bar> -->
    <v-list
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
    </v-list-group>
    </v-list>

    <v-list dense>

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
      <v-divider></v-divider>

      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
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

      <v-list-group
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
      </v-list-group>
    </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn v-if="loggedIn" :to="{ name: 'UserAssignedCompany' }" block small>Switch Company</v-btn>
        </div>
        <div class="pa-2">
          <v-btn v-if="loggedIn" :to="{ name: 'userLogout' }" block small>Logout</v-btn>
        </div>
      </template>

    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="left"
      fixed
      temporary
    />

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

    <v-navigation-drawer
      v-model="right"
      fixed
      right
      temporary
    />

    <v-footer
      app
      color="blue darken-3"
      class="white--text"
    >
      <span>VLI System</span>
      <v-spacer />
      <span>&copy; 2019</span>
    </v-footer>
  <CreateDirectoryComponent v-if="showDialog"></CreateDirectoryComponent>
  </v-app>
</template>

<script>
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
      vli_subs: '',
      user_num: '',
      user_id_: '',
      user_nme: '',
      userData: {},
      drawer: null,
      drawerRight: false,
      showCreateEmployee: false,
      show: false,
      right: false,
      left: false,
      items: [
        {
          action: 'mdi-folder-plus',
          title: 'Personnel',
          active: true,
          items: [
            { action: 'mdi-calendar-plus', title: 'Encode DTR', url: { name: 'directory' } },
            { action: 'mdi-timetable', title: 'Manpower', url: '' }
          ]
        },
        {
          action: 'mdi-calculator',
          title: 'Payroll',
          active: false,
          items: [
            { action: 'mdi-cached', title: 'Compute Payroll', url: 'about' },
            { action: 'mdi-coin', title: 'Salaries', url: 'about' }
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
          action: 'mdi-settings',
          title: 'Maintenance',
          active: false,
          items: [
            { action: 'mdi-account-multiple-outline', title: 'Masterfile', url: { name: 'UserMasterfile' } },
            { action: 'mdi-animation', title: 'Reference File', url: 'about' }
          ]
        }
      ],
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings']
      ],
      sideItem: 1,
      sideItems: [
        { text: 'Create Directory', icon: 'mdi-folder' },
        { text: 'Create New Employee', icon: 'mdi-account' }
        // { text: 'Events', icon: 'mdi-flag', url: { name: 'easyEvents' } }
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
  methods: {
    getCurrentUser () {
      this.$store.dispatch('retrieveUser')
        .then(Response => {
          this.vli_subs = this.$store.getters.retrieveUser.vli_subs
          this.user_num = this.$store.getters.retrieveUser.user_num
          this.user_id_ = this.$store.getters.retrieveUser.user_id_
          this.user_nme = this.$store.getters.retrieveUser.user_nme
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
  },
  props: [
    'item'
  ]
}
</script>
