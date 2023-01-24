<script setup lang="ts">
import { useDialogStore } from '@/store/dialog';
import type { Question } from '@/types';
import { ref, watch } from 'vue';

interface IProps {
  questions: Question[]
}

const dialogState = useDialogStore()
const currentQuestion = ref(JSON.parse(`${localStorage.getItem('answers')}`))

const props = defineProps<IProps>()


const openModal = (value: Question) => {
  dialogState.openModal(value)
}

watch(() => dialogState.isOpen, () => {
  currentQuestion.value = JSON.parse(`${localStorage.getItem('answers')}`)
}, { deep: true })


const getIsCorrect = (obj: Question) => {
  const findQuestion = currentQuestion.value.find((item: Question) => item.id === obj.id)
  if (findQuestion?.isCorrect) {
    return { isCorrect: 'bg-green-darken-4', id: findQuestion.id }
  } else if (findQuestion?.isCorrect === false) {
    return { isCorrect: 'bg-red-darken-4', id: findQuestion.id }
  }
}
</script>

<template>
  <v-sheet class="h-100 w-25 ma-2" v-for="question in props.questions" :key="question.id">
    <v-btn :class="getIsCorrect(question)?.isCorrect" :disabled="!!getIsCorrect(question)?.id"
      @click="openModal(question)" class="h-100 w-100 pa-3">
      {{ question.value }}
    </v-btn>
  </v-sheet>
</template>

<style scoped>

</style>