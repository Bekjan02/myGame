<script setup lang="ts">
import { useGameStatus } from '@/store/setGameStatus'
import localStorageUtil from '@/utils/localStorageUtils';

const { setValue } = localStorageUtil

const { setGameStatus } = useGameStatus()

const startGame = () => {
  setGameStatus(true)
  setValue('answers', [])
}

</script>

<template>
  <v-btn @click="startGame">
    начать игру
  </v-btn>
</template>


<style scoped>

</style>