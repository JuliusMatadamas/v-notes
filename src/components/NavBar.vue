<template>
    <nav class="bg-light fixed-top navbar navbar-expand-lg">
        <div class="container">
            <router-link :to="{name: 'Notes'}" class="logo">
                <img src="../assets/logo.png" alt="V-Notes">
                <h2>V-Notes</h2>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <button class="btn btn-outline-danger btn-signout" @click="$emit('confirmSignOut')">Sign Out</button>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(['confirmSignOut'])
</script>

<style scoped>
.logo {
    align-items: center;
    color: #191919;
    display: flex;
    justify-content: center;
    text-decoration: none;
}
@media screen and (max-width: 992px) {
    .navbar-collapse {
        padding-bottom: 1rem;
        padding-top: 1rem;
        text-align: end;
    }
}
</style>