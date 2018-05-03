<template>
  <panel title="Songs">
    <v-btn
      v-if="$store.state.isUserLoggedIn" slot="action" :to="{name: 'songs-create'}"
      fab dark small fixed right color="indigo">
      <v-icon>add</v-icon>
    </v-btn>
    <div v-for="row in $store.state.songs" v-bind:key="row.uri">
      <v-card>
        <v-container fluid>
          <v-layout>
            <v-flex xs12>
              <v-card color="indigo lighten-5">
                <v-container fluid>
                  <v-layout>
                    <v-flex xs7>
                      <v-card-title primary-title>
                        <div>
                          <div class="headlinerev">{{ row.title }}</div>
                          <div>{{ row.artist }}</div>
                          <div>{{ row.genre }}</div>
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn
                          v-if="$store.state.isUserLoggedIn"
                          @click="setStateURI(row.uri, row.uriAddress)"
                          flat color="cyan">View
                        </v-btn>
                      </v-card-actions>
                    </v-flex>
                    <v-flex xs5>
                      <v-card-media
                        :src="row.albumImageURL"
                        height="200px"
                        contain
                      ></v-card-media>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>
  </panel>
</template>

<script>
import songsHistoryService from '@/services/songsHistoryService'

export default {
  data () {
    return {
      error: null
    }
  },
  methods: {
    async setStateURI (uri, uriAddress) {
      try {
        // write selectedSong to Vuex
        const selectedSong = this.$store.state.songs.find(
          element => element.uri === uri
        )
        this.$store.dispatch('setSong', selectedSong)

        // write selectedSong to songs history
        const songsHistoryItem = {
          'title': selectedSong.title,
          'artist': selectedSong.artist
        }
        const songsHistory =
          ('songsHistory' in this.$store.state.user)
            ? JSON.parse(JSON.stringify(this.$store.state.user.songsHistory)) : []
        if (songsHistory.length === 10) {
          songsHistory.pop()
        }
        songsHistory.unshift(songsHistoryItem)

        // write song history to marklogic and return result
        const putInfo = {email: this.$store.state.user.email, songsHistory: songsHistory}
        try {
          const response = await songsHistoryService.put(putInfo)
          this.$store.dispatch('setUser', await response.data.user)
        } catch (error) {
          this.error = error.response.data.error
        }

        // route to new location
        this.$router.push({name: 'song', params: {uriAddress}})
      } catch (error) {
        // this.error = error.response.data.error
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.headlinerev {
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
}
</style>
