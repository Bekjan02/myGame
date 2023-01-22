<script setup lang="ts">
import { useDialogStore } from '@/store/dialog';
import { ref, watch } from 'vue';
import Modal from '@/components/modal/Modal.vue';
import Alert from '../alert/Alert.vue';
import { useStatisticsStore } from '@/store/statistics';

const seconds = ref(60)
const field = ref()
const dialogState = useDialogStore()
const answer = ref('')
const alertIsOpen = ref(false)
const isCorrect = ref(false)
const { addCorrectAnswer, addWrongAnswer } = useStatisticsStore()

let interval: ReturnType<typeof setInterval>;

const timer = () => {
   interval = setInterval(() => {
      seconds.value--
      if (seconds.value === 0) {
         closeModal()
      }
   }, 1000)
   if (seconds.value <= 0) {
      closeModal()
   }
}

const closeModal = async () => {
   const isValid = await field?.value.validate()
   const localStorageAnswers = JSON.parse(`${localStorage.getItem('answers')}`)
   alertIsOpen.value = true
   if (seconds.value === 0 || isValid.length > 0) {
      clearInterval(interval)
      dialogState.closeModal()
      const newData = [...localStorageAnswers, { id: dialogState.dialog.id, isCorrect: 'wrong', value: dialogState.dialog.value }]
      localStorage.setItem('answers', JSON.stringify(newData))
      seconds.value = 60
      answer.value = ''
      addWrongAnswer(dialogState.dialog.value)
      isCorrect.value = false
   } else {
      if (answer.value.toLowerCase() === dialogState.dialog.answer.toLowerCase()) {
         localStorage.setItem('answers', JSON.stringify([...localStorageAnswers, { id: dialogState.dialog.id, isCorrect: 'correct', value: dialogState.dialog.value }]))
         addCorrectAnswer(dialogState.dialog.value)
         isCorrect.value = true
      } else {
         localStorage.setItem('answers', JSON.stringify([...localStorageAnswers, { id: dialogState.dialog.id, isCorrect: 'wrong', value: dialogState.dialog.value }]))
         addWrongAnswer(dialogState.dialog.value)
         isCorrect.value = false
      }
      clearInterval(interval)
      dialogState.closeModal()
      seconds.value = 60
      answer.value = ''
   }
}

const closeAlert = () => {
   alertIsOpen.value = false
}

watch(() => dialogState.isOpen, (value) => {
   if (value) {
      timer()
   }
})

const rules = [
   (v: string) => !!v || 'Заполните поле'
]


</script>

<template>
   <Modal :modelValue="dialogState.isOpen">
      <template #seconds>
         {{ seconds }}
      </template>
      <template #content>
         {{ dialogState.dialog.question }}
      </template>
      <template #field>
         <v-text-field autofocus v-model="answer" ref="field" hide-details="auto" :rules="rules" label="Answer" />
      </template>
      <template #actions>
         <v-btn color="primary" block @click="closeModal">Ответить</v-btn>
      </template>
   </Modal>
   <Alert :modelValue="alertIsOpen" :answer="dialogState.dialog.answer" :isCorrect="isCorrect" @close="closeAlert" />
</template>

<style scoped>

</style>