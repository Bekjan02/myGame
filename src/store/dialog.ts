import type { Data } from './getData';
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import localStorageUtil from "@/utils/localStorageUtils";


interface DialogState {
   dialog: Data;
   openModal: (question: any) => void;
   isOpen: Ref<boolean>;
   closeModal: () => void
}

const { setValue } = localStorageUtil

export const useDialogStore = defineStore("dialog", (): DialogState => {
   const dialog = ref<any>({});
   const isOpen = ref<boolean>(false)

   const openModal = (question: Data) => {
      dialog.value = question;
      isOpen.value = !isOpen.value
   };

   const closeModal = () => {
      isOpen.value = false
      setValue('answers', {})
   }

   return {
      dialog,
      openModal,
      isOpen,
      closeModal
   };
});