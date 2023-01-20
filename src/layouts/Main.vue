<script setup lang="ts">
import Header from "@/components/Header.vue";
import { useGameStatus } from '@/store/setGameStatus'
import StartButton from "@/components/startButton.vue";
const store = useGameStatus()

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