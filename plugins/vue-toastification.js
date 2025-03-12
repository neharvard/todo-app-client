import { defineNuxtPlugin } from "#app";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"; // Import the CSS

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    timeout: 3000, // Default toast duration
    position: "top-right", // Toast position
    closeOnClick: true, // Close toast on click
    pauseOnFocusLoss: true, // Pause toast on window focus loss
    pauseOnHover: true, // Pause toast on hover
    draggable: true, // Allow dragging to dismiss
    draggablePercent: 0.6, // Draggable percentage
    showCloseButtonOnHover: false, // Show close button on hover
    hideProgressBar: false, // Hide progress bar
    closeButton: "button", // Use a button for closing
    icon: "✅", // Custom icon
    rtl: false, // Right-to-left layout
  });
});
