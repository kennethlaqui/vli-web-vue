<template>
  <v-container>
  <v-dialog
    v-model="dialog"
    persistent
  >
    <v-card>
      <v-card-title>
        <slot name="title">
          {{ title }}
        </slot>
      </v-card-title>
      <v-card-text>
        <slot name="content">
          {{ content }}
        </slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="b-close">
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </slot>
        <slot name="b-submit">
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Proceed
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-container>
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
    dialogsave: Boolean
  }
}
</script>
