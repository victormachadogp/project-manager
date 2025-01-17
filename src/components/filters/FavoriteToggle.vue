<template>
    <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" :checked="modelValue" @change="onChange" class="sr-only peer" />
        <div
            class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-yellow-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400">
        </div>
        <span class="ms-3 text-sm font-medium text-[#717171]">Apenas favoritos</span>
    </label>
</template>

<script setup lang="ts">
defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const onChange = (event: Event) => {
    const input = event.target as HTMLInputElement | null;
    if (input) {
        emit('update:modelValue', input.checked);
    }
};
</script>
