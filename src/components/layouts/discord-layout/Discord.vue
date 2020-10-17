<template>
  <v-app id="inspire">

    <v-app-bar
      app
      clipped-right
      flat
      height="50"
    >
      <v-spacer></v-spacer>

      <v-responsive max-width="156">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
        ></v-text-field>
      </v-responsive>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      width="300"
    >
      <v-navigation-drawer
        v-model="drawer"
        absolute
        color="grey lighten-3"
        mini-variant
      >
        <v-avatar
          class="d-block text-center mx-auto mt-4"
          color="grey darken-1"
          size="36"
        >

        </v-avatar>

        <v-divider class="mx-3 my-5"></v-divider>

        <v-avatar
          v-for="n in 6"
          :key="n"
          class="d-block text-center mx-auto mb-9"
          color="grey lighten-1"
          size="28"
        >

          <img :src="images.company">

        </v-avatar>
      </v-navigation-drawer>

      <v-sheet
        color="grey lighten-5"
        height="128"
        width="100%"
      >
      </v-sheet>

      <v-list
        dense
        rounded
      >
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
    </v-navigation-drawer>

    <v-main>
      <!--  -->
    </v-main>

    <v-footer
      app
      color="transparent"
      height="72"
      inset
    >
      <v-text-field
        background-color="grey lighten-1"
        dense
        flat
        hide-details
        rounded
        solo
      ></v-text-field>
    </v-footer>
  </v-app>
</template>

<script>

export default {

  data: () => ({
    drawer: null,
    images: {
      company: require('@/assets/Guin-Logo.png'),
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
    ]
  }),
  methods: {
    open () {

    }
  }

}

</script>
