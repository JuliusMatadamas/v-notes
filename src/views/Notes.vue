<template>
    <NavBar
        @confirmSignOut="showConfirmation"
    ></NavBar>

    <div class="container-notes">
        <div class="container d-flex flex-column p-4">
            <h3 class="text-center">{{ email }}</h3>
            <hr>
            <div
                v-if="!route.params.id"
            >
                <CreateNote v-bind:id-user="user.id"></CreateNote>

                <Note
                    v-for="note in notes"
                    :key="note.id"
                    :note="note"
                />
            </div>

            <div
                v-else
            >
                <EditNote
                    :note="noteToEdit"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
// IMPORTS
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useNotesStore } from "@/stores/notes.js";
import { useRoute } from "vue-router"
import router from "@/router"

// COMPONENTS
import NavBar from "@/components/NavBar.vue"
import CreateNote from "@/components/CreateNote.vue"
import EditNote from "@/components/EditNote.vue"
import Note from "@/components/Note.vue"
import Swal from "sweetalert2";


// CONSTS
const authStore = useAuthStore()
const notesStore = useNotesStore()
const route = useRoute()
const user = authStore.getUser
const email = user.email
const notes = computed(() => notesStore.notes)
const noteToEdit = ref(null)

// METHODS
const showConfirmation = () => {
    Swal.fire({
        title: 'Are you sure you want to log out?',
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `Yes, got out`,
        cancelButtonText: 'No, continue'
    }).then((result) => {
        if (result.isDenied) {
            authStore.signOutUser(verifyAuth)
        }
    })
}
const verifyAuth = () => {
    let user = authStore.getUser
    if (!user.id) {
        notesStore.notes = []
        router.push('/')
    }
}
const showError = (error) => {
    Swal.fire({
        icon: 'error',
        title: 'An error has occurred!',
        text: error
    })
}

// HOOKS
onBeforeMount(() => {
    if (!user.id) {
        notesStore.notes = []
        router.push('/')
    }
})

onMounted(() => {
    notesStore.getNotes(user.id)
})
</script>

<style scoped>
.container-notes {
    height: calc(100vh - 60px);
    margin-top: 60px;
    overflow: auto;
    width: 100%;
}
</style>