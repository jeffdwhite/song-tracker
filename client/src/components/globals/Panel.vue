<template>
  <div class="white elevation-2">
    <v-toolbar flat dense dark class="cyan">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <slot name="action"></slot>
    </v-toolbar>
    <div class="pl-4 pr-4 pt-2 pb-4">
      <slot>No songs in the database</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style>
</style>
