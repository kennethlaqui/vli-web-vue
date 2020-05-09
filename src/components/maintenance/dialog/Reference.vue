<template>
  <v-dialog
    v-model="dialog"
    persistent
    :max-width="width"
  >
    <v-card>
      <v-card-title>
        <slot name="title">
          {{ title }}
        </slot>
      </v-card-title>
      <v-container fluid>
        <slot name="body"></slot>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="b-close">
          <v-btn
            color="green darken-1"
            text
            @click="c_dialog = false"
          >
            Close
          </v-btn>
        </slot>
        <slot name="b-submit">
          <v-btn
            color="green darken-1"
            text
            @click="c_dialog = false"
          >
            Proceed
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    content: {
      type: String
    },
    dialog: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '400px'
    }
  },
  computed: {
    c_dialog: {
      get: function () {
        return this.dialog
      },
      set: function (value) {
        this.dialog = value
      }
    }
  }
}
</script>
