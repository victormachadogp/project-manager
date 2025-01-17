<template>
    <div class="relative ">
        <div class="px-3 border border-[#695CCD] bg-white flex items-center gap-3 py-1 rounded h-[57px]">
            <IconSearch class="text-[#695CCD]" />
            <input v-model="searchInput" class="w-full py-2 !outline-none" placeholder="Digite o nome do projeto..."
                type="text" @focus="showRecentSearches = true" @blur="handleBlur">
            <button @click="$emit('close')">
                <IconX class="size-6" />
            </button>
        </div>

        <div v-if="showRecentSearches && store.recentSearches.length > 0"
            class="absolute w-full mt-1 bg-white border border-[#DCDCDC] rounded-lg shadow-lg z-50">
            <div v-for="search in store.recentSearches" :key="search"
                class="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer"
                @mousedown="selectRecentSearch(search)">
                <div class="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 4V8L10 10" stroke="#695CCD" stroke-width="2" stroke-linecap="round" />
                        <circle cx="8" cy="8" r="7" stroke="#695CCD" stroke-width="2" />
                    </svg>
                    <span class="text-[#717171]">{{ search }}</span>
                </div>
                <button @mousedown.stop="removeRecentSearch(search)" class="text-gray-400 hover:text-gray-600">
                    <IconX class="size-4" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconSearch from './icons/IconSearch.vue'
import IconX from './icons/IconX.vue'
import { useSearch } from '@/composables/useSearch'

const {
    searchInput,
    showRecentSearches,
    store,
    selectRecentSearch,
    removeRecentSearch,
    handleBlur
} = useSearch()
</script>