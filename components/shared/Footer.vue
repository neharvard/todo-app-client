<template>
  <footer class="bg-black text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Newsletter Section -->
        <div>
          <h3 class="text-xl font-bold mb-4">Get news & discounts</h3>
          <div class="flex mb-6">
            <input 
              type="email" 
              placeholder="Email address" 
              v-model="email"
              class="flex-grow p-2 bg-transparent border-2 border-amber-400 bg-white text-gray-400 focus:outline-none"
            />
            <button 
              @click="subscribe" 
              class="bg-yellow-500 text-white px-4 py-2"
            >
              SIGN UP
            </button>
          </div>
          
          <!-- Social Icons -->
          <div class="flex space-x-4">
            <a href="#" aria-label="Instagram">
              <InstagramIcon class="w-6 h-6" />
            </a>
            <a href="#" aria-label="Facebook">
              <FacebookIcon class="w-6 h-6" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <LinkedinIcon class="w-6 h-6" />
            </a>
            <a href="#" aria-label="Spotify">
              <Music2Icon class="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <!-- Explore Column -->
        <div>
          <h3 class="text-yellow-500 font-bold mb-4">EXPLORE</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/shop">Shop</NuxtLink></li>
            <li><NuxtLink to="/rum-club">The Rum Club</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Information Column -->
        <div>
          <h3 class="text-yellow-500 font-bold mb-4">INFORMATION</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/privacy">Privacy</NuxtLink></li>
            <li><NuxtLink to="/terms">Terms</NuxtLink></li>
            <li><NuxtLink to="/shipping">Shipping</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Get in Touch Column -->
        <div>
          <h3 class="text-yellow-500 font-bold mb-4">GET IN TOUCH</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/contact">Contact</NuxtLink></li>
          </ul>
        </div>
      </div>
      
      <!-- Copyright and Payment Methods -->
      <div class="flex flex-col md:flex-row justify-between items-center mt-12 pt-6 ">
        <p class="text-sm mb-4 md:mb-0">Copyright © Quba 2021</p>
        
        <div class="flex space-x-2">
          <!-- Payment method icons -->
          <!-- <img src="/placeholder.svg?height=24&width=40" alt="American Express" class="h-6" />
          <img src="/placeholder.svg?height=24&width=40" alt="Visa" class="h-6" />
          <img src="/placeholder.svg?height=24&width=40" alt="Mastercard" class="h-6" />
          <img src="/placeholder.svg?height=24&width=40" alt="Discover" class="h-6" />
          <img src="/placeholder.svg?height=24&width=40" alt="PayPal" class="h-6" />
          <img src="/placeholder.svg?height=24&width=40" alt="Apple Pay" class="h-6" /> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { InstagramIcon, FacebookIcon, LinkedinIcon, Music2Icon } from 'lucide-vue-next'

const email = ref('')

const subscribe = () => {
  // Handle newsletter subscription
  console.log('Subscribing with:', email.value)
  email.value = ''
}
</script>