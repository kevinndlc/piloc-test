<script setup lang="ts">
import TheHeader from './components/organisms/TheHeader.vue';
import { RouterView } from 'vue-router';
import { useParcStore } from './stores/parc';
import Loader from './components/atoms/Loader.vue';

const parcStore = useParcStore();
</script>

<template>
  <TheHeader />

  <main class="pb-4">
    <RouterView v-if="parcStore.isLoaded" />
    <Loader v-else />
  </main>
</template>
