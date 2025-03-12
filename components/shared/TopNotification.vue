<template>
    <div v-if="isVisible" class="bg-black text-white text-center py-3 text-sm relative">
      FREE DELIVERY ON ALL ORDERS OVER £50
      <button @click="closeNotification" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
        <XIcon class="w-4 h-4" />
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { XIcon } from 'lucide-vue-next'
  
  const isVisible = ref(true)
  
  const closeNotification = () => {
    isVisible.value = false
  }
  </script>