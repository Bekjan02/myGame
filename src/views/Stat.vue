<script setup lang="ts">
const storage = JSON.parse(localStorage.getItem('statistics') || '{}')
const historyStorage = JSON.parse(`${localStorage.getItem('history')}`)
const name = localStorage.getItem('name')

</script>


<template>
  <v-main class="stat">
    <v-container>
      <h2 class="text-h4">Игрок: {{ name }}</h2>
      <h2 class="text-h5">Статистика этой игры</h2>
      <v-table class="bg-amber-accent-1 mt-5" :hover="true" density="comfortable">
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
      <div class="mt-8">
        <div v-if="historyStorage">
          <h2 class="text-h4">История игр</h2>
          <v-table>
            <thead>
              <tr>
                <th>Вопросов</th>
                <th>Правильных ответов</th>
                <th>Ложных ответов</th>
                <th>Количество баллов</th>
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
        <h2 class="text-h4" v-else>
          Истории нет
        </h2>
      </div>
    </v-container>
  </v-main>
</template>


<style scoped lang="scss">

</style>