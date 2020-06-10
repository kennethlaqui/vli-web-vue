<template>
  <div>
    <v-app-bar
      color="primary"
      dense
      dark
    >
      <v-btn
        icon
      >
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <v-toolbar-title>Reference Files</v-toolbar-title>

      <v-spacer></v-spacer>
        <!-- work status button -->
        <v-btn
          v-if="settings.panelIndex === 0"
          v-show="settings.panelShow"
          class="mr-4"
          icon
          @click="dialog.d_workstat = true, dialog.dialogTitle='Create Work Status'"
        >
          <v-icon>mdi-text-box-plus</v-icon>
        </v-btn>
        <!-- employment status -->
        <v-btn
          v-if="settings.panelIndex === 1"
          v-show="settings.panelShow"
          class="mr-4"
          icon
          @click="dialog.d_employment = true, dialog.dialogTitle='Create Employment Status'"
        >
          <v-icon>mdi-text-box-plus</v-icon>
        </v-btn>
        <!-- positions -->
        <v-btn
          v-if="settings.panelIndex === 2"
          v-show="settings.panelShow"
          class="mr-4"
          icon
          @click="dialog.d_position = true, dialog.dialogTitle='Create Position'"
        >
          <v-icon>mdi-text-box-plus</v-icon>
        </v-btn>
        <!-- workarea -->
        <v-btn
          v-if="settings.panelIndex === 3"
          v-show="settings.panelShow"
          class="mr-4"
          icon
          @click="dialog.d_workarea = true, dialog.dialogTitle='Create Workarea'"
        >
          <v-icon>mdi-text-box-plus</v-icon>
        </v-btn>
        <!-- division -->
        <v-btn
          v-if="settings.panelIndex === 4"
          v-show="settings.panelShow"
          class="mr-4"
          icon
          @click="dialog.d_division = true, dialog.dialogTitle='Create Division'"
        >
          <v-icon>mdi-text-box-plus</v-icon>
        </v-btn>
        <!-- department -->
        <v-btn
          v-if="settings.panelIndex === 5"
          v-show="settings.panelShow"
          class="mr-4"
          icon
          @click="dialog.d_department = true, dialog.dialogTitle='Create Department'"
        >
          <v-icon>mdi-text-box-plus</v-icon>
        </v-btn>
        <!-- section -->
        <v-btn
          v-if="settings.panelIndex === 6"
          v-show="settings.panelShow"
          class="mr-4"
          icon
          @click="dialog.d_section = true, dialog.dialogTitle='Create Section'"
        >
          <v-icon>mdi-text-box-plus</v-icon>
        </v-btn>
    </v-app-bar>
    <v-expansion-panels
      v-model="settings.panelIndex"
      hover
    >
      <!-- 1st row -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          <span>Work Status
            <span class="font-italic">
              - Control Your Masterfile.
            </span>
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- Work status component -->
          <Workstat :reloadWorkStat="reloadWorkStat"></Workstat>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- 2nd row -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          <span>Employement Status
            <span class="font-italic">
              - Set Your Default Parameters.
            </span>
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- Employment status component -->
          <Employment :reloadEmployment="reloadEmployment"></Employment>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- 3rd row -->
      <v-expansion-panel>
        <v-expansion-panel-header>Position</v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- Position component -->
          <Position :reloadPosition="reloadPosition"></Position>
          <!-- <Employment :reloadEmployment="reloadEmployment"></Employment> -->
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- 4th row -->
      <v-expansion-panel>
        <v-expansion-panel-header>Work Area</v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- Workarea component -->
          <Workarea :reloadWorkarea="reloadWorkarea"></Workarea>
          <!-- <Employment :reloadEmployment="reloadEmployment"></Employment> -->
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- 5th row -->
      <v-expansion-panel>
        <v-expansion-panel-header>Division</v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- Division component -->
          <Division :reloadDivision="reloadDivision"></Division>
          <!-- <Employment :reloadEmployment="reloadEmployment"></Employment> -->
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- 6th row -->
      <v-expansion-panel>
        <v-expansion-panel-header>Department</v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- Division component -->
          <Department :reloadDepartment="reloadDepartment"></Department>
          <!-- <Employment :reloadEmployment="reloadEmployment"></Employment> -->
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- 7th row -->
      <v-expansion-panel>
        <v-expansion-panel-header>Section</v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- Division component -->
          <Section :reloadSection="reloadSection"></Section>
          <!-- <Employment :reloadEmployment="reloadEmployment"></Employment> -->
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- dialog / create -->
    <!-- work status -->
    <WorkstatCreate
      v-if="dialog.d_workstat"
      dialog
    />
    <!-- employment dialog -->
    <EmploymentCreate
      v-if="dialog.d_employment"
      dialog
    />
    <!-- position dialog -->
    <PositionCreate
      v-if="dialog.d_position"
      dialog
    />
    <!-- Workarea dialog -->
    <WorkareaCreate
      v-if="dialog.d_workarea"
      dialog
    />
    <!-- Division dialog -->
    <DivisionCreate
      v-if="dialog.d_division"
      dialog
    />
    <!-- Department dialog -->
    <DepartmentCreate
      v-if="dialog.d_department"
      dialog
    />
    <!-- Section dialog -->
    <SectionCreate
      v-if="dialog.d_section"
      dialog
    />
  </div>
