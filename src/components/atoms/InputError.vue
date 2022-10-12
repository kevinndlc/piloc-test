<script setup lang="ts">
defineProps<{
  text: string;
}>()
</script>

<template>
  <small class="text-xs text-red-500 font-medium">{{ text }}</small>
</template>