<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import TheDialog from "@/components/gameDialog/TheDialog.vue";
import { useGetDataStore } from "@/store/getData";
import { useDialogStore } from "@/store/dialog";
import { useStatisticsStore } from "@/store/statistics";
import Button from "@/components/button/Button.vue";

const dialogState = useDialogStore()
const statisticsState = useStatisticsStore()
const points = ref(0)

onMounted(async () => {
  await store.getData()
})

interface IAnswer {
  id: number
  isCorrect: string
  value: string
}


watch(() => dialogState.isOpen, (value) => {
  if (!value) {
    const storage = JSON.parse(`${localStorage.getItem('answers')}`) || []
    points.value = storage.reduce((acc: IAnswer, curr: IAnswer) => acc.value + curr.value)

  }

})

const store = useGetDataStore()
</script>

<template>
  <v-main>
    <v-container fluid>
      <div v-if="store.loading">
        <v-progress-circular indeterminate color="primary" />
      </div>
      <div v-if="store.error">error</div>
      <div v-else>
        {{ statisticsState.totalCount }}
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