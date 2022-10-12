<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <label class="block font-medium uppercase text-xs text-gray-500">{{ text }}</label>
</template>
