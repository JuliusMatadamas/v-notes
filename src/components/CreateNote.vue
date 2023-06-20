<template>
    <div class="card mb-4">
        <div class="card-body">
            <form @submit.prevent="addNote">
                <h3>Create Note</h3>

                <textarea class="form-control" cols="30" rows="4" v-model="note.content" placeholder="Enter the note, at least 10 characters."></textarea>

                <div class="buttons mt-4 text-end">
                    <button class="btn btn-outline-success" :disabled="btnDisabled" type="submit">Save</button>
                    <button class="btn btn-outline-warning" :disabled="btnDisabled" type="reset">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
// IMPORTS
import { ref, defineProps } from 'vue'
import { useNotesStore } from "@/stores/notes.js";
import { evalContentNote } from "@/helpers/"
import Swal from "sweetalert2";


// CONST
const notesStore = useNotesStore();
const note = ref({
    content: null,
    createdAt: null
})
const btnDisabled = ref(false)

// PROPS
const props = defineProps({
    idUser: {
        type: String,
        required: true
    }
})

// HOOKs


// METHODS
const addNote = () => {
    let content = note.value.content;
    if (!content) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'You must enter the content of the note to be added, at least 10 characters.!',
        })
    } else {
        if (!evalContentNote(content)) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'You must enter the content of the note to be added, at least 10 characters.!',
            })
        } else {
            btnDisabled.value = true
            Swal.fire({
                allowOutsideClick: false,
                title: 'Wait while trying to add the note...',
                iconHtml: '<span class="loader"></span>',
                showConfirmButton: false
            })
            let idUser = props.idUser;
            let createdAt = new Date().getTime();
            notesStore.addNote({idUser, content, createdAt}, cleanForm, showError)
        }
    }
}

const cleanForm = (id) => {
    Swal.close()
    btnDisabled.value = false
    Swal.fire({
        icon: 'success',
        title: 'Note added!',
        text: `The note was added with the id: ${id}`,
    })
    note.value.content = null
    note.value.createdAt = null
}

const showError = (error) => {
    Swal.close()
    btnDisabled.value = false
    Swal.fire({
        icon: 'error',
        title: 'An error has occurred!',
        text: `Error code: ${error.code}, message: ${error.message}`,
    })
}
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