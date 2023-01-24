<script setup lang="ts">
import Header from "@/components/Header.vue";
import { useGameStatusStore } from '@/store/setGameStatus'
import StartButton from "@/components/StartButton.vue";
const store = useGameStatusStore()

</script>

<template>
  <div class="mx-100" v-if="store.isGameStarted">
    <v-layout>
      <Header />
      <RouterView />
    </v-layout>
  </div>
  <StartButton v-else />
</template>


<style scoped>

</style>