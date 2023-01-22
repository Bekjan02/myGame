<template>
  <v-app-bar color="primary">
    <v-toolbar-title>Game</v-toolbar-title>
    <v-btn variant="text">
      <RouterLink class="text-decoration-none text-amber-darken-1" to="/game">Главная</RouterLink>
    </v-btn>
    <v-btn variant="text">
      <RouterLink class="text-decoration-none text-amber-darken-1" to="/stat">Статистика</RouterLink>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>

<style scoped>

</style>