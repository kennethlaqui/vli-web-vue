<template>
  <div>
    <MasterFile :visible="showMasterFile" @close="showMasterFile=false"></MasterFile>
  </div>
</template>
<script>
import MasterFile from '@/components/controller/dialog/masterfile/NewEmployee.vue'

export default {
  data () {
    return {
      showMasterFile: true
    }
  },
  components: {
    MasterFile
  }
}
</script>
