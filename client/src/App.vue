<template>
<div id="app">
  <v-app>
    <AppHeader/><br>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</div>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style>
/*
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*/

.success {
  color: whitesmoke
}

.error {
  color: whitesmoke
}

</style>
