<template>
    <div>
        <div v-if="showSearchBar" class="bg-[#1C1930] flex justify-between items-center w-full">
            <div class="opacity-0"></div>
            <img class="w-36" src="../assets/logo.png" alt="">
            <button @click="showSearchBar = false">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 1L1 19M1 1L19 19" stroke="white" stroke-width="2" stroke-linecap="round" />
                </svg>
            </button>
        </div>
        <div class="relative">
            <div class="border border-[#695CCD] bg-white flex items-center gap-3 py-1 rounded">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.99176 17C13.4055 17 16.9835 13.4183 16.9835 9C16.9835 4.58172 13.4055 1 8.99176 1C4.57803 1 1 4.58172 1 9C1 13.4183 4.57803 17 8.99176 17Z"
                        fill="white" stroke="#695CCD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M18.9814 18.9999L14.6359 14.6499" stroke="#695CCD" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>

                <input v-model="searchInput" class="w-full py-2" placeholder="Digite o nome do projeto..." type="text"
                    @focus="showRecentSearches = true" @blur="handleBlur">
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
                    <button @mousedown.stop="removeRecentSearch(search)"
                        class="text-gray-400 hover:text-gray-600">×</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useProjectStore } from '../stores/projectStore';
import debounce from 'lodash/debounce';

const store = useProjectStore();
const showSearchBar = ref(false);
const searchInput = ref('');
const showRecentSearches = ref(false);

onMounted(() => {
    store.loadRecentSearches();
});

const debouncedSearch = debounce((query: string) => {
    if (query.length >= 3) {
        store.searchQuery = query;
        store.addToRecentSearches(query);
    } else {
        store.searchQuery = '';
    }
}, 1000);

watch(searchInput, (newValue) => {
    debouncedSearch(newValue);
});

function selectRecentSearch(search: string) {
    searchInput.value = search;
    showRecentSearches.value = false;
}

function removeRecentSearch(search: string) {
    store.recentSearches = store.recentSearches.filter(s => s !== search);
    localStorage.setItem('recentSearches', JSON.stringify(store.recentSearches));
}

function handleBlur() {
    setTimeout(() => {
        showRecentSearches.value = false;
    }, 200);
}
</script>