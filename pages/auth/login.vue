<template>
    <div id="app" v-if="!checkingAuth" class="container mt-12  px-4 py-16 relative ">
        <!-- Vertical text on left side -->
        <div
            class="absolute left-0  top-1/2 transform -translate-y-1/2 -rotate-90 text-xs tracking-widest text-red-400">
            JOIN THE RUM CLUB JOIN THE RUM CLUB JOIN THE RUM CLUB
        </div>

        <!-- Vertical text on right side -->
        <div
            class="absolute right-0 top-1/2 transform -translate-y-1/2 rotate-90 text-xs tracking-widest text-red-400">
            JOIN THE RUM CLUB JOIN THE RUM CLUB JOIN THE RUM CLUB
        </div>

        

        <form  @submit.prevent="handleSubmit" class="max-w-md  mx-auto">
            <h2 class="text-4xl font-bold text-center mb-8">Sign In</h2>
            <div class="mb-4">
                <input type="email" placeholder="Email Address" v-model="email"
                    class="w-full border-2 border-yellow-400 p-3 focus:outline-none" />
            </div>

            <div class="mb-4">
                <input type="password" placeholder="Password" v-model="password"
                    class="w-full border-2 border-yellow-400 p-3 focus:outline-none" />
            </div>

            <div class="flex items-center mb-4">
                <input type="checkbox" id="remember" v-model="rememberMe" class="mr-2 h-4 w-4 border-gray-300" />
                <label for="remember" class="text-sm">Remember me</label>
            </div>

            <div class="mb-4">
                <NuxtLink to="/auth/forgotPass" class="text-sm underline">Forgot your password?</NuxtLink>
            </div>

            <button type="submit" class="w-full bg-black text-white py-3 mb-4">
                SIGN IN
            </button>

            <button type="button" @click="createAccount" class="w-full border-2 border-black py-3">

                <NuxtLink to="/auth/register" class="subtitle-action">CREATE AN ACCOUNT</NuxtLink>
            </button>
        </form>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
const toast = useToast();

const router = useRouter();

// import { useAuth } from '~/composables/useAuth';
// const { token, setToken } = useAuth();


const email = ref('');
const password = ref('');
const backendError = ref('');
const checkingAuth = ref(true);

onMounted(() => {
    if (process.client) {
        const token = localStorage.getItem('token');
        if (token) {
            // router.push('/auth/dashboard'); // Redirect to dashboard if already logged in
            router.push('/auth/todo'); // Redirect to dashboard if already logged in
        }else {
            checkingAuth.value = false; // Show login form if no token
        }
    }
});

const handleSubmit = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email.value, password: password.value }),
        });

        const data = await response.json();

        if (response.ok) {
            toast.success('Login successful!');
            // alert('Login successful!');

            // setToken(data.token); // Set token using useAuth

            localStorage.setItem('token', data.token); // Store JWT token
            // router.push('/auth/dashboard'); // Redirect to dashboard
            router.push('/auth/todo'); // Redirect to dashboard
        } else {
            backendError.value = data.msg;
            toast.error(data.msg || 'Invalid credentials');
            // alert(data.msg || 'Invalid credentials');
        }
    } catch (error) {
        toast.error('An error occurred. Please try again.');
        // alert('An error occurred. Please try again.');
    }
};

definePageMeta({
    middleware: 'guest',
});
</script>




















