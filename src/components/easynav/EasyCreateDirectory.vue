<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template> -->
      <v-card>
        <v-card-title>
          <span class="headline">Create Directory</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="['Regular']"
                  label="Payroll Group*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="['1st Part','2nd Part', '13th Month Pay']"
                  label="Payroll Type*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="['2019','2020', '2021', '2020']"
                  label="Year*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="['January','February','March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']"
                  label="Month*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="dateRangeText"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dateRangeText"
                      label="Picker in menu"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dates" range>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  :items="['2019','2020', '2021', '2020']"
                  label="W2 Year*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  :items="['2019 - Jan','2019 - Feb']"
                  label="SSS Period*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Description"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close()">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data () {
    return {
      dialog: true,
      dates: ['2019-12-01', '2019-12-02'],
      menu: false,
      modal: false,
      menu2: false
    }
  },
  computed: {
    dateRangeText () {
      return this.dates.join(' ~ ')
    }
  },
  methods: {
    save () {
      this.$router.push({ name: 'encodeDtr' })
      this.dialog = false
    },
    close () {
      this.dialog = false
      this.$store.commit('toggleDialog')
    }
  }
}
</script>
