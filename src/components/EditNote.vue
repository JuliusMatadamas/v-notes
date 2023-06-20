<template>
    <div class="card mb-4">
        <div class="card-body">
            <h3>Edit Note</h3>

            <textarea class="form-control" name="" id="" cols="30" rows="4" v-model="note.content">{{ note.content }}</textarea>

            <div class="buttons mt-4 text-end">
                <button class="btn btn-outline-success" :disabled="btnDisabled" @click="updateNote">Update</button>
                <button class="btn btn-outline-warning" :disabled="btnDisabled" @click="cancelEditNote">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {defineProps, onBeforeMount, onMounted, ref } from "vue"
import { useAuthStore } from "@/stores/auth.js";
import { useNotesStore } from "@/stores/notes.js";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
import router from "@/router/index.js";
import {evalContentNote} from "@/helpers/index.js";

// CONTS
const route = useRoute()
const btnDisabled = ref(false)

// PROPS
const authStore = useAuthStore()
const notesStore = useNotesStore()
const user = authStore.getUser
const noteId = useRoute().params.id
const note = ref({
    idUser: null,
    content: null,
    createdAt: null
})

// METHODS
const getNote = () => {
    Swal.close()
    let {idUser, content, createdAt} = notesStore.note
    note.value.idUser = idUser
    note.value.content = content
    note.value.createdAt = createdAt
}
const showErrorToEdit = (error) => {
    Swal.fire({
        icon: 'error',
        title: 'An error has occurred!',
        text: `${error}`,
    }).then((result) => {
        if (result.isConfirmed) {
            note.value.idUser = null
            note.value.content = null
            note.value.createdAt = null
            router.push("/notes")
        }
    })
}
const showErrorToUpdate = (error) => {
    Swal.close()
    btnDisabled.value = false
    Swal.fire({
        icon: 'error',
        title: 'An error has occurred!',
        text: `Error code: ${error.code}, message: ${error.message}`,
    })
}
const cancelEditNote = () => {
    Swal.close()
    note.value.idUser = null
    note.value.content = null
    note.value.createdAt = null
    notesStore.note = null
    router.push("/notes")
}
const updateNote = () => {
    let content = note.value.content;
    if (!content) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'You must enter the content of the note to edit, at least 10 characters.!',
        })
    } else {
        if (!evalContentNote(content)) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'You must enter the content of the note to edit, at least 10 characters.!',
            })
        } else {
            btnDisabled.value = true
            Swal.fire({
                allowOutsideClick: false,
                title: 'Wait while trying to add the note...',
                iconHtml: '<span class="loader"></span>',
                showConfirmButton: false
            })
            let idUser = note.value.idUser;
            let createdAt = new Date().getTime();
            notesStore.updateNote({noteId, idUser, content, createdAt}, showSuccess, showErrorToUpdate)
        }
    }
}
const showSuccess = () => {
    Swal.close()
    btnDisabled.value = false
    Swal.fire({
        icon: 'success',
        title: 'Note updated!',
        text: `The note has been updated`,
    })
}

// HOOKs
onBeforeMount(() => {
    Swal.fire({
        allowOutsideClick: false,
        title: 'Validating',
        iconHtml: '<span class="loader"></span>',
        showConfirmButton: false
    })
    notesStore.verifyNote(user.id, noteId, getNote, showErrorToEdit)
})

onMounted(() => {
})
</script>

<style scoped>
textarea {
    resize: none;
}
.buttons button {
    margin-right: 20px;
    width: 100px;
}
.card {
    margin: auto;
    max-width: 640px;
    width: 80%;
}
</style>