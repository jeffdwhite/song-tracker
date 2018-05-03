<template>
  <v-container fluid>
    <v-layout row>
      <v-flex md8 offset-md2>
        <v-form ref="form">
          <panel title="Create Song">
            <v-text-field label="Title" required :rules="[required]" v-model="song.title"/>
            <v-text-field label="Artist" required :rules="[required]" v-model="song.artist"/>
            <v-text-field label="Genre" required :rules="[required]" v-model="song.genre"/>
            <v-text-field label="Year" required :rules="[required]" v-model="song.year"/>
            <v-text-field label="Album" required :rules="[required]" v-model="song.album"/>
            <v-text-field label="Album Image URL" required :rules="[required]" v-model="song.albumImageURL"/>
            <v-text-field label="YouTube ID" required :rules="[required]" v-model="song.youtubeID"/>
            <v-text-field label="Lyrics" multi-line :counter="2000" v-model="song.lyrics"/>
            <v-btn dark class="cyan" v-if="$store.state.isUserLoggedIn" @click="createSong">Submit</v-btn>
            <v-btn dark class="cyan" v-if="$store.state.isUserLoggedIn" @click="clear">Clear</v-btn>
            <v-alert type="error" dismissible v-model="alert">{{ error }}</v-alert>
          </panel>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import songsService from '@/services/songsService'

export default {
  data () {
    return {
      song: {
        uriAddress: '',
        title: null,
        artist: null,
        genre: null,
        year: null,
        album: null,
        albumImageURL: null,
        youtubeID: null,
        lyrics: null
      },
      required: (value) => !!value || 'Required',
      error: null,
      alert: false
    }
  },
  methods: {
    async createSong () {
      this.error = null
      if (this.$refs.form.validate()) {
        try {
          // write song to MarkLogic
          await songsService.post(this.song)
          // route user to songs
          this.$router.push({name: 'songs'})
        } catch (error) {
          this.alert = true
          this.error = error.response.data.error
        }
      } else {
        // if user had not entered all of the required fields
        this.alert = true
        this.error = 'Please fill in all of the required fields.'
      }
    },
    clear () {
      this.alert = false
      this.error = null
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
</style>
