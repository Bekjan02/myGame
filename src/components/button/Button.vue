<script setup lang="ts">
import {useDialogStore} from '@/store/dialog';
import {ref, watch} from 'vue';

const dialogState = useDialogStore()
const currentQuestion = ref(JSON.parse(`${localStorage.getItem('answers')}`))

const props = defineProps<{
  questions: any
}>()

const openModal = (value: any) => {
  dialogState.openModal(value)
}

watch(() => dialogState.isOpen, () => {
  currentQuestion.value = JSON.parse(`${localStorage.getItem('answers')}`)
}, {deep: true})


const getIsCorrect = (obj: any) => {
  const findQuestion = currentQuestion.value.find((item: any) => item.id === obj.id)
  return findQuestion
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
.correct {
  background-color: green;
}

.wrong {
  background-color: red;
}
</style>