<template>
  <div>
    <v-card
      v-if="!b_show_NewEmployeeComponent"
    >
      <v-app-bar
        color="primary"
        dense
        dark
        elevation="1"
      >
        <v-toolbar-title>Masterfile</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="createNewEmployee"
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

          <!-- <v-spacer></v-spacer>

          <v-row
            class="mt-2"
            justify="end"
          >
            <v-col cols="8">
              <v-text-field
              v-model="search"
              label="Search"
              single-line
              dense
            ></v-text-field>
            </v-col>
          </v-row> -->

          <v-menu
            left
            bottom
          >
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
              <v-list
                dense
              >
                <v-list-item>
                  <v-list-item-title>Reload</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Print</v-list-item-title>
                </v-list-item>
              </v-list>
          </v-menu>
      </v-app-bar>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="masterfile"
        :loading="loading"
        :search="search"
        :single-select="singleSelect"
        item-key="empl_cde"
        show-select
        fixed-header
        height="500px"
        class="elavation-1"
      >
        <template v-slot:item.avatar__="{ item }">
          <v-avatar size="36">
            <img
              :src="item.avatar__"
              alt="John"
            >
          </v-avatar>
          </template>
        <template v-slot:item.action="{ item }">
          <v-btn icon>
            <v-icon
              @click="editItem(item)"
            >
              mdi-account-edit
            </v-icon>
          </v-btn>
          <!-- <v-icon
            small
            @click="deleteItem(item)"
          >
            delete
          </v-icon> -->
        </template>
        <template v-slot:no-data>
          No data to retrieve
        </template>
      </v-data-table>
    </v-card>
    <newEmployee v-if="b_show_NewEmployeeComponent" :create="b_createNew" :employeeData="editedItem"></newEmployee>
</div>
</template>
<script>
import axios from 'axios'
import { masterfileDefaultForm, masterfileEditForm } from '@/form/masterfile'
import newEmployee from '@/components/maintenance/masterfile/Create.vue'

export default {
  name: 'Masterfile',
  components: {
    newEmployee
  },
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      search: '',
      loading: false,
      singleSelect: false,
      b_createNew: false,
      b_show_NewEmployeeComponent: false,
      selected: [],
      masterfile: [],
      headers: [
        { text: 'Avatar', value: 'avatar__', align: 'center', sortable: false },
        { text: 'System ID', value: 'empl_cde', sortable: true },
        { text: 'Last Name', value: 'last_nme' },
        { text: 'First Name', value: 'frst_nme' },
        { text: 'Middle Name', value: 'midl_nme' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {}
    }
  },
  methods: {
    async retrieveMasterFile () {
      this.loading = true
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        if (this.$store.getters.loggedIn) {
          await new Promise((resolve, reject) => {
            axios.get('u/maintenance/masterfile/', {
              params: {
                primekey: this.primekey
              }
            })
              .then(response => {
                this.masterfile = response.data
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
    },
    callExport () {
      this.editedItem = masterfileEditForm
      this.defaultItem = masterfileDefaultForm
    },
    createNewEmployee () {
      this.b_show_NewEmployeeComponent = true
      this.b_createNew = true
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    editItem (item) {
      this.editedIndex = this.masterfile.indexOf(item)
      this.editedItem = Object.assign({}, item)
      // this.$root.$emit('employeeData', this.editedItem)
      // this.$router.push({ name: 'UserNewEmployee' })
      // this.dialog = true
      this.b_show_NewEmployeeComponent = true
      this.b_createNew = false
    },
    deleteItem (item) {
      const index = this.masterfile.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.masterfile.splice(index, 1)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.masterfile[this.editedIndex], this.editedItem)
      } else {
        this.masterfile.push(this.editedItem)
      }
      this.close()
    }
  },
  created () {
    this.retrieveMasterFile()
    this.callExport()
    this.$root.$on('newEmployee', () => {
      this.b_show_NewEmployeeComponent = false
      this.editedItem = Object.assign({}, this.defaultItem)
      this.retrieveMasterFile()
    })
  }
}
</script>
<style>
.vuebar-element {
  height: 500px;
  width: 100%;
  background: #dfe9fe;
}

.vb > .vb-dragger {
    z-index: 5;
    width: 12px;
    right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    background-color: rgba(48, 121, 244,.1);
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
}
</style>
