<template>
  <div>
    <!-- <v-row class="ml-1">
      <v-col
        cols="12"
        md="4"
        lg="4"
        sm="4"
      >
        <v-card
          max-width="300"
          append
        >
          <v-card-text class="pt-2">
            <div>Employees</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->
    <v-card
    class="mt-8 mx-auto"
    max-width="500"
    >
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="blue darken-3"
        elevation="12"
        max-width="calc(100% - 32px)"
      >
        <v-sparkline
          :labels="labels"
          :value="value"
          color="white"
          line-width="2"
          padding="16"
        ></v-sparkline>
      </v-sheet>

      <v-card-text class="pt-0">
        <div class="title font-weight-light mb-2">User Registrations</div>
        <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
        <v-divider class="my-2"></v-divider>
        <v-icon
          class="mr-2"
          small
        >
          mdi-clock
        </v-icon>
        <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
      </v-card-text>
    </v-card>
    <!-- <v-btn @click="showCreateEmployee = !showCreateEmployee">Create New Employee</v-btn> -->
    <div v-if="showCreateEmployee">
      <!-- <MasterFile></MasterFile> -->
    </div>
    <!-- <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="desserts"
          class="elevation-1 mx-4"
        >
        <template v-slot:item.calories="{ item }">
          <v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip>
        </template>
        </v-data-table>
      </v-col>
    </v-row> -->

  </div>
</template>
<script>

export default {
  data: () => ({
    showCreateEmployee: false,
    labels: [
      '12am',
      '3am',
      '6am',
      '9am',
      '12pm',
      '3pm',
      '6pm',
      '9pm'
    ],
    value: [
      200,
      675,
      410,
      390,
      310,
      460,
      250,
      240
    ],
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' }
    ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%'
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%'
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%'
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%'
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%'
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%'
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2%'
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45%'
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22%'
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%'
      }
    ]
  }),
  components: {
    // MasterFile: () => import('@/components/controller/dialog/masterfile/NewEmployee.vue')
  },
  methods: {
    getColor (calories) {
      if (calories > 400) return 'red'
      else if (calories > 200) return 'orange'
      else return 'green'
    }
  }
}
</script>
<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
