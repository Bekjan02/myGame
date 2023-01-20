<template>
   <div>
      <VAlert class="alert" icon="mdi-material-design" max-width="500px" v-if="props.modelValue" :closable="true"
         border="start" close-text="Close Alert" dismissible :type="props.isCorrect ? 'success' : 'error'">
         <div>
            <div>
               <span v-if="props.isCorrect">Вы ответили правильно</span>
               <span v-else>Ответ не верный</span>
            </div>
         </div>
         <v-alert-text>
            <div>
               <span v-if="!isCorrect">Правильный ответ: {{ props.answer }}</span>
            </div>
         </v-alert-text>
      </VAlert>
   </div>
</template>

<script setup lang="ts">
interface AlertProps {
   modelValue: boolean
   answer: string
   isCorrect: boolean
}

const props = defineProps<AlertProps>()
const emits = defineEmits(['update:modelValue'])

</script>

<style scoped>
.alert {
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
}
</style>