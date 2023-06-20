import { createRouter, createWebHashHistory } from 'vue-router'
import Notes from '@/views/Notes.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'


const routes = [
    { path: '/', name: 'SignIn', component: SignIn },
    { path: '/signup', name: 'SignUp', component: SignUp },
    { path: '/notes', name: 'Notes', component: Notes },
    { path: '/notes/:id', name: 'EditNote', component: Notes }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router