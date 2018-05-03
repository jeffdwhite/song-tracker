<template>
  <v-container fluid>
    <v-layout row>
      <v-flex md8 offset-md2>
        <v-form ref="form">
          <panel title="Edit Song">
            <v-text-field label="Title" required :rules="[required]" v-model="song.title"/>
            <v-text-field label="Artist" required :rules="[required]" v-model="song.artist"/>
            <v-text-field label="Genre" required :rules="[required]" v-model="song.genre"/>
            <v-text-field label="Year" required :rules="[required]" v-model="song.year"/>
            <v-text-field label="Album" required :rules="[required]" v-model="song.album"/>
            <v-text-field label="Album Image URL" required :rules="[required]" v-model="song.albumImageURL"/>
            <v-text-field label="YouTube ID" required :rules="[required]" v-model="song.youtubeID"/>
            <v-text-field label="Lyrics" multi-line :counter="2000" v-model="song.lyrics"/>
            <v-btn dark class="cyan" v-if="$store.state.isUserLoggedIn" @click="edit">Submit</v-btn>
            <v-btn dark class="cyan" v-if="$store.state.isUserLoggedIn" @click="cancel">Cancel</v-btn>
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
      song: {},
      required: (value) => !!value || 'Required',
      error: null,
      alert: false
    }
  },
  mounted () {
    this.song = Object.assign({}, this.$store.state.selectedSong)
  },
  methods: {
    async edit () {
      this.error = null
      if (this.$refs.form.validate()) {
        try {
          // write song change to MarkLogic at same URI
          const response = await songsService.put(this.song)
          // update songs state to include changes, ensure consistency with database
          this.$store.dispatch('setSongs', (await songsService.index()).data)
          this.$store.dispatch('setSong', this.song)
          // route user to edited song
          const uriAddress = response.data
          this.$router.push({name: 'song', params: {uriAddress}})
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
    cancel () {
      this.alert = false
      this.error = null
      const uriAddress = this.song.uriAddress
      this.$router.push({name: 'song', params: {uriAddress}})
    }
  }
}
</script>

<style>
</style>
