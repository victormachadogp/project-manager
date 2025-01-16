<template>
    <div class="flex items-center gap-4">
        <FavoriteToggle :model-value="showFavorites" @update:model-value="$emit('update:showFavorites', $event)" />

        <SortSelect :model-value="sortOption" @update:model-value="$emit('update:sortOption', $event)" />
    </div>
</template>

<script setup lang="ts">
import type { ProjectSortOption } from '@/types/Project';
import FavoriteToggle from './FavoriteToggle.vue';
import SortSelect from './SortSelect.vue';

defineProps<{
    showFavorites: boolean,
    sortOption: ProjectSortOption
}>();

defineEmits<{
    (e: 'update:showFavorites', value: boolean): void,
    (e: 'update:sortOption', value: ProjectSortOption): void
}>();
</script>