import './assets/styles/main.scss'
import './assets/styles/tailwind.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router/index.js";

createApp(App)
    .use(router)
    .mount('#app')
