<template>
 <v-card
    max-width="450"
    class="mx-auto"
  >
  <v-card-title class="headline">Register Your Company</v-card-title>
    <v-container>
    <v-form @submit.prevent="clientRegister" id="register">
    <v-row>
      <v-col cols="12" md="12">
        <v-text-field
          v-model="com_name"
          :error-messages="CompanyNameErrors"
          label="Company Name"
          required
          @input="$v.com_name.$touch()"
          @blur="$v.com_name.$touch()"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="12">
        <v-text-field
          v-model="address_"
          :error-messages="AddressErrors"
          label="Company Address"
          required
          @input="$v.address_.$touch()"
          @blur="$v.address_.$touch()"
        ></v-text-field>
      </v-col>
    </v-row>

      <!-- firstname and lastname -->
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="frst_nme"
            :error-messages="FirstNameErrors"
            label="First Name"
            required
            @input="$v.frst_nme.$touch()"
            @blur="$v.frst_nme.$touch()"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="last_nme"
            :error-messages="LastNameErrors"
            label="Last Name"
            required
            @input="$v.last_nme.$touch()"
            @blur="$v.last_nme.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- firstname and lastname -->
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="emailadr"
            :error-messages="emailadrErrors"
            label="E-mail"
            required
            @input="$v.emailadr.$touch()"
            @blur="$v.emailadr.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="cel_numb"
            :error-messages="MobileNumberErrors"
            label="Mobile Number"
            required
            @input="$v.cel_numb.$touch()"
            @blur="$v.cel_numb.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- <v-select
        v-model="select"
        :items="items"
        :error-messages="selectErrors"
        label="Item"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"
      ></v-select> -->
      <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="Do you agree?"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
      ></v-checkbox>

      <v-btn type="submit" class="mr-4" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>
  </v-container>
</v-card>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    com_name: { required, maxLength: maxLength(100) },
    address_: { required, maxLength: maxLength(200) },
    frst_nme: { required, maxLength: maxLength(30) },
    last_nme: { required, maxLength: maxLength(30) },
    emailadr: { required, email, maxLength: maxLength(50) },
    cel_numb: { required, maxLength: maxLength(25) },
    select: { required },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },

  data: () => ({
    com_name: '',
    address_: '',
    frst_nme: '',
    last_nme: '',
    emailadr: '',
    cel_numb: '',
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    checkbox: false
  }),

  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    selectErrors () {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    CompanyNameErrors () {
      const errors = []
      if (!this.$v.com_name.$dirty) return errors
      !this.$v.com_name.maxLength && errors.push('Company name must be 100 characters long.')
      !this.$v.com_name.required && errors.push('Company Name is required.')
      return errors
    },
    AddressErrors () {
      const errors = []
      if (!this.$v.address_.$dirty) return errors
      !this.$v.address_.maxLength && errors.push('Address must be 200 characters long.')
      !this.$v.address_.required && errors.push('Company Address is required.')
      return errors
    },
    FirstNameErrors () {
      const errors = []
      if (!this.$v.frst_nme.$dirty) return errors
      !this.$v.frst_nme.maxLength && errors.push('First Name must be 30 characters long.')
      !this.$v.frst_nme.required && errors.push('First Name is required.')
      return errors
    },
    LastNameErrors () {
      const errors = []
      if (!this.$v.last_nme.$dirty) return errors
      !this.$v.last_nme.maxLength && errors.push('Last Name must be 30 characters long.')
      !this.$v.last_nme.required && errors.push('Last Name is required.')
      return errors
    },
    emailadrErrors () {
      const errors = []
      if (!this.$v.emailadr.$dirty) return errors
      !this.$v.emailadr.maxLength && errors.push('E-mail must be 50 characters long.')
      !this.$v.emailadr.email && errors.push('Must be valid e-mail')
      !this.$v.emailadr.required && errors.push('E-mail is required')
      return errors
    },
    MobileNumberErrors () {
      const errors = []
      if (!this.$v.cel_numb.$dirty) return errors
      !this.$v.cel_numb.maxLength && errors.push('Mobile Number must be 25 characters long.')
      !this.$v.cel_numb.required && errors.push('Mobile Number is required')
      return errors
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.com_name = ''
      this.address_ = ''
      this.frst_nme = ''
      this.last_nme = ''
      this.emailadr = ''
      this.cel_numb = ''
      this.select = null
      this.checkbox = false
    },
    clientRegister () {
      this.$store.dispatch('clientRegister', {
        com_name: this.com_name,
        address_: this.address_,
        frst_nme: this.frst_nme,
        last_nme: this.last_nme,
        emailadr: this.emailadr,
        cel_numb: this.cel_numb
      })
        .then(response => {
          this.$router.push({ name: 'userLogin' })
        })
    }
  }
}
</script>
