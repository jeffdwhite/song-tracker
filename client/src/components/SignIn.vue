<template>
  <v-container fluid>
    <v-layout row>
      <v-flex md4 offset-md4>
        <panel title="Welcome">
          <v-text-field @keyup.enter="signIn" label="Email" v-model="email"/>
          <v-text-field @keyup.enter="signIn" label="Password" type="password" v-model="password"/>
          <v-alert color="success" :value="message" v-html="message"/>
          <v-alert color="error" :value="error" v-html="error"/>
          <v-btn dark class="cyan" @click="signIn">Sign In</v-btn>
        </panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import authService from '@/services/authService'

export default {
  data () {
    return {
      email: '',
      password: '',
      message: null,
      error: null
    }
  },
  methods: {
    async signIn () {
      this.message = null
      this.error = null
      try {
        const response = await authService.signIn({
          email: this.email,
          password: this.password
        })
        this.message = await response.data.message
        // note how action returns a promise, so I set up an error handler (old code below)
        // the error handler can be removed in production
        // this.$store.dispatch('setUser', await response.data.user).then(
        //  () => console.log(this.$store.state.user),
        //  (error) => console.log(JSON.stringify(error))
        // )
        try {
          this.$store.dispatch('setUser', await response.data.user)
        } catch (error) {
          this.error = error.response.data.error
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }

}
</script>

<style>
</style>
