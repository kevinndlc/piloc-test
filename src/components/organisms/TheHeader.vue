<script setup lang="ts">
import Heading from '../atoms/Heading.vue';
import Button from '../atoms/Button.vue';
</script>

<template>
  <header class="flex justify-between items-center py-6">
    <Heading :level="1" :content="($route.meta.title as string) ?? ''" />
    <RouterLink
      v-if="$route.name === 'Dashboard'"
      :to="{ name: 'AddProperty' }"
      class="btn uppercase"
      >Ajouter un bien</RouterLink
    >
    <Button v-else text="Retour" uppercase @click="$router.back()" />
  </header>
</template>
