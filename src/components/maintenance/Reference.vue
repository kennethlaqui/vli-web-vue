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
          <v-icon>mdi-account-multiple-plus</v-icon>
        </v-btn>
        <!-- employment status -->
        <v-btn
          v-if="settings.panelIndex === 1"
          v-show="settings.panelShow"
          class="mr-4"
          icon
          @click="dialog.d_employment = true, dialog.dialogTitle='Create Employment Status'"
        >
          <v-icon>mdi-folder</v-icon>
        </v-btn>
        <!-- positions -->
        <v-btn
          v-if="settings.panelIndex === 2"
          v-show="settings.panelShow"
          class="mr-4"
          icon
          @click="dialog.d_position = true, dialog.dialogTitle='Create Position'"
        >
          <v-icon>mdi-folder</v-icon>
        </v-btn>
    </v-app-bar>
    <v-expansion-panels v-model="settings.panelIndex">
      <!-- 1st row -->
      <v-expansion-panel>
        <v-expansion-panel-header>Work Status</v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- Work status component -->
          <Workstat :reloadWorkStat="reloadWorkStat"></Workstat>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- 2nd row -->
      <v-expansion-panel>
        <v-expansion-panel-header>Employment</v-expansion-panel-header>
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
        <!-- employment dialog -->
    <PositionCreate
      v-if="dialog.d_position"
      dialog
    />
  </div>
</template>
<script>
import Workstat from '@/components/maintenance/reference/Workstat'
import Employment from '@/components/maintenance/reference/Employment'
import Position from '@/components/maintenance/reference/Position'
import WorkstatCreate from '@/components/maintenance/reference/create/Workstat'
import EmploymentCreate from '@/components/maintenance/reference/create/Employment'
import PositionCreate from '@/components/maintenance/reference/create/Position'

export default {
  name: 'Reference',
  components: {
    Workstat,
    Employment,
    Position,
    WorkstatCreate,
    EmploymentCreate,
    PositionCreate
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
      this.dialog.d_Workarea = false
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
