import { defineStore } from 'pinia'
import { browserSessionPersistence, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, signInWithEmailAndPassword  } from 'firebase/auth'
import { auth } from '@/js/firebase.js'
import Swal from 'sweetalert2'

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            user: {}
        }
    },
    persist: true,


    actions: {
        verifyAuth: () => {
            setPersistence(auth, browserSessionPersistence)
                .then(() => {
                })
                .catch((error) => {
                    console.error(error.code, error.message)
                })
        },
        isAuth() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.user.id = user.uid;
                    this.user.email = user.email;
                    Swal.close();
                    this.router.push('/notes')
                } else {
                    this.user = {}
                    this.router.replace('/')
                }
            });
        },
        registerUser: (credentials, updateUserStore, showError) => {
            let { email, password } = credentials;
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateUserStore()
                })
                .catch((error) => {
                    showError(error)
                });
        },
        signInUser: (credentials, updateUserStore, showError) => {
            let { email, password } = credentials
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateUserStore()
                })
                .catch((error) => {
                    showError(error)
                });
        },
        signOutUser(cb) {
            this.user = {}
            cb()
        }
    },


    getters: {
        getUser: (state) => {
            return state.user
        }
    }
})