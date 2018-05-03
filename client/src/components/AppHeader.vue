<template>
  <v-toolbar app flat dark class="cyan">
    <v-toolbar-title>
      <!-- note the router-link tag type is "a" by default -->
      <router-link to="/">
        <img class="smaller-image" src="@/assets/logo.png">
      </router-link>
    </v-toolbar-title>
<!--    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
    <router-link tag="h1" to="/Songs">
      <v-btn flat dark large>Songs</v-btn>
    </router-link>
    <v-spacer></v-spacer>
    <router-link tag="h1" to="/SignIn">
      <v-btn v-if="!$store.state.isUserLoggedIn" flat dark large>Sign In</v-btn>
    </router-link>
    <router-link tag="h1" to="/CreateUser">
      <v-btn v-if="!$store.state.isUserLoggedIn" flat dark large>Create User</v-btn>
    </router-link>
    <v-btn
      v-if="$store.state.isUserLoggedIn" flat dark large
      @click="signOut">Sign Out
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    signOut () {
      this.$store.dispatch('setSignOut', null)
      this.$router.push('/')
    }
  }
}
</script>

<style>
.smaller-image {
  margin-top: 15px;
  width: 50px;
}
</style>
