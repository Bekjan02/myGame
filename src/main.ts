import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import './assets/base.scss'

const app = createApp(App)

const vuetify = createVuetify({
   components,
   directives,
   icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
         mdi,
      }
   },
})

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
