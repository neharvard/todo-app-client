<template>
    <section class="bg-red-400 py-12 text-center">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold mb-6">Join the Rum Club</h2>

            <div class="flex max-w-md mx-auto">
                <input type="email" placeholder="Email address" v-model="email"
                    class="flex-grow p-3 bg-white border-2 border-black focus:outline-none" />
                <button @click="subscribe" class="bg-black text-white px-6 py-3">
                    SIGN UP
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const subscribe = () => {
    // Handle newsletter subscription
    console.log('Subscribing with:', email.value)
    email.value = ''
}
</script>