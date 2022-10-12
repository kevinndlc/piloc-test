<script setup lang="ts">
import Label from '../atoms/Label.vue';
import Input from '../atoms/Input.vue';
import { computed } from '@vue/reactivity';
import type { InputType } from '@/shared/interfaces';
import InputError from '../atoms/InputError.vue';

const props = defineProps<{
  title: string;
  type: InputType;
  step?: number;
  placeholder?: string;
  errorMessage?: string;
  focus?: boolean
  modelValue: string | number | null;
}>();

const id = computed(() => props.title.toLowerCase());

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: string | number): void;
}>();

function updateValue(value: string | number) {
  emit('update:modelValue', value);
}
</script>

<template>
  <div class="relative my-3">
    <Label :for="id" :text="title" class="absolute -top-1 -translate-y-full" />
    <Input
      :type="type"
      :id="id"
      :step="step"
      :placeholder="placeholder"
      :model-value="modelValue"
      :focus="focus"
      @update:model-value="updateValue"
    />
    <InputError :text="errorMessage ?? ''" class="absolute bottom-0 left-0 translate-y-full" />
  </div>
</template>
