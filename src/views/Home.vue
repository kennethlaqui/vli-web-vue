<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data () {
    return {
      url: process.env.VUE_APP_URL
    }
  },
  mounted () {
    console.log(process.env.VUE_APP_URL)
  },
  components: {
    HelloWorld
  }
}
</script>
