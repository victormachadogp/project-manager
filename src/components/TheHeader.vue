<template>
    <div class="bg-[#1C1930]">
        <div v-show="!showSearchBar" class="max-w-[1860px] mx-auto">
            <div class="flex justify-between items-center mx-5 sm:mx-12">
                <div class="opacity-0"></div>
                <img class="my-4 sm:my-2 w-20 sm:w-28" src="../assets/logo.png" alt="">
                <button @click="toggleSearchBar">
                    <IconSearch class="text-white" />
                </button>
            </div>
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