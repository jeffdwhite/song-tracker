<template>
  <panel title="Recently Viewed Songs">
    <v-data-table
      no-data-text="You have not viewed any songs"
      hide-actions hide-headers
      :items="this.$store.state.user.songsHistory">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.artist}}</td>
      </template>
    </v-data-table>
    <v-btn
      @click="clearHistory()"
      dark color="indigo">Clear
    </v-btn>

  </panel>
</template>

<script>
import songsHistoryService from '@/services/songsHistoryService'

export default {
  methods: {
    async clearHistory () {
      const deleteInfo = this.$store.state.user.email
      try {
        const response = await songsHistoryService.delete(deleteInfo)
        this.$store.dispatch('setUser', await response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style>
</style>
