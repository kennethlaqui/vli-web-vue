<template>
  <div>
    <masterfile></masterfile>
    <about></about>
  </div>
</template>
<script>
import masterfile from '@/components/personnel/Masterfile.vue'
import about from '@/views/About.vue'

export default {
  name: 'EncodeDtr',
  components: {
    masterfile,
    about
  }
}
</script>
