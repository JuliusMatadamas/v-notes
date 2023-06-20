import { defineStore } from "pinia";
import { doc, collection, getDoc, query, where, addDoc, onSnapshot, updateDoc, deleteDoc  } from "firebase/firestore";
import { db } from "@/js/firebase.js";

export const useNotesStore = defineStore('notesStore', {
    state: () => {
        return {
            notes: [],
            note: null
        }
    },

    persist: true,

    actions: {
        async addNote(note, cleanForm, showError) {
            let {idUser, content, createdAt} = note
            await addDoc(collection(db, "notes"), {
                idUser: idUser,
                content: content,
                createdAt: createdAt
            }).then((res) => {
                cleanForm(res.id)
            }).catch((error) => {
                showError(error)
            })
        },
        getNotes(uid) {
            const q = query(collection(db, "notes"), where("idUser", "==", uid));
            onSnapshot(q, (querySnapshot) => {
                let notes = [];
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    let note = {
                        id: doc.id,
                        idUser: data.idUser,
                        content: data.content,
                        createdAt: data.createdAt
                    }
                    notes.push(note);
                })
                this.notes = notes;
            });
        },
        async updateNote(note, showSuccess, showErrorToUpdate) {
            const { noteId, idUser, content, createdAt } = note
            await updateDoc(doc(db, "notes", noteId), {
                content: content
            }).then(() =>{
                showSuccess()
            }).catch((error) => {
                showErrorToUpdate(error)
            })
        },
        async deleteNote(note, showSuccessDelete, showErrorToDelete ) {
            const { id } = note
            await deleteDoc(doc(db, "notes", id))
                .then(() =>{
                    showSuccessDelete()
                }).catch((error) => {
                    showErrorToDelete(error)
                })
        },
        async verifyNote(userId, docId, getNote, showErrorToEdit) {
            const docRef = doc(db, "notes", docId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                let noteReg = docSnap.data();
                if (userId === noteReg.idUser) {
                    this.note = noteReg
                    getNote()
                } else {
                    this.note = null;
                    showErrorToEdit("This note does not apply to you, so you cannot edit it.\n" +
                        "Return to the initial list of notes");
                }
            } else {
                cb("No such document!");
            }
        },
        readNotes() {
            return this.notes;
        }
    }
})