<template>

  <div>

    <!-- <clientView v-if="showClient" :profileId="cntrl_no"></clientView> -->

    <v-card>

      <v-app-bar
        color="primary"
        dense
        dark
        elevation="1"
      >

      <v-toolbar-title>Clients</v-toolbar-title>

        <v-spacer />

        <v-btn
          icon
        >

          <v-icon>

            mdi-account-multiple-plus

          </v-icon>

        </v-btn>

        <v-btn icon>

          <v-icon>

            mdi-delete

          </v-icon>

        </v-btn>

        <v-menu
          left
          bottom
        >

          <template v-slot:activator="{ on }">

            <v-btn icon v-on="on">

              <v-icon>

                mdi-dots-vertical

              </v-icon>

            </v-btn>

          </template>

          <v-list
            dense
          >
            <v-list-item>

              <v-list-item-title>

                Reload

              </v-list-item-title>

            </v-list-item>

            <v-list-item>

              <v-list-item-title>

                Print

              </v-list-item-title>

            </v-list-item>

          </v-list>

        </v-menu>

      </v-app-bar>

      <v-data-table
        v-model="selectedClient"
        :headers="headers"
        :items="clients"
        :loading="loading"
        :search="search"
        :single-select="false"
        item-key="cntrl_no"
        show-select
        fixed-header
        height="600px"
        class="elavation-1 font-weight-light caption"
      >

      <template v-slot:item.action="{ item }">

        <v-btn
          :to="{ name: 'systemClientProfile', params: { cntrl_no: item.cntrl_no }}"
          icon
        >

          <v-icon>

            mdi-eye-outline

          </v-icon>

        </v-btn>

      </template>

      </v-data-table>

    </v-card>

  </div>

</template>

<script>
// import clientView from '@/components/system/clients/ClientView.vue'
import axios from 'axios'

export default {
  name: 'ClientTable',
  components: {
    // clientView
  },
  data () {
    return {
      search: '',
      cntrl_no: '',
      showClient: false,
      loading: true,
      clients: [],
      selectedClient: [],
      headers: [
        { text: 'Company Name', value: 'com_name', width: '400px', sortable: true },
        { text: 'Industry', value: 'industry', sortable: true },
        { text: 'Email', value: 'email___', sortable: true },
        { text: 'Actions', value: 'action', sortable: false }
      ]
    }
  },
  methods: {
    async retrieveClients () {
      this.loading = true
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('system_token')
        if (this.$store.getters.systemLoggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('s/clients', {
            })
              .then(response => {
                this.clients = response.data
                this.loading = false
                resolve(response)
              })
              .catch(errors => {
                this.loading = true
                reject(errors)
              })
          })
        }
      } catch (error) {
      }
    }
  },
  created () {
    this.retrieveClients()
  }
}
</script>
