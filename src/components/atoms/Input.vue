<script setup lang="ts">
import type { InputType } from '@/shared/interfaces';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  type: InputType;
  placeholder?: string;
  step?: number;
  focus?: boolean;
  modelValue: string | number | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: string | number): void;
}>();

const input = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if (props.focus) {
    input.value?.focus();
  }
});

function updateValue(event: any) {
  if (props.type === 'number') {
    emit('update:modelValue', parseInt(event.target.value || 0));
  } else {
    emit('update:modelValue', event.target.value);
  }
}
</script>

<template>
  <input
    ref="input"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :step="step"
    @input="updateValue"
    class="border rounded-md w-full p-2"
  />
</template>
