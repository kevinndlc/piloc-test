<script setup lang="ts">
defineProps<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
}>();

const specificClasses = {
  1: 'uppercase text-3xl font-black',
  2: 'uppercase text-xl font-black',
  3: 'text-lg font-semibold',
  4: 'text-md font-medium',
  5: '',
  6: 'uppercase text-xs font-light',
};
</script>

<template>
  <Component
    :is="'h' + level"
    class="text-gray-800"
    :class="specificClasses[level]"
    >{{ content }}</Component
  >
</template>
