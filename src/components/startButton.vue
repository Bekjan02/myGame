<script setup lang="ts">
import { useGameStatusStore } from '@/store/setGameStatus'

const { setGameStatus } = useGameStatusStore()

const startGame = () => {
  setGameStatus(true)
  localStorage.setItem('answers', JSON.stringify([]))
}
</script>

<template>
  <div class="d-flex justify-center align-center h-screen">
    <v-btn @click="startGame">
      начать игру
    </v-btn>
  </div>
</template>


<style scoped>

</style>