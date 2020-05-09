<template>
<v-app>
  <v-layout v-if="loadingSave" row justify-center align-center>
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-layout>
  <v-card v-else v-show="show">
    <v-app-bar
      color="primary"
      dense
      dark
      elevation="3"
    >
      <v-btn
        icon
        @click="back"
      >
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <v-toolbar-title v-text="c_cardTitle"></v-toolbar-title>
      <v-spacer></v-spacer>
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
          <v-list-item @click="reload">
            <v-list-item-title>Reload</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Print</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-row
      class="py-3"
      justify="center"
    >
      <v-avatar
        class="profile"
        color="grey"
        size="100"
        rounded
      >
        <v-img :src="this.form.avatar__" alt="john"></v-img>
      </v-avatar>
    </v-row>
    <v-row class="mt-n6">
      <v-col cols="12" md="12">
        <v-card-title v-text="h_fullName" class="justify-center font-weight-light"></v-card-title >
      </v-col>
    </v-row>
    <v-row class="mt-n12">
      <v-col cols="12" md="12">
        <v-card-subtitle v-text="h_position" align="center"></v-card-subtitle>
      </v-col>
    </v-row>
    <!-- tabs component -->
    <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
    >
      <v-tab
        v-for="tabHeader in tabHeaders"
        :key="tabHeader"
        class="font-weight-light"
      >
        {{ tabHeader }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <!-- personal -->
      <v-tab-item>
        <v-card flat>
          <v-container>
          <!-- IDs -->
          <v-row class="mt-4">
            <!-- system id -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="form.empl_cde"
                label="System ID"
                hint="System Generated"
                persistent-hint
                outlined
                dense
                rounded
                readonly
              ></v-text-field>
            </v-col>
            <!-- company ID -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="form.asso_cde"
                label="Company ID"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
            <!-- biometrics ID -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="form.chro_num"
                label="Biometrics ID"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
            <!-- reserve ID -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="form.empl_cd2"
                label="Reserve ID"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- end of IDs-->
          <v-divider></v-divider>
          <!-- names -->
          <v-row>
            <!-- last name -->
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="form.last_nme"
                label="Last name"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
            <!-- first name -->
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="form.frst_nme"
                label="First name"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
            <!-- middle name -->
            <v-col cols="12" sm="6" md="2">
              <v-text-field
                v-model="form.midl_nme"
                label="Middle name"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
            <!-- middle initial -->
            <v-col cols="12" sm="6" md="2">
              <v-text-field
                v-model="form.midl_ini"
                label="Middle initial"
                :rules="r_middleInitial"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- end of names-->
          <!-- 3rd row -->
          <v-row class="mt-n4">
          <!-- nickname -->
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="form.nickname"
              label="Nickname"
              outlined
              dense
              rounded
            ></v-text-field>
          </v-col>
          <!-- birthday -->
          <v-col cols="12" sm="6" md="3">
            <v-menu
              v-model="birthdayMenu"
              :close-on-content-click="false"
              transition="scale-transition"
            >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="form.birthday"
                label="Birthday"
                hint="YYYY-MM-DD"
                persistent-hint
                outlined
                dense
                rounded
                v-on="on"
              ></v-text-field>
            </template>
              <v-date-picker
                v-model="form.birthday"
                no-title
                @input="birthdayPicker = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <!-- sex -->
          <v-col cols="12" sm="6" md="2">
            <v-select
              v-model="form.sex_____"
              :items="gender"
              item-text="text"
              item-value="value"
              label="Gender"
              outlined
              dense
              rounded
            ></v-select>
          </v-col>
          <!-- civil status -->
          <v-col cols="12" sm="6" md="2">
            <v-select
              v-model="form.cvilstat"
              :items="civilStatus"
              item-text="text"
              item-value="value"
              label="Civil Status"
              outlined
              dense
              rounded
            ></v-select>
          </v-col>
          </v-row>
          <!-- end of 3rd row -->
          <!-- 4th row -->
          <!-- address/city/state/zip -->
          <!-- end of 4th row -->
          <!-- 5th row -->
          <v-row class="mt-n4">
            <!-- mobile number -->
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Mobile number"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
            <!-- email -->
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Mobile number"
                outlined
                dense
                rounded
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- end of 5th row  -->
          </v-container>
        </v-card>
      </v-tab-item>
      <!-- end of personal -->
      <!-- general -->
      <v-tab-item>
        <v-card flat>
          <v-container>
            <!-- Dates and work status-->
            <v-row class="mt-4">
              <!-- work status -->
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="form.workstat"
                  :items="workStat"
                  item-text="descript"
                  item-value="cntrl_no"
                  label="Work Status"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- date hired -->
              <v-col cols="12" sm="6" md="2">
                <v-menu
                  v-model="dateHiredMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="form.dte_hire"
                    label="Date Hired"
                    outlined
                    dense
                    rounded
                    v-on="on"
                  ></v-text-field>
                </template>
                  <v-date-picker
                    v-model="form.dte_hire"
                    no-title
                    @input="dateHiredPicker = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <!-- date regular -->
              <v-col cols="12" sm="6" md="2">
                <v-menu
                  v-model="dateRegularMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="form.dte_rglr"
                    label="Date Regular"
                    outlined
                    dense
                    rounded
                    v-on="on"
                  ></v-text-field>
                </template>
                  <v-date-picker
                    v-model="form.dte_rglr"
                    no-title
                    @input="dateRegularPicker = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <!-- date resign -->
              <v-col cols="12" sm="6" md="2">
                <v-menu
                  v-model="dateResignMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="form.dte_rsgn"
                    label="Date Resign"
                    outlined
                    dense
                    rounded
                    v-on="on"
                    :disabled="c_disableDateResign"
                  ></v-text-field>
                </template>
                  <v-date-picker
                    v-model="form.dte_rsgn"
                    no-title
                    @input="dateResignPicker = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <!-- end of contract -->
              <!-- please include eoc option in table work status to trigger disabled-->
              <v-col cols="12" sm="6" md="2">
                <v-menu
                  v-model="dateEocMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="form.dte_eoc_"
                    label="Date EOC"
                    outlined
                    dense
                    rounded
                    v-on="on"
                  ></v-text-field>
                </template>
                  <v-date-picker
                    v-model="form.dte_eoc_"
                    no-title
                    @input="dateEocPicker = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
              <!-- end of dates and work status -->
              <!-- 2nd row -->
            <v-row class="mt-n4">
              <!-- employment status -->
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="form.emp_stat"
                  :items="emplStat"
                  item-text="descript"
                  item-value="cntrl_no"
                  label="Employment Status"
                  @change="employmentDefault"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- positions -->
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="form.pos_code"
                  :items="positions"
                  item-text="descript"
                  item-value="pos_code"
                  label="Positions"
                  outlined
                  dense
                  rounded
                >
                </v-select>
              </v-col>
              <!-- work area -->
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="form.workarea"
                  :items="workArea"
                  item-text="descript"
                  item-value="cntrl_no"
                  label="Work Area"
                  outlined
                  dense
                  rounded
              ></v-select>
              </v-col>
            </v-row>
              <!-- end of 2nd row -->
              <!-- 3rd row -->
            <v-row class="mt-n4">
              <!-- divisions -->
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="form.grp_lvl1"
                  :items="division"
                  item-text="descript"
                  item-value="pos_code"
                  label="Division"
                  outlined
                  dense
                  rounded
              ></v-select>
              </v-col>
              <!-- department  -->
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="form.grp_lvl2"
                  :items="department"
                  item-text="descript"
                  item-value="pos_code"
                  label="Department"
                  outlined
                  dense
                  rounded
              ></v-select>
              </v-col>
              <!-- section -->
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="form.grp_lvl3"
                  :items="section"
                  item-text="descript"
                  item-value="pos_code"
                  label="Section"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
            </v-row>
            <!-- end of 3rd row -->
            <v-divider class="mt-n2"></v-divider>
            <!-- 4th row -->
            <v-row class="mt-3">
              <!-- rate type -->
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-model="form.rate_typ"
                  :items="rate_typ"
                  item-text="text"
                  item-value="value"
                  label="Rate Type"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- minimum wage -->
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="form.min_wage"
                  :items="TrueOrFalse"
                  item-text="text"
                  item-value="value"
                  label="Minimum Wage"
                  @change="minWage"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- trainee -->
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="form.trainee_"
                  :items="TrueOrFalse"
                  item-text="text"
                  item-value="value"
                  label="Trainee"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- flexible time -->
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="form.alw_flex"
                  :items="TrueOrFalse"
                  item-text="text"
                  item-value="value"
                  label="Flexible Time"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- default shift -->
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-model="form.shft_cde"
                  :items="shftFile"
                  item-text="std_shft"
                  item-value="shft_cde"
                  label="Official Shift"
                  outlined
                  dense
                  rounded
                  :disabled="c_disableShiftFile"
                ></v-select>
              </v-col>
            </v-row>
            <!-- end of 4th row -->
            <!-- 5th row -->
            <v-row class="mt-n4">
              <!-- restday - have own function m_restday is default-->
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="m_restday"
                  :items="restdayItem"
                  item-text="text"
                  item-value="value"
                  label="Restday"
                  hint="Maximum of two restday only"
                  persistent-hint
                  multiple
                  outlined
                  dense
                  rounded
                  chips
                  small-chips
                ></v-select>
              </v-col>
              <!-- compress week -->
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="form.compweek"
                  :items="TrueOrFalse"
                  item-text="text"
                  item-value="value"
                  label="Compress Week"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- required biometrics -->
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="form.bio_reqd"
                  :items="TrueOrFalse"
                  item-text="text"
                  item-value="value"
                  label="Bio Required"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- required biometrics -->
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="form.tmeinout"
                  :items="TrueOrFalse"
                  item-text="text"
                  item-value="value"
                  label="Time In / Out"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- early time in -->
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="form.earlytme"
                  :items="TrueOrFalse"
                  item-text="text"
                  item-value="value"
                  label="Early Time-In"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
            </v-row>
            <!-- end of 5th row -->
            <!-- 6th row -->
            <v-row class="mt-n2">
              <!-- allow overtime -->
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="form.alw_ot__"
                  :items="TrueOrFalse"
                  item-text="text"
                  item-value="value"
                  label="Overtime"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- allow overtime -->
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="form.alw_nsd_"
                  :items="TrueOrFalse"
                  item-text="text"
                  item-value="value"
                  label="Night Differential"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- allow overtime -->
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="form.alw_nsd_"
                  :items="TrueOrFalse"
                  item-text="text"
                  item-value="value"
                  label="Holiday"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
      <!-- end of general -->
      <!-- government -->
      <v-tab-item>
        <v-card flat>
          <v-container>
          <!-- government -->
          <v-row class="mt-4">
            <!-- tin number -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="form.tax_numb"
                v-mask="maskTin"
                label="Tin number"
                outlined
                dense
                rounded
              >
              </v-text-field>
            </v-col>
            <!-- sss number -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="form.sss_numb"
                v-mask="maskSss"
                label="Sss number"
                outlined
                dense
                rounded
              >
              </v-text-field>
            </v-col>
            <!-- pagibig number -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="form.pag_ibig"
                v-mask="maskPagibig"
                label="Pagibig number"
                outlined
                dense
                rounded
              >
              </v-text-field>
            </v-col>
            <!-- philhealth number -->
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="form.philhlth"
                v-mask="maskPhic"
                label="Philhealth number"
                outlined
                dense
                rounded
              >
              </v-text-field>
            </v-col>
          </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
      <!-- end of government -->
      <!-- payroll -->
      <v-tab-item>
        <v-card flat>
          <v-container>
            <!-- Payroll -->
            <v-row class="mt-4">
              <!-- with payroll -->
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="form.alw_payr"
                  :items="TrueOrFalse"
                  item-text="text"
                  item-value="value"
                  label="With Payroll"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- payroll group -->
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="form.paygroup"
                  :items="payrollGroup"
                  item-text="descript"
                  item-value="group_no"
                  label="Payroll Group"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- compute sss -->
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="form.comp_sss"
                  :items="TrueOrFalse"
                  item-text="text"
                  item-value="value"
                  label="SSS"
                  hint="Compute"
                  persistent-hint
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- compute philheatlh -->
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="form.comp_med"
                  :items="TrueOrFalse"
                  item-text="text"
                  item-value="value"
                  label="Philhealth"
                  hint="Compute"
                  persistent-hint
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- compute pagibig -->
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="form.comp_pgi"
                  :items="TrueOrFalse"
                  item-text="text"
                  item-value="value"
                  label="Pag-ibig"
                  hint="Compute"
                  persistent-hint
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
            </v-row>
            <!-- end of with payroll -->
            <!-- 2nd row -->
            <v-row class="mt-n4">
              <!-- compute tax -->
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="form.comp_tax"
                  :items="TrueOrFalse"
                  item-text="text"
                  item-value="value"
                  label="Tax"
                  hint="Compute"
                  persistent-hint
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- tax type -->
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-model="form.tax_type"
                  :items="taxType"
                  item-text="text"
                  item-value="value"
                  label="Tax Type"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- tax over -->
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="form.tax_over"
                  :items="TrueOrFalse"
                  item-text="text"
                  item-value="value"
                  label="Tax Over"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- pagibig type -->
              <v-col cols="12" sm="6" md="5">
                <v-select
                  v-model="form.pgbig_cd"
                  :items="pagibigType"
                  item-text="text"
                  item-value="value"
                  label="Pagibig Type"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
            </v-row>
            <!-- end of 2nd row -->
            <!-- 3rd row -->
            <v-row class="mt-n4">
              <!-- payroll bank -->
              <v-col cols="12" sm="6" md="5">
                <v-select
                  v-model="form.bankfile"
                  :items="bank"
                  item-text="descript"
                  item-value="bank_cde"
                  label="Bank"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- account type -->
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-model="form.acct_typ"
                  :items="bankType"
                  item-text="text"
                  item-value="value"
                  label="Account Type"
                  outlined
                  dense
                  rounded
                ></v-select>
              </v-col>
              <!-- Account number -->
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.acct_num"
                  label="Account Number"
                  outlined
                  dense
                  rounded
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- 3rd row -->
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-row justify="center">
      <dialogSaveUpdate
        v-if="dialog"
        dialog
        title="Save new employee?"
        content="Note: You are not allowed to change the System Code after you agree"
        :dialogsave="this.dialogSave"
      >
      <template v-slot:b-close>
        <v-btn
          color="green darken-1"
          text
          @click="dialog = false"
        >
          Disagree
        </v-btn>
      </template>
      <template v-slot:b-submit>
        <v-btn
          color="green darken-1"
          text
          @click="save(); dialog = false"
        >
          Agree
        </v-btn>
      </template>
      </dialogSaveUpdate>
    </v-row>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-if="create" @click.stop="dialog = true" text>Save</v-btn>
      <v-btn v-if="!create" @click.stop="dialog = true" text>Update</v-btn>
      <v-btn @click="cancel" text>Cancel</v-btn>
    </v-card-actions>
    <v-snackbar v-model="snack" :timeout="snackTimeOut" :color="snackColor">
        <h3>{{ snackText }}</h3>
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</v-app>
</template>
<script>
import axios from 'axios'
import { Form } from 'vform'
import { mask } from 'vue-the-mask'
import { masterfileForm } from '@/form/masterfile'
import { VtrimObject, VtrimArrayObject } from '@/util/trimmer'
import { Vgender, Vcivilstatus, Vratetype, Vweek, Vboolean } from '@/util/helper'
import dialogSaveUpdate from '@/components/dialogs/masterfile/DialogSaveUpdate.vue'

export default {
  name: 'NewEmployee',
  components: {
    dialogSaveUpdate
  },
  props: {
    employeeData: Object,
    create: Boolean
  },
  data () {
    return {
      primekey: localStorage.getItem('primekey'),
      h_fullName: '',
      h_position: '',
      r_middleInitial: [v => v.length <= 1],
      snackText: '',
      snackColor: '',
      m_maskTin: null,
      m_section: null,
      m_maskSss: null,
      m_position: null,
      m_workStat: null,
      m_workArea: null,
      f_emplStat: '',
      m_maskPhic: null,
      m_division: null,
      m_department: null,
      m_maskPagibig: null,
      form: '',
      bank: [],
      gender: [],
      section: [],
      workStat: [],
      emplStat: [],
      workArea: [],
      division: [],
      shftFile: [],
      rate_typ: [],
      m_restday: [],
      positions: [],
      department: [],
      civilStatus: [],
      restdayItem: [],
      TrueOrFalse: [],
      payrollGroup: [],
      emplStatData: [],
      snackTimeOut: 3000,
      maskTin: '###-###-###',
      maskSss: '##-#######-#',
      maskPagibig: '####-####-####',
      maskPhic: '##-#########-#',
      tab: null,
      birthday: null,
      dateHired: null,
      dateResign: null,
      dateRegular: null,
      show: true,
      snack: false,
      dialog: false,
      loading: true,
      dialogSave: false,
      loadingSave: false,
      birthdayMenu: false,
      birthdayPicker: false,
      dateHiredMenu: false,
      dateHiredPicker: false,
      dateRegularMenu: false,
      dateRegularPicker: false,
      dateResignMenu: false,
      dateResignPicker: false,
      dateEocMenu: false,
      dateEocPicker: false,
      disable_dateResign: true,
      images: {
        company: require('@/assets/android-chrome-192x192.png'),
        profile: require('@/assets/me2.jpg')
      },
      restday: [],
      tabHeaders: [
        'Personal', 'General', 'Government', 'Payroll'
      ],
      taxType: [
        {
          value: 'C',
          text: 'Compensation'
        },
        {
          value: 'E',
          text: 'Expanded'
        }
      ],
      pagibigType: [
        {
          value: '1',
          text: 'Maximum contribution of 100'
        },
        {
          value: '2',
          text: 'Percentage of Monthly Contribution (MC)'
        },
        {
          value: '3',
          text: 'EE % of MC + ER portion over P5000.00'
        },
        {
          value: '4',
          text: 'Input Employee/Employer contribution'
        }
      ],
      bankType: [
        {
          value: 'X',
          text: 'No Account'
        },
        {
          value: 'S',
          text: 'Savings'
        },
        {
          value: 'C',
          text: 'Checking'
        }
      ]
    }
  },
  computed: {
    c_cardTitle () {
      return this.create ? 'Create New Employee' : 'Edit Employee Information'
    },
    c_disableDateResign: {
      get: function () {
        let disable = null
        const filterDateResign = this.workStat.filter((item) => {
          return item.cntrl_no === this.form.workstat
        })
        const withDateResign = filterDateResign.map((item) => {
          return item.w_dte_rsgn
        })
        const objectArray = Object.entries(withDateResign)
        objectArray.forEach(([key, value]) => {
          disable = value
        })
        // disable date resign if this value is F (true)
        return disable === null ? true : disable === 'F'
      },
      set: function (newValue) {
        this.form.workstat = newValue
      }
    },
    c_disableShiftFile () {
      return this.form.alw_flex === 'T'
    }
  },
  watch: {
  },
  methods: {
    back () {
      this.cloneProps()
      this.form = new Form()
      this.$root.$emit('newEmployee', false)
    },
    reload () {
      this.$store.commit('resetMasterfileReference')
      this.loadWorkStat()
      this.loadEmplStat()
      this.loadPositions()
      this.loadWorkArea()
      this.loadSection()
      this.loadDepartment()
      this.loadDivision()
      this.loadShiftFile()
      this.payrollGroup()
      this.loadBank()
      this.arrayRestDay()
    },
    cancel () {
      this.cloneProps()
      this.form = new Form()
      this.$root.$emit('newEmployee', false)
    },
    callExport () {
      this.gender = Vgender
      this.rate_typ = Vratetype
      this.civilStatus = Vcivilstatus
      this.restdayItem = Vweek
      this.TrueOrFalse = Vboolean
      this.form = masterfileForm
    },
    minWage () {
      this.form.min_wage === 'T' ? this.form.comp_tax = 'F' : this.form.comp_tax = 'T'
    },
    trimForm (item) {
      VtrimObject(item)
    },
    employmentDefault () {
      this.loadEmplStatData()
    },
    destructuringRestDay () {
      let restDay, restDa2
      [restDay, restDa2] = [this.m_restday[0], this.m_restday[1]] // get first two element in array and copy to each element in assignment variable
      restDay = typeof restDay === 'undefined' ? '0' : restDay // catch undefined and replace temporary value
      restDa2 = typeof restDa2 === 'undefined' ? '0' : restDa2 // catch undefined and replcae temporary value
      this.form.rest_day = restDay
      this.form.rest_da2 = restDa2
    },
    arrayRestDay () {
      this.m_restday.push(this.form.rest_day, this.form.rest_da2) // first - accept two rest day
      const filteredRestDay = this.m_restday.filter(e => e !== '0') // second - filter rest day not equal to 0
      this.m_restday = [ ...filteredRestDay ] // final - replace m_restday to filteredRestDay without zero
    },
    cloneProps () {
      // this also a reset form
      // this.form = new Form()
      const employeeData = this.employeeData
      Object.keys(employeeData).forEach(key => {
        this.form[key] = employeeData[key]
      })
      // option 2
      // this.form = Object.assign({}, employeeData)
      // option 3
      // this.form = { ...this.employeeData }
    },
    update () {
      // this.destructuringRestDay()
    },
    save () {
      this.destructuringRestDay()
      this.loadingSave = true
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
      if (this.$store.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          this.form.post('u/maintenance/masterfile/create')
            .then(response => {
              resolve(response)
              this.snack = true
              this.snackColor = 'success'
              this.snackText = 'Successfully added!'
              this.snackTimeOut = 3000
              this.loadingSave = false
              this.cloneProps()
              this.create === false || this.requestEmployeeCode()
            })
            .catch(error => {
              reject(error)
              this.snack = true
              this.snackColor = 'error'
              this.snackText = 'Error while saving.'
              this.snackTimeOut = 3000
              this.loadingSave = false
            })
        })
      }
    },
    header () {
      this.h_fullName = this.employeeData.frst_nme + ' ' + this.employeeData.midl_nme + ' ' + this.employeeData.last_nme
      this.h_position = 'Software Engineer'
    },
    checkEmployeeCode () {
      // call this function before save
      this.$store.dispatch('employeeCodeChecker', {
        primekey: this.primekey,
        tableName: 's_empl_mst'
      })
        .then(response => {
          if (this.form.empl_cde === response.data) {
            this.snack = true
            this.snackColor = 'error'
            this.snackText = 'System code is already exist. !'
            this.snackTimeOut = 6000
          }
        })
    },
    requestEmployeeCode () {
      this.$store.dispatch('retrieveEmployeeCode', {
        primekey: this.primekey
      })
        .then(response => {
          this.form.empl_cde = this.$store.getters.retrieveEmployeeCode
          this.form.empl_cd2 = this.$store.getters.retrieveEmployeeCode
          this.form.asso_cde = this.$store.getters.retrieveEmployeeCode
          this.form.chro_num = this.$store.getters.retrieveEmployeeCode
        })
    },
    loadBank () {
      this.$store.dispatch('retrieveBank', {
        primekey: this.primekey
      })
        .then(response => {
          this.bank = this.$store.getters.retrieveBank
        })
    },
    loadPayrollGroup () {
      // display all day type
      this.$store.dispatch('retrievePayrollGroup', {
        primekey: this.primekey
      })
        .then(response => {
          this.payrollGroup = this.$store.getters.retrievePayrollGroup
        })
    },
    loadShiftFile () {
      // display all day type
      this.$store.dispatch('retrieveShiftFile', {
        primekey: this.primekey
      })
        .then(response => {
          this.shftFile = this.$store.getters.retrieveShiftFile
          // this.objectTrimmer(this.shftFile)
          VtrimArrayObject(this.shftFile)
        })
    },
    // objectTrimmer (item) {
    //   VtrimObject(item)
    //   // item.forEach((item) => {
    //   //   Object.entries(item).forEach(([key, value]) => {
    //   //     item[key] = item[key].trim()
    //   //   })
    //   // })
    // },
    loadWorkStat () {
      this.$store.dispatch('retrieveWorkStat', {
        primekey: this.primekey
      })
        .then(response => {
          this.workStat = this.$store.getters.retrieveWorkStat
        })
    },
    loadEmplStatData () {
      this.$store.dispatch('retrieveEmplStatData', {
        primekey: this.primekey,
        emp_stat: this.form.emp_stat
      })
        .then(response => {
          this.emplStatData = this.$store.getters.retrieveEmplStatData
          const obj = Object.assign({}, this.emplStatData)
          this.form.paygroup = obj[0].defu_paygroup
          this.form.rate_typ = obj[0].defu_rate_typ
          this.form.comp_tax = obj[0].defu_comp_tax
          this.form.comp_sss = obj[0].defu_comp_sss
          this.form.comp_med = obj[0].defu_comp_med
          this.form.comp_pgi = obj[0].defu_comp_pgi
          this.form.min_wage = obj[0].defu_min_wage
        })
    },
    loadEmplStat () {
      this.$store.dispatch('retrieveEmplStat', {
        primekey: this.primekey
      })
        .then(response => {
          this.emplStat = this.$store.getters.retrieveEmplStat
        })
    },
    loadPositions () {
      this.$store.dispatch('retrievePositions', {
        primekey: this.primekey
      })
        .then(response => {
          this.positions = this.$store.getters.retrievePositions
          this.objPos = this.$store.getters.retrievePositions
        })
    },
    loadWorkArea () {
      this.$store.dispatch('retrieveWorkArea', {
        primekey: this.primekey
      })
        .then(response => {
          this.workArea = this.$store.getters.retrieveWorkArea
        })
    },
    loadDivision () {
      this.$store.dispatch('retrieveDivision', {
        primekey: this.primekey
      })
        .then(response => {
          this.division = this.$store.getters.retrieveDivision
        })
    },
    loadDepartment () {
      this.$store.dispatch('retrieveDepartment', {
        primekey: this.primekey
      })
        .then(response => {
          this.department = this.$store.getters.retrieveDepartment
        })
    },
    loadSection () {
      this.$store.dispatch('retrieveSection', {
        primekey: this.primekey
      })
        .then(response => {
          this.section = this.$store.getters.retrieveSection
        })
    }
  },
  created () {
    this.header()
    this.callExport()
    if (this.create) {
      // run once
      this.cloneProps()
      this.requestEmployeeCode()
    } else {
      // run once
      this.cloneProps()
    }
    this.loadWorkStat()
    this.loadEmplStat()
    this.loadPositions()
    this.loadWorkArea()
    this.loadSection()
    this.loadDepartment()
    this.loadDivision()
    this.loadShiftFile()
    this.loadPayrollGroup()
    this.loadBank()
    this.loadEmplStatData()
    this.arrayRestDay()
    this.trimForm(this.form)
  },
  directives: {
    mask
  }
}
</script>
