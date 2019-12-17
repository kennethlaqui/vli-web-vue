<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="search"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="search"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="blue"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="blue"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                >
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}:</v-list-item-content>
                  <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === key }">{{ item[key.toLowerCase()] }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'coverage',
      keys: [
        'Name',
        'ID',
        'Coverage',
        'Description',
        'Group',
        'Status'
      ],
      items: [
        {
          name: '1 - January 2019',
          id: 80,
          coverage: '01/01/2019 - 01/15/2019',
          description: 'January 25, 2019',
          group: 'Regular',
          status: 'Payroll Sent to Bank'
        },
        {
          name: '2 - January 2019',
          id: 81,
          coverage: '01/16/2019 - 01/30/2019',
          description: 'February 5, 2019',
          group: 'Regular',
          status: 'Payroll Sent to Bank'
        },
        {
          name: '1 - Febuary 2019',
          id: 82,
          coverage: '02/01/2019 - 02/15/2019',
          description: 'February 25, 2019',
          group: 'Regular',
          status: 'Payroll Sent to Bank'
        },
        {
          name: '2 - Febuary 2019',
          id: 83,
          coverage: '02/16/2019 - 02/30/2019',
          description: 'March 5, 2019',
          group: 'Regular',
          status: 'Payroll Sent to Bank'
        },
        {
          name: '1 - March 2019',
          id: 84,
          coverage: '03/01/2019 - 03/15/2019',
          description: 'March 25, 2019',
          group: 'Regular',
          status: 'Payroll Sent to Bank'
        },
        {
          name: '2 - March 2019',
          id: 85,
          coverage: '03/16/2019 - 03/30/2019',
          description: 'April 5, 2019',
          group: 'Regular',
          status: 'Payroll Sent to Bank'
        },
        {
          name: '1 - April 2019',
          id: 85,
          coverage: '04/01/2019 - 04/15/2019',
          description: 'April 25, 2019',
          group: 'Regular',
          status: 'Payroll Sent to Bank'
        },
        {
          name: '2 - April 2019',
          id: 86,
          coverage: '04/16/2019 - 04/30/2019',
          description: 'May 5, 2019',
          group: 'Regular',
          status: 'Payroll Sent to Bank'
        },
        {
          name: '1 - May 2019',
          id: 87,
          coverage: '05/01/2019 - 05/15/2019',
          description: 'May 25, 2019',
          group: 'Regular',
          status: 'Payroll Sent to Bank'
        },
        {
          name: '2 - May 2019',
          id: 88,
          coverage: '05/16/2019 - 05/30/2019',
          description: 'May 25, 2019',
          group: 'Regular',
          status: 'Payroll Sent to Bank'
        }
      ]
    }
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== `Name`)
    }
  },
  methods: {
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    }
  }
}
</script>
