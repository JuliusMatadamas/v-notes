<template>
    <div class="bg-light card-header text-center">
        <h2>
            <img :src="logo" alt="">
            V-Notes
        </h2>
        <h3>{{ subtitle }}</h3>
    </div>
</template>

<script setup>
// IMPORTS
import { defineProps } from "vue";
import logo from "@/assets/logo.png"


// PROPS
const props = defineProps({
    subtitle: {
        type: String,
        default: " --- ",
        required: true
    }
})
</script>

<style scoped>
.card-header h2 {
    align-items: center;
    display: flex;
    justify-content: center;
}
.card-header h2 img {
    margin-right: 20px;
}
</style>