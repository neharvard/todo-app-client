<template>
    <div id="app" class="container mt-12 mx-auto px-4 py-16 max-w-md relative">
      <h2 class="text-4xl font-bold text-center mb-8">Reset Your Password</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <input
            type="password"
            placeholder="New Password"
            v-model="newPassword"
            class="w-full border-2 border-yellow-400 p-3 focus:outline-none"
            required
          />
        </div>
        <button type="submit" class="w-full bg-yellow-500 text-white py-3 mb-4">
          RESET PASSWORD
        </button>
      </form>
  
      <!-- Success and Error Messages -->
      <div v-if="message" :class="messageClass" class="mt-4 p-4 rounded-md text-center">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  
  const route = useRoute();
  const router = useRouter();
  const toast = useToast();
  
  const newPassword = ref('');
  const message = ref('');
  const messageClass = ref('');
  
  const handleSubmit = async () => {
    try {
      const resetToken = route.params.resetToken;
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${resetToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword: newPassword.value }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        message.value = 'Password reset successfully!';
        messageClass.value = 'bg-green-100 text-green-700';
        toast.success('Password reset successfully!');
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000); // Redirect to login after 2 seconds
      } else {
        message.value = data.msg || 'Failed to reset password. Please try again.';
        messageClass.value = 'bg-red-100 text-red-700';
        toast.error(data.msg || 'Failed to reset password.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.value = 'An error occurred. Please try again.';
      messageClass.value = 'bg-red-100 text-red-700';
      toast.error('An error occurred. Please try again.');
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>