import {createRouter, createWebHistory} from 'vue-router'
import Components from "../views/Components.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Components
        },
        {
            path: '/components',
            component: Components
        }
    ]
});

export default router
