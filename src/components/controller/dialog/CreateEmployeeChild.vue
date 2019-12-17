<template>
  <v-card>
    <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
    ></v-text-field>
    <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-actions>
      <v-btn color="primary" @click.stop="show=false">Close</v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  props: ['visible'],
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  }
}
</script>
