<template>
  <!-- kept this as one item versus carving out, had difficulty getting the subcomponents to work -->
  <v-container fluid>
    <v-layout row>
      <!--           -->
      <!-- left side -->
      <!--           -->
      <v-flex md4 offset-md2>
        <v-toolbar flat dense dark class="cyan">
          <v-toolbar-title>Song Information</v-toolbar-title>
        </v-toolbar>
        <v-flex>
          <img class="album-image"
            :src="song.albumImageURL">
        </v-flex>
        <v-flex v-if="$store.state.isUserLoggedIn">
          <v-btn
            :to="{name: 'song-edit'}"
            fab dark small right color="indigo">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-tooltip right>
            <v-btn
              @click="setBookmark" slot="activator"
              flat icon large right :color="bookmarkColor">
              <v-icon>bookmark</v-icon>
            </v-btn>
            <span>Bookmark</span>
          </v-tooltip>
          <div class="headlinerev">{{ song.title }}</div>
          <div>{{ song.artist }}</div>
          <div>{{ song.album }}, {{song.genre}}, {{song.year}}</div>
        </v-flex>
      </v-flex>
      <!--            -->
      <!-- right side -->
      <!--            -->
      <v-flex md3 class="ml-2">
        <div class="fluidMedia">
          <iframe title="YouTube"
            frameborder="0"
            :src="youtubeURL"
            allowfullscreen
          ></iframe>
        </div>
        <div class="mt-2">
          <v-toolbar flat dense dark class="cyan">
            <v-toolbar-title>Lyrics</v-toolbar-title>
          </v-toolbar>
          <textarea id="lyricsBox" readonly v-model="song.lyrics"/>
        </div>
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
      user: {},
      bookmarkColor: ''
    }
  },
  computed: {
    youtubeURL: function () {
      return 'https://www.youtube.com/embed/' + this.song.youtubeID
    }
  },
  mounted () {
    this.song = Object.assign({}, this.$store.state.selectedSong)
    this.user = Object.assign({}, this.$store.state.user)
    if ('bookmark' in this.song) {
      this.bookmarkColor =
        (this.song.bookmark.includes(this.user.email) === true) ? 'indigo' : 'grey'
    } else {
      this.bookmarkColor = 'grey'
    }
  },
  methods: {
    async setBookmark () {
      if (this.bookmarkColor === 'indigo') {
        this.bookmarkColor = 'grey'
        const bookmarkFilter = this.song.bookmark.filter(email => email !== this.user.email)
        if (bookmarkFilter.length === 0) {
          delete this.song.bookmark
        } else {
          this.song.bookmark = bookmarkFilter
        }
      } else {
        this.bookmarkColor = 'indigo'
        if ('bookmark' in this.song) {
          this.song.bookmark.push(this.user.email)
        } else {
          this.song.bookmark = [this.user.email]
        }
      }
      try {
        // write song change to MarkLogic at same URI
        this.response = await songsService.put(this.song)
        // update songs state to include changes, ensure consistency with database
        this.$store.dispatch('setSongs', (await songsService.index()).data)
        const selectedSong = this.$store.state.songs.find(
          element => element.uri === this.song.uri
        )
        this.$store.dispatch('setSong', selectedSong)
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
  }
}
</script>

<style scoped>
/*
<iframe
  width="640" height="360"
  src="https://www.youtube.com/embed/nKhN1t_7PEY"
  frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
</iframe>
*/
.album-image {
  display: block;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 10px;
}

.headlinerev {
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
}

.fluidMedia {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 0px;
  height: 0;
  overflow: visible;
}

.fluidMedia iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

textarea {
  width: 100%;
  height: 250px;
  font-family: monospace;
}
</style>
