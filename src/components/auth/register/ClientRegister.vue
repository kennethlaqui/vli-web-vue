<template>

  <div>

      <v-container>

        <v-card-title>Register Your Company</v-card-title>

        <v-card-subtitle>We will review your application after registration.</v-card-subtitle>

        <v-card-text>

        <v-form @submit.prevent="clientRegister" id="register">

          <!-- first row label -->
          <v-row>

            <!-- first name label -->
            <v-col md="6">

              <h4 class="font-weight-regular">First Name</h4>

            </v-col>

            <!-- last name label -->
            <v-col md="6">

              <h4 class="font-weight-regular">Last Name</h4>

            </v-col>

          </v-row>

          <!-- first row textfield -->
          <v-row class="mt-n4">

            <!-- first name -->
            <v-col md="6">

              <v-text-field
                v-model="form.frst_nme"
                :error-messages="firstNameErrors"
                @input="$v.form.frst_nme.$touch()"
                @blur="$v.form.frst_nme.$touch()"
                required
                outlined
                dense
              />

            </v-col>

            <!-- last name -->
            <v-col md="6">

              <v-text-field
                v-model="form.last_nme"
                :error-messages="lastNameErrors"
                @input="$v.form.last_nme.$touch()"
                @blur="$v.form.last_nme.$touch()"
                required
                outlined
                dense
              />

            </v-col>

          </v-row>
          <!-- end of first row -->

          <!-- second row label -->
          <v-row class="mt-n4">

            <!-- email address label -->
            <v-col md="6">

              <h4 class="font-weight-regular">Email</h4>

            </v-col>

            <!-- mobile number label -->
            <v-col md="6">

              <h4 class="font-weight-regular">Mobile Number</h4>

            </v-col>

          </v-row>

          <!-- second row textfield -->
          <v-row class="mt-n4">

            <!-- email address -->
            <v-col md="6">

              <v-text-field
                v-model="form.email___"
                :error-messages="emailErrors"
                @input="$v.form.email___.$touch()"
                @blur="$v.form.email___.$touch()"
                required
                outlined
                dense
              />

            </v-col>

            <!-- mobile number -->
            <v-col cols="12" md="6">

              <v-text-field
                v-model="form.mobile__"
                :error-message="mobileErrors"
                required
                outlined
                dense
              />

            </v-col>

          </v-row>
          <!-- end of second row -->

          <!-- third row label -->
          <v-row class="mt-n4">

            <!-- company name label -->
            <v-col md="6">

              <h4 class="font-weight-regular">Company Name</h4>

            </v-col>

            <!-- company address label -->
            <v-col md="6">

              <h4 class="font-weight-regular">Company Address</h4>

            </v-col>

          </v-row>

          <!-- third row textfield -->
          <v-row class="mt-n4">

            <!-- company name -->
            <v-col md="6">

              <v-text-field
                v-model="form.com_name"
                :error-messages="companyNameErrors"
                @input="$v.form.com_name.$touch()"
                @blur="$v.form.com_name.$touch()"
                required
                outlined
                dense
              />

            </v-col>

            <!-- company address -->
            <v-col cols="12" md="6">

              <v-text-field
                v-model="form.address_"
                :error-messages="addressErrors"
                @input="$v.form.address_.$touch()"
                @blur="$v.form.address_.$touch()"
                required
                outlined
                dense
              />

            </v-col>

          </v-row>
          <!-- end of third row label and textfield -->

          <!-- fourth row label -->
          <v-row class="mt-n4">

            <!-- company name label -->
            <v-col md="6">

              <h4 class="font-weight-regular">States</h4>

            </v-col>

            <!-- company address label -->
            <v-col md="6">

              <h4 class="font-weight-regular">City</h4>

            </v-col>

          </v-row>

          <!-- fourth row textfield -->
          <v-row class="mt-n4">

            <!-- states -->
            <v-col md="6">

              <v-select
                v-model="form.state___"
                :items="states"
                item-text="description"
                item-value="id"
                :error-messages="stateErrors"
                @input="$v.form.state___.$touch()"
                @blur="$v.form.state___.$touch()"
                required
                dense
                outlined
              />

            </v-col>

            <!-- city -->
            <v-col md="6">

              <v-select
                v-model="form.city____"
                :items="cities"
                item-text="description"
                item-value="id"
                :error-messages="cityErrors"
                @input="$v.form.city____.$touch()"
                @blur="$v.form.city____.$touch()"
                required
                dense
                outlined
              />

            </v-col>

          </v-row>
          <!-- end of fourth row label and select field -->

          <!-- fifth row label-->
          <v-row class="mt-n4">

            <v-col md="6">

              <h4 class="font-weight-regular">Zip Code</h4>

            </v-col>

            <v-col md="6">

              <h4 class="font-weight-regular">Position</h4>

            </v-col>

          </v-row>

          <!-- fifth row textfield -->
          <v-row class="mt-n4">

            <!-- Zip Code -->
            <v-col md="6">

              <v-text-field
                v-model="form.zip_code"
                :error-messages="zipCodeErrors"
                @input="$v.form.zip_code.$touch()"
                @blur="$v.form.zip_code.$touch()"
                required
                outlined
                dense
              />

            </v-col>

            <!-- position textfield -->
            <v-col md="6">

              <v-text-field
                v-model="form.position"
                :error-messages="positionErrors"
                @input="$v.form.position.$touch()"
                @blur="$v.form.position.$touch()"
                required
                outlined
                dense
              />

            </v-col>

          </v-row>

          <!-- sixth row label-->
          <v-row class="mt-n4">

            <v-col md="6">

              <h4 class="font-weight-regular">Industry</h4>

            </v-col>

          </v-row>

          <!-- sixth row textfiled -->
          <v-row class="mt-n4">

            <!-- vli_industry -->
            <v-col>

              <v-select
                v-model="form.vli_industry"
                :items="industries"
                item-text="description"
                item-value="id"
                required
                dense
                outlined
              />

            </v-col>

          </v-row>
          <!-- end of fifth row -->

          <v-btn type="submit" class="mr-4" @click="submit" form="register">Submit</v-btn>

          <v-btn @click="clear">Clear</v-btn>

        </v-form>

      </v-card-text>

    </v-container>

    <router-view></router-view>

  </div>

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
      state___: { required },
      city____: { required },
      zip_code: { required },
      position: { required, maxLength: maxLength(30) },
      vli_industry: { required },
      frst_nme: { required, maxLength: maxLength(30) },
      last_nme: { required, maxLength: maxLength(30) },
      email___: { required, email, maxLength: maxLength(50) },
      mobile__: { required, maxLength: maxLength(25) }
    }
  },

  data: () => ({
    form: {
      com_name: '',
      address_: '',
      state___: '',
      city____: '',
      zip_code: '',
      position: '',
      vli_industry: '',
      frst_nme: '',
      last_nme: '',
      email___: '',
      mobile__: ''
    },
    errors: [],
    regions: [],
    states: [
      {
        id: 1,
        description: 'Laguna'
      }
    ],
    cities: [
      {
        id: 1,
        description: 'Santa Rosa'
      }
    ],
    industries: [
      {
        id: 1,
        description: 'Manufacturing'
      }
    ]
  }),

  computed: {
    companyNameErrors () {
      const errors = []
      if (!this.$v.form.com_name.$dirty) return errors
      !this.$v.form.com_name.maxLength && errors.push('Company name must be 100 characters long.')
      !this.$v.form.com_name.required && errors.push('Company Name is required.')
      return errors
    },
    addressErrors () {
      const errors = []
      if (!this.$v.form.address_.$dirty) return errors
      !this.$v.form.address_.maxLength && errors.push('Address must be 200 characters long.')
      !this.$v.form.address_.required && errors.push('Company Address is required.')
      return errors
    },
    stateErrors () {
      const errors = []
      if (!this.$v.form.state___.$dirty) return errors
      !this.$v.form.state___.required && errors.push('State is required.')
      return errors
    },
    cityErrors () {
      const errors = []
      if (!this.$v.form.city____.$dirty) return errors
      !this.$v.form.city____.required && errors.push('City is required')
      return errors
    },
    zipCodeErrors () {
      const errors = []
      if (!this.$v.form.zip_code.$dirty) return errors
      !this.$v.form.zip_code.required && errors.push('Zip Code is required')
      return errors
    },
    firstNameErrors () {
      const errors = []
      if (!this.$v.form.frst_nme.$dirty) return errors
      !this.$v.form.frst_nme.maxLength && errors.push('First Name must be 30 characters long.')
      !this.$v.form.frst_nme.required && errors.push('First Name is required.')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.form.last_nme.$dirty) return errors
      !this.$v.form.last_nme.maxLength && errors.push('Last Name must be 30 characters long.')
      !this.$v.form.last_nme.required && errors.push('Last Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.form.email___.$dirty) return errors
      !this.$v.form.email___.maxLength && errors.push('E-mail must be 50 characters long.')
      !this.$v.form.email___.email && errors.push('Must be valid e-mail')
      !this.$v.form.email___.required && errors.push('E-mail is required')

      return errors
    },
    mobileErrors () {
      const errors = []
      if (!this.$v.form.mobile__.$dirty) return errors
      !this.$v.form.mobile__.maxLength && errors.push('Mobile Number must be 25 characters long.')
      !this.$v.form.mobile__.required && errors.push('Mobile Number is required')
      errors.push(this.errors.mobile__[0])
      return errors
    },
    positionErrors () {
      const errors = []
      if (!this.$v.form.position.$dirty) return errors
      !this.$v.form.position.maxLength && errors.push('Position must be 30 characters long.')
      !this.$v.form.position.required && errors.push('Position is required.')
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
      this.email___ = ''
      this.mobile__ = ''
    },
    async retrieveRegions () {
      try {
        // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
        await new Promise((resolve, reject) => {
          axios.get('/api/regions')
            .then(response => {
              this.regions = response.data
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      } catch (error) {
      }
    },
    clientRegister () {
      try {
        return new Promise((resolve, reject) => {
          axios.post('c/register/', this.form)
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              if (error.response.status === 422) {
                this.errors = error.response.data.errors
              }
              reject(error)
            })
        })
      } catch (error) {
      }
    }
  },
  created () {
    this.retrieveRegions()
  }
}
</script>
