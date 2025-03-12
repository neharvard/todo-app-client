<template>
    <div class="flex flex-col min-h-screen min-w-screen">
      <SharedTopNotification />
      <SharedNavbar/>
      <!-- <main class="flex-grow"> -->
        <slot />
      <!-- </main> -->
      <SharedNewsletter/>
      <SharedFooter/>
    </div>
  </template>

<script setup>


</script>

<style scoped>

</style>