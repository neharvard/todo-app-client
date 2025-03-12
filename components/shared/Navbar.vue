
<template>
  <nav class="border-b  border-gray-200 bg-stone-300">
    <div class="container mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <div class="flex space-x-8">
        <NuxtLink to="/shop" class="text-sm font-medium hover:text-red-900">SHOP</NuxtLink>
        <NuxtLink to="/rum-club" class="text-sm font-medium hover:text-red-900">THE RUM CLUB</NuxtLink>
        <NuxtLink to="/contact" class="text-sm font-medium hover:text-red-900">CONTACT</NuxtLink>
      </div>
  
        <h1 class="text-3xl font-bold absolute left-1/2 transform -translate-x-1/2">QUBA</h1>
     
      <div class="flex space-x-4">
        <NuxtLink to="/account">
          <UserIcon class="w-5 h-5" />
        </NuxtLink>
        <NuxtLink to="/cart">
          <ShoppingBagIcon class="w-5 h-5" />
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { UserIcon, ShoppingBagIcon } from 'lucide-vue-next'
</script>