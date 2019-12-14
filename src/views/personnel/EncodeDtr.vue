<template>
  <div>
    <tablex></tablex>
    <about></about>
  </div>
</template>
<script>
import tablex from '@/components/personnel/Table.vue'
import about from '@/views/About.vue'

export default {
  name: 'EncodeDtr',
  components: {
    tablex,
    about
  }
}
</script>
