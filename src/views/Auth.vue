<template>
  <v-form @submit.prevent="onSumbit" ref="form" class="d-flex h-screen justify-center align-center">
    <v-row class="flex-column align-center">
      <v-text-field class="w-50" v-model="name" label="Name" :rules="rules" outlined dense />
      <v-btn type="submit" class="float-left">
        Войти
      </v-btn>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const form = ref()
const name = ref('')


const rules = [
  (v: string) => !!v || 'Это обязательное поле',
  (v: string) => (v && v.length >= 3) || 'Имя должно быть больше 3 символов',
  (v: string) => !v.match(/[.,!@/:;'"#$%&*^`=+-]/) || 'Имя не может содержать спецсимволы кроме "_"',
  (v: string) => /^[а-яА-Яa-zA-Z0-9_]+$/.test(v) || 'Имя может состоять только из букв и цифр',
]

const onSumbit = async () => {
  const formValidate = await form.value.validate()
  if (formValidate.valid) {
    localStorage.setItem('name', name.value)
    router.push({ path: '/game' })
  }
}

</script>

<style scoped>

</style>