<script setup lang="ts">
import { useParcStore } from '@/stores/parc';
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import PropertyForm from '../components/organisms/PropertyForm.vue';

const route = useRoute();
const parcStore = useParcStore();

const correspondingProperty = computed(() =>
  parcStore.properties.find(
    (property) => property.id.toString() == route.params.propertyId
  )!
);
</script>

<template>
  <PropertyForm :property="correspondingProperty" />
</template>
