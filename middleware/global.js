export default defineNuxtRouteMiddleware((to, from) => {
    // Skip middleware on server-side
    if (process.server) return;
  
    const token = localStorage.getItem('token');
  
    // If the user is authenticated and tries to access guest routes (login/register), redirect to dashboard
    if (token && (to.path === '/auth/login' || to.path === '/auth/register')) {
      return navigateTo('/auth/dashboard');
    }
  
    // If the user is not authenticated and tries to access protected routes (dashboard), redirect to login
    if (!token && to.path === '/auth/dashboard') {
      return navigateTo('/auth/login');
    }
  });