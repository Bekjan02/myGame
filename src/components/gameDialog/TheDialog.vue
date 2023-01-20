<script setup lang="ts">
import { useDialogStore } from '@/store/dialog';
import { ref, watch } from 'vue';
import Modal from '@/components/modal/Modal.vue';
import Alert from '../alert/Alert.vue';
import { useStatisticsStore } from '@/store/statistics';

const seconds = ref(10)
const field = ref()
const dialogState = useDialogStore()
const answer = ref('')
const alertIsOpen = ref(false)
const isCorrect = ref(false)
const { addCorrectAnser, addWrongAnswer } = useStatisticsStore()

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
   if (seconds.value === 0) {
      clearInterval(interval)
      dialogState.closeModal()
      const newData = [...localStorageAnswers, { id: dialogState.dialog.id, isCorrect: 'wrong', value: dialogState.dialog.value }]
      localStorage.setItem('answers', JSON.stringify(newData))
      seconds.value = 5
      answer.value = ''
      addWrongAnswer(dialogState.dialog.value)
      isCorrect.value = false

   }
   if (isValid.length === 0) {
      if (answer.value.toLowerCase() === dialogState.dialog.answer.toLowerCase()) {
         seconds.value = 5
         answer.value = ''
         clearInterval(interval)
         dialogState.closeModal()
         localStorage.setItem('answers', JSON.stringify([...localStorageAnswers, { id: dialogState.dialog.id, isCorrect: 'correct', value: dialogState.dialog.value }]))
         addCorrectAnser(dialogState.dialog.value)
         isCorrect.value = true
      } else {
         clearInterval(interval)
         dialogState.closeModal()
         localStorage.setItem('answers', JSON.stringify([...localStorageAnswers, { id: dialogState.dialog.id, isCorrect: 'wrong', value: dialogState.dialog.value }]))
         seconds.value = 5
         answer.value = ''
         addWrongAnswer(dialogState.dialog.value)
         isCorrect.value = false
      }
   }
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
   <Alert :modelValue="alertIsOpen" :answer="dialogState.dialog.answer" :isCorrect="isCorrect" />
</template>

<style scoped>

</style>