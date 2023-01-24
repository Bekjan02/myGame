<script setup lang="ts">
import { useDialogStore } from '@/store/dialog';
import { ref, watch } from 'vue';
import Alert from './Alert.vue';
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
      const newData = [...localStorageAnswers, { id: dialogState.dialog?.id, isCorrect: false, value: dialogState.dialog?.value }]
      localStorage.setItem('answers', JSON.stringify(newData))
      seconds.value = 60
      answer.value = ''
      addWrongAnswer(dialogState.dialog?.value)
      isCorrect.value = false
   } else {
      if (answer.value.toLowerCase() === dialogState.dialog?.answer.toLowerCase()) {
         localStorage.setItem('answers', JSON.stringify([...localStorageAnswers, { id: dialogState.dialog.id, isCorrect: true, value: dialogState.dialog.value }]))
         addCorrectAnswer(dialogState.dialog.value)
         isCorrect.value = true
      } else {
         localStorage.setItem('answers', JSON.stringify([...localStorageAnswers, { id: dialogState.dialog?.id, isCorrect: false, value: dialogState.dialog?.value }]))
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
   <v-dialog :model-value="dialogState.isOpen" persistent>
      <v-card>
         {{ seconds }}
         <v-card-text>
            {{ dialogState.dialog?.question }}
         </v-card-text>
         <v-card-item>
            <v-text-field autofocus v-model="answer" ref="field" hide-details="auto" :rules="rules" label="Answer" />
         </v-card-item>
         <v-card-actions>
            <v-btn color="primary" block @click="closeModal">Ответить</v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
   <Alert :modelValue="alertIsOpen" :answer="dialogState.dialog?.answer" :isCorrect="isCorrect" @close="closeAlert" />
</template>

<style scoped>

</style>