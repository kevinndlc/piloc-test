<script setup lang="ts">
defineProps<{
  text: string,
  uppercase?: boolean
}>()
</script>

<template>
  <button class="btn" :class="uppercase && 'uppercase'">{{ text }}</button>
</template>