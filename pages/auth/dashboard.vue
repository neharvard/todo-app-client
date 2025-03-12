<template>
  <div
    v-if="!checkingAuth"
    class="min-h-screen flex flex-col justify-center items-center"
  >
    <h1 class="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
    <button
      @click="logout"
      class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";


const router = useRouter();
const checkingAuth = ref(true); // Added a loading state

// import { useAuth } from '~/composables/useAuth';
// const { token, clearToken } = useAuth();


onMounted(() => {
  if (process.client) {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login"); 
    } else {
      checkingAuth.value = false; // Show the dashboard
    }
  }
});

const logout = () => {
    // clearToken(); 
  localStorage.removeItem("token"); // Remove JWT token
  router.push("/auth/login"); 
};

definePageMeta({
  middleware: 'auth',
});
</script>
