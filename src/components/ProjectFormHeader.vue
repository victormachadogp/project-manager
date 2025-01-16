<template>
    <div class="mb-5 pl-5">
        <RouterLink to="/" class="text-sm text-[#695CCD] hover:underline flex items-center gap-2">
            <IconArrowLeft />
            Voltar
        </RouterLink>
        <h3 class="text-[#1F1283] font-semibold text-2xl mt-2">
            {{ isEditing ? 'Editar Projeto' : 'Novo Projeto' }}
        </h3>
    </div>
</template>

<script setup lang="ts">
import IconArrowLeft from './icons/IconArrowLeft.vue';

defineProps<{
    isEditing: boolean;
}>();
</script>