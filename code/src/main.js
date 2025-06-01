import './assets/styles/main.scss'
import './assets/styles/tailwind.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
import {createPinia} from "pinia";
import clickOutsideDirective from "@/directives/click-outside.directive.js";

createApp(App)
    .use(router)
    .use(createPinia())
    .directive('click-outside', clickOutsideDirective)
    .mount('#app')
