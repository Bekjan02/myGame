import { createRouter, createWebHistory } from 'vue-router'
import Quiz from '../views/Quiz.vue'
import Stat from '../views/Stat.vue'
import Auth from '../views/Auth.vue'

import Main from '../layouts/Main.vue'
import Register from '../layouts/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/game',
      name: 'quiz',
      component: Quiz,
      meta: {
        layout: Main
      },
    },
    {
      path: '/stat',
      name: 'stat',
      component: Stat,
      meta: {
        layout: Main
      },
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      meta: {
        layout: Register
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'auth' && !localStorage.getItem('name')) {
    next({ name: 'auth' })
  } else {
    next()
  }
})

export default router
