<template>
  <div>
    <v-text-field
      label="Search"
      append-icon="search" clearable
      :append-icon-cb="filterSongs"
      v-model="search"
      @keyup.enter="enterSuggest"
      solo/>
    <v-card
      class="v-card-style scroll-y"
      style="max-height: 200px"
      v-show="showSuggest"
    >
      <v-list>
        <v-list-tile
          class="v-list-title"
          v-for="item in suggest" :key="item"
          @click="selectSuggest(item)"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import _ from 'lodash'
import searchService from '@/services/searchService'

export default {
  data () {
    return {
      showSuggest: false,
      suggest: [],
      selectSuggestClick: false,
      search: ''
    }
  },
  created: function () {
    document.addEventListener('click', this.clickListener)
  },
  destroyed: function () {
    document.removeEventListener('click', this.clickListener)
  },
  methods: {
    clickListener (evt) {
      this.showSuggest = false
    },
    selectSuggest (item) {
      this.search = item
      this.selectSuggestClick = true
      this.filterSongs()
    },
    enterSuggest () {
      this.showSuggest = false
      this.filterSongs()
    },
    async filterSongs () {
      try {
        this.$store.dispatch('setSongs', (await searchService.search(this.search)).data)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  watch: {
    showSuggest: function () {
      if (this.showSuggest === false) {
        this.suggest = []
      }
    },
    search: _.debounce(async function (value) {
      const route = {
        name: 'songs'
      }
      if (this.search === undefined || this.search === null || this.search === '') {
        this.showSuggest = false
        this.search = ''
        this.filterSongs()
      } else {
        route.query = {
          search: this.search
        }
        if (this.selectSuggestClick === true) {
          this.showSuggest = false
          this.selectSuggestClick = false
        } else {
          this.showSuggest = true
          const searchTrim = '"' + this.search.trim()
          this.suggest = (await searchService.suggest(searchTrim)).data
        }
      }
      this.$router.push(route)
    }, 300),
    '$route.query.search': {
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>

<style scoped>
.v-card-style {
  margin-top: 1px;
}

.v-list-title:hover {
  background-color: gainsboro;
}
</style>
