export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;

  if (process.client) {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigateTo("/auth/login"); // Redirect to login if no token
    }
  }
});



// export default defineNuxtRouteMiddleware((to, from) => {
//   const { token } = useAuth();

//   if (!token.value) {
//     return navigateTo("/auth/login");
//   }
// });
