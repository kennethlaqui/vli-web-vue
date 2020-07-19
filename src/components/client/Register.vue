<template>

  <v-card
    max-width="450"
    class="mx-auto"
  >

    <v-card-title class="headline">Register Your Company</v-card-title>

      <v-container>

        <v-form @submit.prevent="clientRegister" id="register">

          <!-- company name -->
          <v-row>

            <v-col cols="12" md="12">

              <v-text-field
                v-model="form.com_name"
                :error-messages="CompanyNameErrors"
                label="Company Name"
                required
                @input="$v.form.com_name.$touch()"
                @blur="$v.form.com_name.$touch()"
              />

            </v-col>

          </v-row>

          <!-- address -->
          <v-row>

            <v-col cols="12" md="12">

              <v-text-field
                v-model="form.address_"
                :error-messages="AddressErrors"
                label="Company Address"
                required
                @input="$v.form.address_.$touch()"
                @blur="$v.form.address_.$touch()"
              />

            </v-col>

          </v-row>

          <!-- firstname and lastname -->
          <v-row>

            <!-- first name -->
            <v-col cols="12" md="6">

              <v-text-field
                v-model="form.frst_nme"
                :error-messages="FirstNameErrors"
                label="First Name"
                required
                @input="$v.form.frst_nme.$touch()"
                @blur="$v.form.frst_nme.$touch()"
              />

            </v-col>

            <!-- last name -->
            <v-col cols="12" md="6">

              <v-text-field
                v-model="form.last_nme"
                :error-messages="LastNameErrors"
                label="Last Name"
                required
                @input="$v.form.last_nme.$touch()"
                @blur="$v.form.last_nme.$touch()"
              />

            </v-col>

          </v-row>

          <!-- email address and mobile number-->
          <v-row>

            <!-- email address -->
            <v-col cols="12" md="6">

              <v-text-field
                v-model="form.emailadr"
                :error-messages="emailadrErrors"
                label="E-mail"
                required
                @input="$v.form.emailadr.$touch()"
                @blur="$v.form.emailadr.$touch()"
              />

            </v-col>

            <!-- mobile number -->
            <v-col cols="12" md="6">

              <v-text-field
                v-model="form.cel_numb"
                :error-messages="MobileNumberErrors"
                label="Mobile Number"
                required
                @input="$v.form.cel_numb.$touch()"
                @blur="$v.form.cel_numb.$touch()"
              />

            </v-col>

          </v-row>

          <v-checkbox

            v-model="form.checkbox"
            :error-messages="checkboxErrors"
            label="Do you agree?"
            required
            @change="$v.form.checkbox.$touch()"
            @blur="$v.form.checkbox.$touch()"

          />

        <v-btn type="submit" class="mr-4" @click="submit" form="register">Submit</v-btn>

        <v-btn @click="clear">Clear</v-btn>

      </v-form>

    </v-container>

  </v-card>

</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    form: {
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
    }
  },

  data: () => ({
    form: {
      com_name: '',
      address_: '',
      frst_nme: '',
      last_nme: '',
      emailadr: '',
      cel_numb: '',
      select: null,
      checkbox: false
    },
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ]
  }),

  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.form.checkbox.$dirty) return errors
      !this.$v.form.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    selectErrors () {
      const errors = []
      if (!this.$v.form.select.$dirty) return errors
      !this.$v.form.select.required && errors.push('Item is required')
      return errors
    },
    CompanyNameErrors () {
      const errors = []
      if (!this.$v.form.com_name.$dirty) return errors
      !this.$v.form.com_name.maxLength && errors.push('Company name must be 100 characters long.')
      !this.$v.form.com_name.required && errors.push('Company Name is required.')
      return errors
    },
    AddressErrors () {
      const errors = []
      if (!this.$v.form.address_.$dirty) return errors
      !this.$v.form.address_.maxLength && errors.push('Address must be 200 characters long.')
      !this.$v.form.address_.required && errors.push('Company Address is required.')
      return errors
    },
    FirstNameErrors () {
      const errors = []
      if (!this.$v.form.frst_nme.$dirty) return errors
      !this.$v.form.frst_nme.maxLength && errors.push('First Name must be 30 characters long.')
      !this.$v.form.frst_nme.required && errors.push('First Name is required.')
      return errors
    },
    LastNameErrors () {
      const errors = []
      if (!this.$v.form.last_nme.$dirty) return errors
      !this.$v.form.last_nme.maxLength && errors.push('Last Name must be 30 characters long.')
      !this.$v.form.last_nme.required && errors.push('Last Name is required.')
      return errors
    },
    emailadrErrors () {
      const errors = []
      if (!this.$v.form.emailadr.$dirty) return errors
      !this.$v.form.emailadr.maxLength && errors.push('E-mail must be 50 characters long.')
      !this.$v.form.emailadr.email && errors.push('Must be valid e-mail')
      !this.$v.form.emailadr.required && errors.push('E-mail is required')
      return errors
    },
    MobileNumberErrors () {
      const errors = []
      if (!this.$v.form.cel_numb.$dirty) return errors
      !this.$v.form.cel_numb.maxLength && errors.push('Mobile Number must be 25 characters long.')
      !this.$v.form.cel_numb.required && errors.push('Mobile Number is required')
      return errors
    }
  },
  methods: {
    submit () {
      this.$v.form.$touch()
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
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
        return new Promise((resolve, reject) => {
          axios.post('c/register/', this.form)
            .then(response => {
              resolve(response)
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
