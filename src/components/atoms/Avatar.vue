<script setup lang="ts">
defineProps<{
  img: string;
}>();
</script>

<template>
  <img :src="img" alt="" class="h-10 w-10 rounded-full" />
</template>
