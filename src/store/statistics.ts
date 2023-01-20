import { defineStore } from 'pinia';
import { ref, watch, type Ref } from 'vue';

interface StatisticsState {
   totalCount: Ref<number>
   wrongAnsers: Ref<number>
   correctAnswers: Ref<number>
   totalAnswers: Ref<number>
   addCorrectAnser: (value: number) => void
   addWrongAnswer: (value: number) => void
}

export const useStatisticsStore = defineStore('statistics', (): StatisticsState => {
   const totalCount = ref(0)
   const wrongAnsers = ref(0)
   const correctAnswers = ref(0)
   const totalAnswers = ref(0)
   const statisticsLocalStorage = JSON.parse(`${localStorage.getItem('statistics')}`)

   if (statisticsLocalStorage) {
      const { totalCount, wrongAnsers, correctAnswers, totalAnswers } = statisticsLocalStorage
      totalCount.value = totalCount.value
      wrongAnsers.value = wrongAnsers.value
      correctAnswers.value = correctAnswers.value
      totalAnswers.value = totalAnswers.value
   }

   const addCorrectAnser = (value: number) => {
      correctAnswers.value += 1
      totalAnswers.value += 1
      totalCount.value += value
   }

   const addWrongAnswer = (value: number) => {
      wrongAnsers.value += 1
      totalAnswers.value += 1
      totalCount.value -= value
   }

   watch(() => totalAnswers.value, () => {
      localStorage.setItem('statistics', JSON.stringify({ totalCount, wrongAnsers, correctAnswers, totalAnswers }))
   })

   return {
      totalCount,
      wrongAnsers,
      correctAnswers,
      totalAnswers,
      addCorrectAnser,
      addWrongAnswer
   }

});
