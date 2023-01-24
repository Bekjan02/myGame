<script setup lang="ts">
import { onMounted } from "vue";
import TheDialog from "@/components/QuestionDialog.vue";
import { useGetDataStore } from "@/store/getData";
import { useStatisticsStore } from "@/store/statistics";
import Button from "@/components/QuizButton.vue";
import { useGameStatusStore } from "@/store/setGameStatus";

const statisticsState = useStatisticsStore()
const store = useGetDataStore()
const game = useGameStatusStore()

onMounted(async () => {
  await store.getData
})

const endGame = () => {
  game.setGameStatus(false)
  statisticsState.resetStatistics()
}
</script>

<template>
  <v-main>
    <v-container fluid>
      <div v-if="store.loading">
        <div class="d-flex justify-center align-center w-100 h-screen">
          <v-progress-circular indeterminate color="primary" />
        </div>
      </div>
      <div v-if="store.error">{{ store.error }}</div>
      <div v-else>
        <v-sheet class="d-flex justify-space-between">
          <div>Баллы: {{ statisticsState.totalCount }}</div>
          <div>
            <v-btn @click="endGame">Завершить игру</v-btn>
          </div>
        </v-sheet>
        <v-sheet dense class="mx-auto d-flex align-center" v-for="(questions, key) in store.data" :key="questions.id">
          <v-sheet class="w-25">{{ key }}</v-sheet>
          <Button :questions="questions" />
        </v-sheet>
      </div>
    </v-container>
    <TheDialog />
  </v-main>
</template>

<style scoped>

</style>