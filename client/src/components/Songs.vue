<template>
  <v-container fluid>
    <v-layout row>
      <v-flex md6 offset-md3>
        <songs-search v-if="$store.state.isUserLoggedIn"/>
        <songs-panel class="mt-3"/>
      </v-flex>
      <v-flex class="ml-3">
        <songs-bookmarks v-if="$store.state.isUserLoggedIn"/>
        <songs-history v-if="$store.state.isUserLoggedIn" class="mt-2"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import songsService from '@/services/songsService'
import SongsSearch from '@/components/Songs/SongsSearch'
import SongsPanel from '@/components/Songs/SongsPanel'
import SongsBookmarks from '@/components/Songs/SongsBookmarks'
import SongsHistory from '@/components/Songs/SongsHistory'

export default {
  data () {
    return {
      error: null
    }
  },
  async mounted () {
    if (this.$store.state.isUserLoggedIn) {
      try {
        this.$store.dispatch('setSongs', (await songsService.index()).data)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    SongsSearch,
    SongsPanel,
    SongsBookmarks,
    SongsHistory
  }
}
</script>

<style>
</style>
