import type { Data } from './getData';
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

interface DialogState {
   dialog: Data;
   openModal: (question: any) => void;
   isOpen: Ref<boolean>;
   closeModal: () => void
}

export const useDialogStore = defineStore("dialog", (): DialogState => {
   const dialog = ref<any>({});
   const isOpen = ref<boolean>(false)

   const openModal = (question: Data) => {
      dialog.value = question;
      isOpen.value = !isOpen.value
   };

   const closeModal = () => {
      isOpen.value = false
   }

   return {
      dialog,
      openModal,
      isOpen,
      closeModal
   };
});