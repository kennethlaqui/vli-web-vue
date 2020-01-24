<template>
  <v-row justify="center">
    <v-dialog v-model="lb_dialog" persistent max-width="600px">
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
              <!-- payroll start date -->
              <v-col cols="12" sm="6" md="6">
                <v-dialog
                  ref="lref_strtDate"
                  v-model="lb_strtModal"
                  :return-value.sync="ld_strtDate"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="ld_strtDate"
                      label="Date Start"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="ld_strtDate" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="lb_strtModal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.lref_strtDate.save(ld_strtDate)">OK</v-btn>
                  </v-date-picker>
                  </v-dialog>
              </v-col>
              <!-- payroll end date -->
              <v-col cols="12" sm="6" md="6">
                <v-dialog
                  ref="lref_lastDate"
                  v-model="lb_lastModal"
                  :return-value.sync="ld_lastDate"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="ld_lastDate"
                      label="Date End"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="ld_lastDate" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="lb_lastModal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.lref_lastDate.save(ld_lastDate)">OK</v-btn>
                  </v-date-picker>
                  </v-dialog>
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
              <v-col cols="12" sm="6" md="6">
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
      lb_menu: false,
      lb_menu2: false,
      lb_dialog: true,
      lb_strtModal: false,
      lb_lastModal: false,
      ld_strtDate: new Date().toISOString().substr(0, 10),
      ld_lastDate: new Date().toISOString().substr(0, 10)
    }
  },
  methods: {
    save () {
      this.$router.push({ name: 'encodeDtr' })
      this.lb_dialog = false
    },
    close () {
      this.lb_dialog = false
      this.$store.commit('toggleDialog')
    }
  }
}
</script>
