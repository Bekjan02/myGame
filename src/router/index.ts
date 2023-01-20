import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Stat from '../views/Stat.vue'
import Auth from '../views/Auth.vue'

import main from '../layouts/Main.vue'
import register from '../layouts/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/game',
      name: 'home',
      component: Home,
      meta: {
        layout: main
      },
    },
    {
      path: '/stat',
      name: 'stat',
      component: Stat,
      meta: {
        layout: main
      },
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      meta: {
        layout: register
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
