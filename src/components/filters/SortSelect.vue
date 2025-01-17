<template>
    <select :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value as ProjectSortOption)"
        class="border border-[#DCDCDC] rounded-lg px-4 py-2 text-sm text-[#717171]">
        <option value="alphabetical">Ordem alfabética</option>
        <option value="startDate">Iniciados mais recentes</option>
        <option value="endDate">Prazo mais próximo</option>
    </select>
</template>

<script setup lang="ts">
import type { ProjectSortOption } from '@/types/project';

defineProps<{
    modelValue: ProjectSortOption
}>();

defineEmits<{
    (e: 'update:modelValue', value: ProjectSortOption): void
}>();
</script>