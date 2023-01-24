<script setup lang="ts">
interface AlertProps {
   modelValue: boolean
   answer: string
   isCorrect: boolean
}

interface AlertEmits {
   (e: 'close'): void
}

const props = defineProps<AlertProps>()
const emits = defineEmits<AlertEmits>()

const closeAlert = () => {
   emits('close')
}
</script>

<template>
   <v-overlay class="d-flex align-center justify-center" contained :model-value="props.modelValue"
      @update:model-value="closeAlert">
      <v-alert class="alert" max-width="500px" border="start" :type="props.isCorrect ? 'success' : 'error'">
         <div>
            <div>
               <span v-if="props.isCorrect">Вы ответили правильно</span>
               <span v-else>Ответ не верный</span>
            </div>
         </div>
         <div>
            <span v-if="!isCorrect">Правильный ответ: {{ props?.answer }}</span>
         </div>
      </v-alert>
   </v-overlay>
</template>


<style scoped>

</style>