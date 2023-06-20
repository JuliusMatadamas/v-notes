<template>
    <section class="animate__animated animate__fadeIn bg-light card shadow">
        <CardHeader
            subtitle="Sign In"
        ></CardHeader>

        <div class="card-body p-4">
            <form
                @submit.prevent="onSubmit"
            >
                <div class="mb-4">
                    <label for="">Enter your email</label>
                    <input
                        class="form-control"
                        placeholder="your-email@example.com"
                        ref="inputEmail"
                        type="email"
                        v-model="credentials.email"
                    >
                </div>

                <div class="mb-4">
                    <label for="">Enter your password</label>
                    <input
                        class="form-control"
                        placeholder="At least 6 characters"
                        ref="inputPassword"
                        type="password"
                        v-model="credentials.password"
                    >
                </div>

                <div class="mb-4">
                    Not registered? <router-link :to="{name: 'SignUp'}">Click here</router-link>
                </div>

                <div class="text-end">
                    <button type="submit" :disabled="btnDisabled" class="btn btn-outline-secondary">Submit</button>
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
import { evalEmail, evalPassword } from "@/helpers/";


// CONST
const authStore = useAuthStore()
const btnDisabled = ref(false)
const inputEmail = ref(null)
const inputPassword = ref(null)
const credentials = reactive({
    email: null,
    password: null,
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
            if (result.isConfirmed || result.isDismissed) {
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
                if (result.isConfirmed || result.isDismissed) {
                    inputPassword.value.focus()
                }
            })
        } else {
            btnDisabled.value = true
            Swal.fire({
                allowOutsideClick: false,
                title: 'Validating',
                iconHtml: '<span class="loader"></span>',
                showConfirmButton: false
            })
            authStore.signInUser(credentials, updateUserStore, showError)
        }
    }
}

const updateUserStore = () => {
    inputEmail.value = ''
    inputPassword.value = ''
    btnDisabled.value = false
    authStore.isAuth()
}

const showError = (error) => {
    btnDisabled.value = false
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