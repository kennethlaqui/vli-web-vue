<template>
  <div>
    <uploadDtrDaily v-if="daily"></uploadDtrDaily>
    <UploadDtrEmployee v-else-if="daily"></UploadDtrEmployee>
  </div>
</template>
<script>
import uploadDtrDaily from '@/components/personnel/UploadDtrDaily.vue'
import uploadDtrEmployee from '@/components/personnel/UploadDtrEmployee.vue'

export default {
  name: 'uploadDtr',
  data () {
    return {
      daily: true
    }
  },
  components: {
    uploadDtrDaily,
    uploadDtrEmployee
  }
}
</script>
