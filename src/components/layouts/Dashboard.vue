<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      right
    >
      <v-list dense>
        <v-list-item @click.stop="right = !right">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Open Temporary Drawer</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-right
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer />
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
            <v-list-item-title>{{ userInfo.user_nme }}</v-list-item-title>
            <v-list-item-subtitle>{{ userInfo.user_id_ }}</v-list-item-subtitle>
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

      <v-list-item link>
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
          <v-btn v-if="loggedIn" :to="{ name: 'userLogout' }" block>Logout</v-btn>
        </div>
      </template>

    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="left"
      fixed
      temporary
    />

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="source"
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  href="https://codepen.io/johnjleider/pen/QewYYx"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-codepen</v-icon>
                </v-btn>
              </template>
              <span>Codepen</span>
            </v-tooltip>
          </v-col>
        </v-row>
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
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      drawerRight: null,
      right: false,
      left: false,
      items: [
        {
          action: 'mdi-folder-plus',
          title: 'Personnel',
          active: true,
          items: [
            { action: 'mdi-calendar-plus', title: 'Encode DTR' },
            { action: 'mdi-timetable', title: 'Manpower' }
          ]
        },
        {
          action: 'mdi-calculator',
          title: 'Payroll',
          active: false,
          items: [
            { action: 'mdi-cached', title: 'Compute Payroll' },
            { action: 'mdi-coin', title: 'Salaries' }
          ]
        },
        {
          action: 'mdi-newspaper',
          title: 'Reports',
          active: false,
          items: [
            { action: 'mdi-beach', title: 'Leave Summary' },
            { action: 'mdi-coin', title: 'Salaries' }
          ]
        },
        {
          action: 'mdi-settings',
          title: 'Maintenance',
          active: false,
          items: [
            { action: 'mdi-account-multiple-outline', title: 'Masterfile' },
            { action: 'mdi-animation', title: 'Reference File' }
          ]
        }
      ],
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings']
      ],
      username: 'Kenneth Laqui',
      userInfo: {}
    }
  },
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  },
  methods: {
    user () {
      this.$store.dispatch('retrieveUser')
        .then(response => {
          this.userInfo = this.$store.getters.user
        })
    }
  },
  created () {
    this.user()
  },
  props: {
    source: String
  }
}
</script>
