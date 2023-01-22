<script setup lang="ts">
interface AlertProps {
   modelValue: boolean
   answer: string | null
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
   <div>
      <v-alert class="alert" icon="mdi-material-design" max-width="500px" :model-value="props.modelValue"
         @update:model-value="closeAlert" :closable="true" border="start" close-text="Close Alert" @click="emits('close')"
         dismissible :type="props.isCorrect ? 'success' : 'error'">
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
   </div>
</template>



<style scoped>
.alert {
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
}
</style>