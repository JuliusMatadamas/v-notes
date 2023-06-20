<template>
    <section class="animate__animated animate__fadeIn bg-light card shadow">
        <CardHeader
            subtitle="Sign Up"
        ></CardHeader>

        <div class="card-body p-4">
            <form
                @submit.prevent="onSubmit"
            >
                <div class="mb-4">
                    <label>Enter your email</label>
                    <input
                        class="form-control"
                        ref="inputEmail"
                        type="email"
                        placeholder="your-email@example.com"
                        v-model="credentials.email"
                    >
                </div>

                <div class="mb-4">
                    <label>Enter your password</label>
                    <input
                        class="form-control"
                        ref="inputPassword"
                        type="password"
                        placeholder="At least 6 characters"
                        v-model="credentials.password"
                    >
                </div>

                <div class="mb-4">
                    <label>Repeat your password</label>
                    <input
                        class="form-control"
                        ref="inputPasswordConfirm"
                        type="password"
                        placeholder="Must match password"
                        v-model="credentials.passwordConfirm"
                    >
                </div>

                <div class="mb-4">
                    <router-link :to="{name: 'SignIn'}">Back to sign in</router-link>
                </div>

                <div class="text-end">
                    <button class="btn btn-outline-secondary" :disabled="btnDisabled" type="submit">Submit</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup>
// IMPORTS
import {onBeforeMount, reactive, ref} from "vue";
import { useAuthStore } from "@/stores/auth.js";
import CardHeader from "@/components/CardHeader.vue"
import router from "@/router/index.js";
import Swal from 'sweetalert2'
import { evalEmail, evalPassword, comparePasswords } from "@/helpers/index.js";

// CONST
const authStore = useAuthStore()
const inputEmail = ref(null)
const inputPassword = ref(null)
const inputPasswordConfirm = ref(null)
const btnDisabled = ref(false)
const credentials = reactive({
    email: null,
    password: null,
    passwordConfirm: null
})


// HOOKS
onBeforeMount(() => {
    let user = authStore.getUser;
    if(user.id) router.push('/notes')
})


// METHODS
const onSubmit = () => {
    if(!evalEmail(credentials.email)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must fill in the email field with a valid email address.!',
        }).then((result) => {
            if (result.isConfirmed) {
                inputEmail.value.focus()
            }
        })
    } else {
        if(!evalPassword(credentials.password)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You must fill the password field with at least 6 characters.!',
            }).then((result) => {
                if (result.isConfirmed) {
                    inputPassword.value.focus()
                }
            })
        } else {
            if(!comparePasswords(credentials.password, credentials.passwordConfirm)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Passwords must match!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        inputPasswordConfirm.value.focus()
                    }
                })
            } else {
                btnDisabled.value = true
                authStore.registerUser(credentials, updateUserStore, showError)
            }
        }
    }
}


const updateUserStore = () => {
    btnDisabled.value = false
    authStore.isAuth()
}

const showError = (error) => {
    Swal.fire({
        icon: 'error',
        title: 'An error has occurred!',
        text: `Error code: ${error.code}, message: ${error.message}`,
    })
}
</script>

<style scoped>
section {
    max-width: 420px;
    width: 80%;
}
</style>