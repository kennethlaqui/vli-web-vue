<template>
  <uploadDtrDaily></uploadDtrDaily>
  <!-- <UploadDtrEmployee></UploadDtrEmployee> -->
</template>
<script>
import uploadDtrDaily from '@/components/personnel/UploadDtrDaily.vue'
// import uploadDtrEmployee from '@/components/personnel/UploadDtrEmployee.vue'

export default {
  name: 'uploadDtr',
  data () {
    return {
      daily: true
    }
  },
  components: {
    uploadDtrDaily
    // uploadDtrEmployee
  }
}
</script>
