<template>
  <div id="app">
    <v-card>
      <v-card-actions>
        <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-menu
            ref="strtMenu"
            v-model="strtMenu"
            :close-on-content-click="false"
            :return-value.sync="strtDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="strtDate"
                label="Start Date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="strtDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="strtMenu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.strtMenu.save(strtDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-menu
            ref="endMenu_"
            v-model="endMenu_"
            :close-on-content-click="false"
            :return-value.sync="endDate_"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="endDate_"
                label="End Date"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="endDate_" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="endMenu_ = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.endMenu_.save(endDate_)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        </v-row>
        <!-- <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-btn class="primary" >Create Manpower</v-btn>
          </v-col>
        </v-row> -->
      </v-card-actions>
    </v-card>
    <h2>Upload Biometrics Log</h2>
    <input type="file" ref="myFile" @change="selectedFile">
    <input type="submit" value="Upload File" @click="uploadBio"/>
    <div v-if="allNames.length">
      <p>Bio file contains {{allNames.length}}</p>
      <ul>
        <li v-for="name in names" v-bind:key="name.key" :value="name.value">{{name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      strtMenu: false,
      endMenu_: false,
      strtDate: new Date().toISOString().substr(0, 10),
      endDate_: new Date().toISOString().substr(0, 10),
      primekey: localStorage.getItem('primekey'),
      allNames: []
    }
  },
  computed: {
    names () {
      return this.allNames
    }
  },
  methods: {
    selectedFile () {
      console.log('selected a file')
      console.log(this.$refs.myFile.files[0])
      let file = this.$refs.myFile.files[0]
      if (!file || file.type !== 'text/plain') return
      // Credit: https://stackoverflow.com/a/754398/52160
      let reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      reader.onload = evt => {
        let text = evt.target.result
        this.allNames = text.split('\n').map(function (el) { return el.split(/\s+/) })
        // var headings = this.allNames.shift()
        let obj = this.allNames.map(function (el) {
          obj = {}
          for (var i = 0, l = el.length; i < l; i++) {
            obj = isNaN(Number(el[i])) ? el[i] : +el[i]
          }
          return JSON.stringify(obj)
        })
        // empty string at end?
        if (this.allNames[this.allNames.length - 1] === '') this.allNames.pop()
      }
      reader.onerror = evt => {
        console.error(evt)
      }
    },
    async uploadBio () {
      try {
        await new Promise((resolve, reject) => {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
          axios.post('u/maintenance/upload/bio', {
            primekey: this.primekey,
            biometrics: this.allNames,
            strtDate: this.strtDate,
            endDate_: this.endDate_
          })
            .then(response => {
              resolve(response)
              console.log(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      } catch (error) {
      }
    }
  }
}
</script>
