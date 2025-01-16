<template>
    <div>
        <div v-if="showSearchBar" class="bg-[#1C1930] flex justify-between items-center w-full">
            <div class="opacity-0"></div>
            <img class="w-36" src="../assets/logo.png" alt="">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19 18.9999L14.65 14.6499" stroke="white" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>


        </div>
        <div class="border border-[#695CCD] bg-white flex items-center gap-3 py-1 rounded">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8.99176 17C13.4055 17 16.9835 13.4183 16.9835 9C16.9835 4.58172 13.4055 1 8.99176 1C4.57803 1 1 4.58172 1 9C1 13.4183 4.57803 17 8.99176 17Z"
                    fill="white" stroke="#695CCD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M18.9814 18.9999L14.6359 14.6499" stroke="#695CCD" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>

            <input class="w-full py-2" placeholder="Digite o nome do projeto..." type="text">
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showSearchBar = ref(false);


</script>