<template>
  <v-container fluid>
    <v-layout row>
      <v-flex md4 offset-md4>
        <panel title="Create User">
          <v-text-field
            @keyup.enter="createUser" label="Email" v-model="email"/>
          <v-text-field
            @keyup.enter="createUser" label="Password" type="password" v-model="password"/>
          <v-text-field
            @keyup.enter="createUser" label="Confirm Password" type="password" v-model="confirmPassword"/>
          <v-btn dark class="cyan" @click="createUser">Enter</v-btn>
          <v-alert color="success" :value="message" v-html="message"/>
          <v-alert color="error" :value="error" v-html="error"/>
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
      confirmPassword: '',
      message: null,
      error: null
    }
  },
  methods: {
    async createUser () {
      this.message = null
      this.error = null
      try {
        this.message = (await authService.createUser({
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        })).data.message
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}

/*
  watch: {
    email (value) {
      console.log('email has changed', value)
    }
  },
  mounted () {
    setTimeout (() => {
      this.email = 'hello world'
    }, 2000)
  }

*/
</script>

<style>
</style>
