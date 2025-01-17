<template>
    <div id="default-modal" tabindex="-1" aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50 flex justify-center">
        <div class="relative p-4 w-full max-w-lg max-h-full">
            <div class="relative bg-white rounded-lg shadow flex flex-col items-center">
                <div
                    class="bg-[#695CCD] w-16 h-16 rounded-full flex justify-center items-center shadow-lg absolute top-[-30px]">
                    <IconTrash class="text-white" />
                </div>
                <div class="flex items-center justify-center p-4 md:p-5 border-b rounded-t w-full mt-7">
                    <h3 class="text-xl font-semibold text-[#1F1283]">
                        Remover projeto
                    </h3>
                </div>
                <div class="p-4 md:p-5 space-y-4">
                    <p class="text-base text-center leading-relaxed text-gray-500 ">
                        Essa ação removerá definitivamente o projeto:
                    </p>
                    <h3 class="text-2xl text-[#1C1930] text-center ">{{ project?.name }}</h3>
                </div>
                <div class="flex items-center p-4 md:p-5  rounded-b gap-4 w-full">
                    <button @click="$emit('close')" type="button"
                        class="py-2.5 px-5 ms-3 text-sm font-medium text-[#695CCD] w-full focus:outline-none bg-white rounded-full border border-[#695CCD]  focus:z-10 focus:ring-4 focus:ring-gray-100">Cancelar</button>
                    <button @click="$emit('confirm')" type="button"
                        class="text-white bg-[#695CCD] w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center ">Confirmar</button>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Project } from '../types/project';
import IconTrash from './icons/IconTrash.vue';

defineProps<{
    project: Project | null;
}>();

defineEmits<{
    (e: 'close'): void;
    (e: 'confirm'): void;
}>();
</script>