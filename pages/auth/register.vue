
<template>
  <!-- bg-gray-100 -->
  <div v-if="!checkingAuth" class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Account</h2>
    </div>
    
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <!-- shadow -->
      <div class="bg-white py-8 px-4  sm:rounded-lg sm:px-10">
        <form @submit.prevent="register" class="space-y-6">
          <!-- First Name -->
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              v-model="form.firstName"
              id="firstName"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border-2 border-yellow-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <!-- Last Name -->
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              v-model="form.lastName"
              id="lastName"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border-2 border-yellow-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <!-- Email Address -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              v-model="form.email"
              id="email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border-2 border-yellow-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <!-- Create a Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Create a Password</label>
            <input
              v-model="form.password"
              id="password"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border-2 border-yellow-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              CREATE AN ACCOUNT
            </button>
          </div>
          <div class="text-center">           
            <span class="text-sm">Already Have an account? </span><NuxtLink to="/auth/login" class="text-sm underline">Sign In</NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
});

const checkingAuth = ref(true); // Add a loading state
onMounted(() => {
  if (process.client) {
    const token = localStorage.getItem('token');
    if (token) {
      // router.push('/auth/dashboard'); // Redirect to dashboard if already logged in
      router.push('/auth/todo'); // Redirect to dashboard if already logged in
    } else {
      checkingAuth.value = false; // Show the registration form
    }
  }
});

const register = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.value),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success('Registration successful!');
      // alert('Registration successful!')
      localStorage.setItem('token', data.token); // Store JWT token
      // router.push('/auth/dashboard'); // Redirect to dashboard
      router.push('/auth/todo'); // Redirect to dashboard
    } else {
      // alert(data.msg || 'Registration failed');
      toast.error(data.msg || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration Error:', error);
    // alert('An error occurred. Please try again.')
    toast.error('An error occurred. Please try again.');
  }
};

definePageMeta({
  middleware: 'guest',
});
</script>