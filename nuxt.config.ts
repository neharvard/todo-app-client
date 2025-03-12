// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    "vue-toastification/dist/index.css", // Vue Toastification CSS
    'primeicons/primeicons.css', // PrimeIcons
    "~/assets/css/main.css", // Tailwind CSS
  ],
  build: {
    transpile: ['vue-toastification'],
  },
  
  vite: {
    plugins: [tailwindcss()],
   
  }
});










