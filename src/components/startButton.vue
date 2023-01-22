<script setup lang="ts">
import { useGameStatus } from '@/store/setGameStatus'

const { setGameStatus } = useGameStatus()

const startGame = () => {
  setGameStatus(true)
  localStorage.setItem('answers', JSON.stringify([]))
}

</script>

<template>
  <v-btn @click="startGame">
    начать игру
  </v-btn>
</template>


<style scoped>

</style>