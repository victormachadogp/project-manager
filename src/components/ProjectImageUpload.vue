<template>
    <div>
        <div v-if="!imagePreview">
            <span class="text-[#695CCD]">Capa do projeto</span>
            <div class="flex flex-col items-center space-y-4 border border-dotted border-[#717171] p-5 mt-2">
                <IconUpload />
                <span class="text-[#717171] text-sm">Escolha uma imagem .jpg ou .png no seu dispositivo</span>
                <input type="file" id="coverImage" accept="image/jpeg, image/png" class="hidden"
                    @change="$emit('upload', $event)" />
                <label for="coverImage"
                    class="bg-white border border-[#695CCD] rounded-full px-8 py-2 text-[#695CCD] cursor-pointer hover:bg-[#695CCD] hover:text-white transition-colors">
                    Selecionar
                </label>
            </div>
        </div>
        <div v-if="imagePreview" class="relative rounded overflow-hidden max-w-[702px] max-h-[395px]">
            <img :src="imagePreview" alt="Preview" class="w-full h-full object-cover mb-4">
            <button type="button" @click="$emit('remove')"
                class="absolute top-0 right-0 p-2 bg-white rounded-full shadow-md m-3 hover:bg-gray-100 transition-colors">
                <IconTrash class="text-[#695CCD]" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconUpload from '@/components/icons/IconUpload.vue';
import IconTrash from '@/components/icons/IconTrash.vue';

defineProps<{
    imagePreview: string;
}>();

defineEmits<{
    (e: 'upload', event: Event): void;
    (e: 'remove'): void;
}>();
</script>