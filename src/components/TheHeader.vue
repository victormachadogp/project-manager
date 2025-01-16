<template>
    <div>
        <div v-show="!showSearchBar" class="bg-[#1C1930] flex justify-between items-center w-full">
            <div class="opacity-0"></div>
            <img class="w-36" src="../assets/logo.png" alt="">
            <button @click="toggleSearchBar">
                <IconSearch class="text-white" />
            </button>
        </div>

        <SearchBar v-show="showSearchBar" @close="toggleSearchBar" />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import IconSearch from './icons/IconSearch.vue'
import SearchBar from './SearchBar.vue'
import { useSearch } from '@/composables/useSearch'

const { showSearchBar, toggleSearchBar, store } = useSearch()

onMounted(() => {
    store.loadRecentSearches()
})
</script>