<template>
    <section class="card mb-4">
        <div class="card-body">
            <textarea class="form-control" disabled name="" cols="30" rows="4">{{ note.content }}</textarea>

            <div class="buttons mt-4 text-end">
                <router-link :to="{ name: 'EditNote', params: { id: note.id }}" class="btn btn-note btn-outline-info">Edit</router-link>
                <button class="btn btn-note btn-outline-danger" @click="deleteNote">Delete</button>
            </div>
        </div>
    </section>
</template>

<script setup>
// IMPORTS
import {defineProps} from "vue";
import { useNotesStore } from "../stores/notes.js";
import Swal from "sweetalert2";


// CONSTANTS
const notesStore = useNotesStore()

// PROPS
const props = defineProps({
    note: {
        type: Object,
        required: true
    }
})

// METHODS
const deleteNote = () => {
    Swal.fire({
        title: 'Are you sure you want to delete this note?',
        confirmButtonText: 'Cancel',
        showDenyButton: true,
        denyButtonText: `Proceed`,
    }).then((result) => {
        if (result.isDenied) {
            notesStore.deleteNote(props.note, showSuccessDelete, showErrorDelete)
        }
    })
}
const showSuccessDelete = () => {
    Swal.fire({
        icon: 'success',
        title: 'Note deleted!',
        text: `The note has been deleted`,
    })
}
const showErrorDelete = (error) => {
    Swal.fire({
        icon: 'error',
        title: 'An error has occurred!',
        text: `Error code: ${error.code}, message: ${error.message}`,
    })
}
</script>

<style scoped>
textarea {
    border: none;
    resize: none;
    scrollbar-color: #f5f5f5 transparent;
    scrollbar-width: thin;
    text-align: justify;
}
textarea[disabled] {
    background: #fff;
}
textarea::-webkit-scrollbar {
    height: 8px;
    width: 8px;
}
textarea::-webkit-scrollbar-thumb {
    background: #f5f5f5;
    border-radius: 3px;
}
textarea::-webkit-scrollbar-thumb:hover {
    background: #b3b3b3;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}
section {
    margin: auto;
    max-width: 640px;
    width: 80%;
}
.btn-note {
    margin-right: 20px;
    width: 100px;
}
</style>