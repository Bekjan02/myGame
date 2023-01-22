<script setup lang="ts">
const storage = JSON.parse(localStorage.getItem('statistics') || '{}')
const historyStorage = JSON.parse(localStorage.getItem('history') || '{}')

</script>


<template>
  <v-main class="stat">
    <v-container>
      <v-table class="bg-amber-accent-1" :hover="true" density="comfortable">
        <thead>
        <tr>
          <th>Вопросов</th>
          <th>Правильных ответов</th>
          <th>Ложных ответов</th>
          <th>Количество баллов</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ storage.totalAnswers }}</td>
          <td>{{ storage.correctAnswers }}</td>
          <td>{{ storage.wrongAnswers }}</td>
          <td>{{ storage.totalCount }}</td>
        </tr>
        </tbody>
      </v-table>
      <div v-if="historyStorage" class="mt-8">
        <h2 class="text-h4">История игр</h2>
        <v-table>
          <thead>
          <tr>
            <th>Вопрос</th>
            <th>Ответ</th>
            <th>Ваш ответ</th>
            <th>Результат</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in historyStorage" :key="item.id">
            <td>{{ item.totalAnswers }}</td>
            <td>{{ item.correctAnswers }}</td>
            <td>{{ item.wrongAnswers }}</td>
            <td>{{ item.totalCount }}</td>
          </tr>
          </tbody>
        </v-table>
      </div>

    </v-container>
  </v-main>
</template>


<style scoped lang="scss">

</style>