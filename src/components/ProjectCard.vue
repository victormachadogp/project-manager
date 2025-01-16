<template>
    <div class="max-w-[346px] bg-white border border-[#DCDCDC] rounded-lg shadow pb-4">
        <div class="relative  h-[231px] ">
            <div class="overflow-hidden h-full">
                <img class="rounded-t-lg w-full " :src="project.coverImage || defaultBackground" :alt="project.name"
                    @error="handleImageError" />
            </div>
            <div class="absolute bottom-0 right-0 m-3 flex justify-center items-center gap-5">
                <button @click="toggleFavorite">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.16398 9.1776C0.845199 8.88374 1.01836 8.35251 1.44953 8.30155L7.55901 7.5792C7.73474 7.55843 7.88738 7.44843 7.96149 7.28825L10.5384 1.71938C10.7203 1.32636 11.2808 1.32628 11.4626 1.7193L14.0395 7.28813C14.1136 7.44831 14.2653 7.55861 14.441 7.57938L20.5508 8.30155C20.982 8.35251 21.1547 8.8839 20.8359 9.17776L16.3195 13.3419C16.1896 13.4616 16.1317 13.6399 16.1662 13.8129L17.3649 19.828C17.4495 20.2525 16.9962 20.5815 16.6174 20.3701L11.249 17.3738C11.0946 17.2877 10.907 17.2881 10.7526 17.3742L5.3836 20.3693C5.00472 20.5807 4.55066 20.2525 4.63528 19.828L5.83411 13.8133C5.8686 13.6403 5.8109 13.4616 5.68098 13.3418L1.16398 9.1776Z"
                            :fill="project.isFavorite ? '#FFB23D' : 'none'" stroke="white"
                            :stroke-width="project.isFavorite ? '1' : '2'" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>

                <button @click="showOptions = !showOptions" class="bg-white w-8 h-8 rounded-full flex justify-center">
                    <span class="text-[#695CCD] font-bold">...</span>

                    <div v-if="showOptions"
                        class="absolute right-0 top-0 mt-9 mb-2 bg-white rounded-lg shadow-lg py-2 min-w-[120px]">
                        <RouterLink :to="`/project/${project.id}`"
                            class="block px-4 py-2 text-left hover:bg-gray-100 text-sm text-[#695CCD]">
                            Editar
                        </RouterLink>
                        <button @click="handleDelete"
                            class="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-[#695CCD] border-t border[#F4F2FF]">
                            Excluir
                        </button>
                    </div>
                </button>
            </div>
        </div>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#1F1283]" v-html="highlightText(project.name)">
                </h5>
            </a>
            <span class="mb-3 text-[#717171] font-bold">Cliente: <span class="font-light"
                    v-html="highlightText(project.client)"></span></span>
        </div>
        <div class="border-t border-[##ECECEC] mx-3 pt-2">
            <div class="p-2 flex items-center gap-4">
                <IconStartDate />
                <span class="text-[#717171] font-normal top-px relative">{{ formatDate(project.startDate) }}</span>
            </div>
            <div class="p-2 flex items-center gap-4">
                <IconEndDate />
                <span class="text-[#717171] font-normal top-px relative">{{ formatDate(project.endDate) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from '../types/Project';
import { useProjectStore } from '../stores/projectStore';
import defaultBackground from '../assets/default-background.png';
import IconStartDate from '@/components/icons/IconStartDate.vue'
import IconEndDate from '@/components/icons/IconEndDate.vue'


const props = defineProps<{ project: Project }>();
const store = useProjectStore();

const emit = defineEmits<{
    (e: 'delete'): void;
}>();

const showOptions = ref(false);

async function toggleFavorite() {
    const updatedProject = {
        ...props.project,
        isFavorite: !props.project.isFavorite
    };
    await store.updateProject(updatedProject);
}

function formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    const localDate = new Date(date + 'T00:00:00');
    return localDate.toLocaleDateString('pt-BR', options);
}

function handleDelete() {
    showOptions.value = false;
    emit('delete');
}

function highlightText(text: string): string {
    if (!store.searchQuery) return text;

    const searchTerm = store.searchQuery.toLowerCase();
    const index = text.toLowerCase().indexOf(searchTerm);

    if (index >= 0) {
        const before = text.slice(0, index);
        const match = text.slice(index, index + searchTerm.length);
        const after = text.slice(index + searchTerm.length);
        return `${before}<span class="bg-yellow-200">${match}</span>${after}`;
    }

    return text;
}

function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = defaultBackground;
}
</script>