</template>
<script>
import Workstat from '@/components/maintenance/reference/Workstat'
import Employment from '@/components/maintenance/reference/Employment'
import Position from '@/components/maintenance/reference/Position'
import Workarea from '@/components/maintenance/reference/Workarea'
import Division from '@/components/maintenance/reference/Division'
import Department from '@/components/maintenance/reference/Department'
import Section from '@/components/maintenance/reference/Section'
import WorkstatCreate from '@/components/maintenance/reference/create/Workstat'
import EmploymentCreate from '@/components/maintenance/reference/create/Employment'
import PositionCreate from '@/components/maintenance/reference/create/Position'
import WorkareaCreate from '@/components/maintenance/reference/create/Workarea'
import DivisionCreate from '@/components/maintenance/reference/create/Division'
import DepartmentCreate from '@/components/maintenance/reference/create/Department'
import SectionCreate from '@/components/maintenance/reference/create/Section'

export default {
  name: 'Reference',
  components: {
    Workstat,
    Employment,
    Position,
    Workarea,
    Division,
    Department,
    Section,
    WorkstatCreate,
    EmploymentCreate,
    PositionCreate,
    WorkareaCreate,
    DivisionCreate,
    DepartmentCreate,
    SectionCreate
  },
  data () {
    return {
      reloadWorkStat: false,
      reloadEmployment: false,
      reloadPosition: false,
      reloadWorkarea: false,
      reloadDivision: false,
      reloadDepartment: false,
      reloadSection: false,
      dialog: {
        dialogTitle: '',
        d_workstat: false,
        d_employment: false,
        d_position: false,
        d_workarea: false,
        d_division: false,
        d_department: false,
        d_section: false
      },
      settings: {
        panelIndex: -1,
        panelShow: false
      }
    }
  },
  watch: {
    'settings.panelIndex': function () {
      typeof this.settings.panelIndex === 'undefined' ? this.settings.panelShow = false : this.settings.panelShow = true
    }
  },
  methods: {
    dd () {
      // console.log('clicked')
    }
  },
  created () {
    // workstat
    this.$root.$on('closeWorkstaDialog', () => {
      this.dialog.d_workstat = false
    })
    this.$root.$on('reloadWorkStat', () => {
      this.reloadWorkStat = true
    })
    this.$root.$on('reloadWorkStat', (payload) => {
      if (payload === false) {
        this.reloadWorkStat = false
      }
    })
    // employment
    this.$root.$on('closeEmploymentDialog', () => {
      this.dialog.d_employment = false
    })
    this.$root.$on('reloadEmployment', () => {
      this.reloadEmployment = true
    })
    this.$root.$on('reloadEmployment', (payload) => {
      if (payload === false) {
        this.reloadEmployment = false
      }
    })
    // position
    this.$root.$on('closePositionDialog', () => {
      this.dialog.d_position = false
    })
    this.$root.$on('reloadPosition', () => {
      this.reloadPosition = true
    })
    this.$root.$on('reloadPosition', (payload) => {
      if (payload === false) {
        this.reloadPosition = false
      }
    })
    // workarea
    this.$root.$on('closeWorkareaDialog', () => {
      this.dialog.d_workarea = false
    })
    this.$root.$on('reloadWorkarea', () => {
      this.reloadWorkarea = true
    })
    this.$root.$on('reloadWorkarea', (payload) => {
      if (payload === false) {
        this.reloadWorkarea = false
      }
    })
    // division
    this.$root.$on('closeDivisionDialog', () => {
      this.dialog.d_division = false
    })
    this.$root.$on('reloadDivision', () => {
      this.reloadDivision = true
    })
    this.$root.$on('reloadDivision', (payload) => {
      if (payload === false) {
        this.reloadDivision = false
      }
    })
    // department
    this.$root.$on('closeDepartmentDialog', () => {
      this.dialog.d_department = false
    })
    this.$root.$on('reloadDepartment', () => {
      this.reloadDepartment = true
    })
    this.$root.$on('reloadDepartment', (payload) => {
      if (payload === false) {
        this.reloadDepartment = false
      }
    })
    // section
    this.$root.$on('closeSectionDialog', () => {
      this.dialog.d_section = false
    })
    this.$root.$on('reloadSection', () => {
      this.reloadSection = true
    })
    this.$root.$on('reloadSection', (payload) => {
      if (payload === false) {
        this.reloadSection = false
      }
    })
  }
}
</script>
