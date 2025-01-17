<template>
    <div id="default-modal" tabindex="-1"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50 flex justify-center">
        <div class="relative p-4 w-full max-w-lg max-h-full">
            <div class="relative bg-white rounded-lg shadow flex flex-col items-center">
                <div v-if="icon" :class="[
                    'w-16 h-16 rounded-full flex justify-center items-center shadow-lg absolute top-[-30px]',
                    iconBackgroundClass
                ]">
                    <component :is="icon" class="text-white" />
                </div>
                <div class="flex items-center justify-center p-4 md:p-5 border-b rounded-t w-full"
                    :class="{ 'mt-7': icon }">
                    <h3 class="text-xl font-semibold text-[#1F1283]">
                        {{ title }}
                    </h3>
                </div>
                <div class="p-4 md:p-5 space-y-4">
                    <slot></slot>
                </div>
                <div class="flex items-center p-4 md:p-5 rounded-b gap-4 w-full">
                    <button v-if="showCancelButton" @click="$emit('cancel')" type="button"
                        class="py-2.5 px-5 ms-3 text-sm font-medium text-[#695CCD] w-full focus:outline-none bg-white rounded-full border border-[#695CCD] focus:z-10 focus:ring-4 focus:ring-gray-100">
                        {{ cancelText }}
                    </button>
                    <button @click="$emit('confirm')" type="button"
                        class="text-white bg-[#695CCD] w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                        {{ confirmText }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type Component } from 'vue';

interface Props {
    title: string;
    icon?: Component;
    iconBackgroundClass?: string;
    showCancelButton?: boolean;
    cancelText?: string;
    confirmText?: string;
}

withDefaults(defineProps<Props>(), {
    showCancelButton: true,
    cancelText: 'Cancelar',
    confirmText: 'Confirmar',
    iconBackgroundClass: 'bg-[#695CCD]'
});

defineEmits<{
    (e: 'cancel'): void;
    (e: 'confirm'): void;
}>();
</script>