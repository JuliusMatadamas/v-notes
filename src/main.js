import {createApp, markRaw} from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from '@/App.vue'
import router from '@/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'animate.css'
import '@/css/main.css'

const pinia = createPinia()
pinia.use(({store}) => {
    store.router = markRaw(router)
})
pinia.use(piniaPluginPersistedstate)

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
