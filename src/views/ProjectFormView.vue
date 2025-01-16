<template>
  <div class="max-w-[1860px] mx-auto my-10">
    <ProjectFormHeader :is-editing="isEditing" />

    <form @submit.prevent="handleSubmit" class="border border-[#DCDCDC] p-10 mx-5 rounded">
      <div class="max-w-2xl mx-auto flex flex-col justify-center">
        <div class="mb-6">
          <label for="name" class="block mb-2 text-sm font-medium"
            :class="errors.name ? 'text-[#9F0000]' : 'text-[#695CCD]'">
            Nome do projeto
            <span class="text-xs text-[#717171] font-light"
              :class="errors.name ? 'text-[#C40000]' : 'text-[#717171]'">(Obrigatório)</span>
          </label>
          <input v-model="form.name" type="text" id="name"
            class="bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
            :class="errors.name ? 'border border-[#C40000]' : 'border border-gray-300 focus:border-blue-500'">
          <span v-if="errors.name" class="text-sm text-[#C40000] mt-1">{{ errors.name }}</span>
        </div>

        <div class="mb-6">
          <label for="client" class="block mb-2 text-sm font-medium"
            :class="errors.client ? 'text-[#9F0000]' : 'text-[#695CCD]'">
            Cliente
            <span class="text-xs text-[#717171] font-light"
              :class="errors.client ? 'text-[#C40000]' : 'text-[#717171]'">(Obrigatório)</span>
          </label>
          <input v-model="form.client" type="text" id="client"
            class="bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
            :class="errors.client ? 'border border-[#C40000]' : 'border border-gray-300 focus:border-blue-500'">
          <span v-if="errors.client" class="text-sm text-[#C40000] mt-1">{{ errors.client }}</span>
        </div>

        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label for="startDate" class="block mb-2 text-sm font-medium"
              :class="errors.startDate ? 'text-[#9F0000]' : 'text-[#695CCD]'">
              Data de Início
              <span class="text-xs text-[#717171] font-light"
                :class="errors.startDate ? 'text-[#C40000]' : 'text-[#717171]'">(Obrigatório)</span>
            </label>
            <input v-model="form.startDate" type="date" id="startDate"
              class="bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
              :class="errors.startDate ? 'border border-[#C40000]' : 'border border-gray-300 focus:border-blue-500'">
            <span v-if="errors.startDate" class="text-sm text-[#C40000] mt-1">{{ errors.startDate }}</span>
          </div>
          <div>
            <label for="endDate" class="block mb-2 text-sm font-medium"
              :class="errors.endDate ? 'text-[#9F0000]' : 'text-[#695CCD]'">
              Data Final
              <span class="text-xs text-[#717171] font-light"
                :class="errors.endDate ? 'text-[#C40000]' : 'text-[#717171]'">(Obrigatório)</span>
            </label>
            <input v-model="form.endDate" type="date" id="endDate"
              class="bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
              :class="errors.endDate ? 'border border-[#C40000]' : 'border border-gray-300 focus:border-blue-500'">
            <span v-if="errors.endDate" class="text-sm text-[#C40000] mt-1">{{ errors.endDate }}</span>
          </div>
        </div>

        <ProjectImageUpload :image-preview="imagePreview" @upload="(event) => handleImageUpload(event)"
          @remove="removeImage" />

        <button class="text-white py-2 rounded-full mt-10 bg-[#695CCD] hover:bg-[#5648B0]" type="submit">
          {{ loading ? 'Salvando...' : 'Salvar projeto' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import ProjectFormHeader from '../components/ProjectFormHeader.vue';
import ProjectImageUpload from '../components/ProjectImageUpload.vue';
import { useProjectForm } from '../composables/useProjectForm';
import { useProjectImage } from '../composables/useProjectImage';

const route = useRoute();
const { form, isEditing, loading, errors, handleSubmit, loadProject } = useProjectForm();
const { imagePreview, handleImageUpload, removeImage } = useProjectImage(form);

onMounted(async () => {
  await loadProject();
});

watch(
  () => route.params.id,
  async (newId) => {
    isEditing.value = !!newId;
    if (newId) {
      await loadProject();
    }
  },
  { immediate: true }
);
</script>