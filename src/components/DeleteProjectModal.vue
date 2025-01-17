<template>
    <ModalBase title="Remover projeto" :icon="IconTrash" @confirm="$emit('confirm')" @cancel="$emit('cancel')">
        <p class="text-base text-center leading-relaxed text-gray-500">
            Essa ação removerá definitivamente o projeto:
        </p>
        <h3 class="text-2xl text-[#1C1930] text-center">{{ project?.name }}</h3>
    </ModalBase>
</template>

<script setup lang="ts">
import ModalBase from './ModalBase.vue';
import IconTrash from './icons/IconTrash.vue';
import type { Project } from '../types/project';

defineProps<{
    project: Project | null;
}>();

defineEmits<{
    (e: 'cancel'): void;
    (e: 'confirm'): void;
}>();
</script>