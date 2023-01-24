import type { Question } from "@/types";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

interface DialogState {
   dialog: any;
   openModal: (question: Question) => void;
   isOpen: Ref<boolean>;
   closeModal: () => void
}

export const useDialogStore = defineStore("dialog", (): DialogState => {
   const dialog = ref<Question>();
   const isOpen = ref(false)

   const openModal = (question: Question) => {
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