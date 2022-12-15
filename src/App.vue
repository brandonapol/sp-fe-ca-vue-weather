<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <Navbar />
    <RouterView class="flex-1" v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>

</template>

<script setup>
import { RouterView } from 'vue-router';
import Navbar from '/src/components/Navbar.vue';
</script>

<style scoped>

</style>