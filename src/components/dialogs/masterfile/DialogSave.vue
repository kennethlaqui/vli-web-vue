<template>
  <v-dialog
    v-model="this.b_dialog"
    persistent
    max-width="400"
  >
    <v-card>
      <v-card-title>{{ this.title }}</v-card-title>
      <v-card-text>
        Note: You are not allowed to change the System Code after you agree.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="green darken-1"
          text
          @click="b_dialog = false"
        >
          Disagree
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          @click="b_dialogSave = true, b_dialog = false"
        >
          Agree
        </v-btn>
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
    dialog: Boolean,
    dialogsave: Boolean
  },
  data () {
    return {
      b_dialog: true,
      b_dialogSave: false
    }
  },
  watch: {
    b_dialogSave (value) {
      this.$root.$emit('masterFileSaveDialog', false)
      this.$root.$emit('masterFileSaveDialogSave', true)
    },
    b_dialog (value) {
      this.$root.$emit('masterFileSaveDialog', false)
    }
  },
  methods: {
    cloneProps () {
      this.b_dialog = this.dialog
      this.b_dialogSave = this.dialogsave
    }
  },
  created () {
    this.cloneProps()
  }
}
</script>
