<script setup lang="ts">
import {onMounted} from "vue";
import TheDialog from "@/components/gameDialog/TheDialog.vue";
import {useGetDataStore} from "@/store/getData";
import {useStatisticsStore} from "@/store/statistics";
import Button from "@/components/button/Button.vue";
import {useGameStatus} from "@/store/setGameStatus";

const statisticsState = useStatisticsStore()

onMounted(async () => {
  await store.getData()
})

const store = useGetDataStore()
const game = useGameStatus()

const endGame = () => {
  game.setGameStatus(false)
  statisticsState.resetStatistics()
}
</script>

<template>
  <v-main>
    <v-container fluid>
      <div v-if="store.loading">
        <v-progress-circular
            class="centered" indeterminate color="primary"/>
      </div>
      <div v-if="store.error">error</div>
      <div v-else>
        <v-sheet class="d-flex justify-space-between">
          <div>Баллы: {{ statisticsState.totalCount }}</div>
          <div>
            <v-btn @click="endGame">Завершить игру</v-btn>
          </div>
        </v-sheet>
        <v-sheet dense class="mx-auto d-flex align-center" v-for="(questions, key) in store.data" :key="questions.id">
          <v-sheet class="w-25">{{ key }}</v-sheet>
          <Button :questions="questions"/>
        </v-sheet>
      </div>
    </v-container>
    <TheDialog/>
  </v-main>
</template>

<style scoped>
.centered {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>