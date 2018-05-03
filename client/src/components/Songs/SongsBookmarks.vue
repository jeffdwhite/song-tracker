<template>
  <panel title="Bookmarks">
    <v-data-table
      no-data-text="You have no bookmarks"
      :rows-per-page-items=[5,10]
      :pagination.sync="pagination"
      :headers="headers"
      :items="bookmarks">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.artist}}</td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import bookmarksService from '@/services/bookmarksService'

export default {
  data () {
    return {
      headers: [
        {text: 'Title', value: 'title'},
        {text: 'Artist', value: 'artist'}
      ],
      pagination: {
        sortBy: 'uriAddress',
        descending: true
      },
      bookmarks: []
    }
  },
  async mounted () {
    if (this.$store.state.isUserLoggedIn) {
      try {
        this.bookmarks = (await bookmarksService.index(this.$store.state.user.email)).data
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }

}
</script>

<style>
</style>
