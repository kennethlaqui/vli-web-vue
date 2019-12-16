<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="masterfile"
    :single-select="singleSelect"
    item-key="empl_cde"
    show-select
    sort-desc
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Create Employee</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ items }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(items)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(items)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="retrieveMasterFile">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      bol: true,
      dialog: false,
      primekey: localStorage.getItem('primekey'),
      token: localStorage.getItem('access_token'),
      masterfile: [],
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: 'Employee #',
          align: 'left',
          sortable: false,
          value: 'empl_cde'
        },
        { text: 'Last Name', value: 'last_nme' },
        { text: 'First Name', value: 'frst_nme' },
        { text: 'Middle Name', value: 'midl_nme' },
        { text: 'Gender', value: 'sex_____' },
        { text: 'Work Status', value: 'workstat' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  methods: {
    initialize () {
      this.retrieveMasterFile()
    },
    async retrieveMasterFile () {
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
        if (this.bol) {
          await new Promise((resolve, reject) => {
            axios.get('u/maintenance/masterfile/', {
              params: {
                primekey: this.primekey
              }
            })
              .then(response => {
                this.masterfile = response.data
                console.log(this.masterfile)
                resolve(response)
              })
              .catch(errors => {
                console.log(errors)
                reject(errors)
              })
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  },
  created () {
    this.initialize()
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  }
}
</script>
