<template>
    <div id="app" v-if="!checkingAuth" class="container mt-12 mx-auto px-4 py-16 max-w-md relative">
      <h2 class="text-4xl font-bold text-center mb-8">Forgot Your Password</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <input
            type="email"
            placeholder="Email Address"
            v-model="email"
            class="w-full border-2 border-yellow-400 p-3 focus:outline-none"
            required
          />
        </div>
        <button type="submit" class="w-full bg-yellow-500 text-white py-3 mb-4">
          RESET YOUR PASSWORD
        </button>
        <div class="text-center">
          <NuxtLink to="/auth/login" class="text-sm underline">Back to Sign In</NuxtLink>
        </div>
      </form>
  
      <!-- Success and Error Messages -->
      <div v-if="message" :class="messageClass" class="mt-4 p-4 rounded-md text-center">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useToast } from 'vue-toastification';
  
  const email = ref('');
  const message = ref('');
  const messageClass = ref('');
  const toast = useToast();
  
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // message.value = 'Password reset link has been sent to your email.';
        // messageClass.value = 'bg-green-100 text-green-700';
        toast.success('Password reset link sent!');
      } else {
        // message.value = data.msg || 'Failed to send reset link. Please try again.';
        // messageClass.value = 'bg-red-100 text-red-700';
        toast.error(data.msg || 'Failed to send reset link.');
      }
    } catch (error) {
      console.error('Error:', error);
    //   message.value = 'An error occurred. Please try again.';
    //   messageClass.value = 'bg-red-100 text-red-700';
      toast.error('An error occurred. Please try again.');
    }
  };
  </script>
  
  <style scoped>
  
  </style>