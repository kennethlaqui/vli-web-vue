<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" > -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <About></About>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import About from '@/views/About.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    About
  }
}
</script>
