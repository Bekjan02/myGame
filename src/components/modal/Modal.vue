<script setup lang="ts">
interface ModalProps {
   modelValue: boolean
}

const props = defineProps<ModalProps>()
</script>

<template>
   <v-dialog :model-value="props.modelValue" persistent>
      <v-card>
         <slot name="seconds"></slot>
         <v-card-text>
            <slot name="content"></slot>
         </v-card-text>
         <v-card-item>
            <slot name="field"></slot>
         </v-card-item>
         <v-card-actions>
            <slot name="actions"></slot>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>



<style scoped>

</style>