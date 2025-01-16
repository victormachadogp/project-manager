<template>
  <ProjectFormHeader :is-editing="isEditing" />

  <form @submit.prevent="handleSubmit" class="border border-[#DCDCDC] p-10 mx-5">
    <div class="max-w-2xl mx-auto flex flex-col justify-center">
      <div class="mb-6">
        <label for="name" class="block mb-2 text-sm font-medium text-[#695CCD]">
          Nome do projeto
          <span class="text-xs text-[#717171] font-light">(Obrigatório)</span>
        </label>
        <input v-model="form.name" type="text" id="name" required
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
      </div>

      <div class="mb-6">
        <label for="client" class="block mb-2 text-sm font-medium text-[#695CCD]">
          Cliente
          <span class="text-xs text-[#717171] font-light">(Obrigatório)</span>
        </label>
        <input v-model="form.client" type="text" id="client" required
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
      </div>

      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="startDate" class="block mb-2 text-sm font-medium text-[#695CCD]">
            Data de Início
            <span class="text-xs text-[#717171] font-light">(Obrigatório)</span>
          </label>
          <input v-model="form.startDate" type="date" id="startDate" required
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
        </div>
        <div>
          <label for="endDate" class="block mb-2 text-sm font-medium text-[#695CCD]">
            Data Final
            <span class="text-xs text-[#717171] font-light">(Obrigatório)</span>
          </label>
          <input v-model="form.endDate" type="date" id="endDate" required
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
        </div>
      </div>

      <ProjectImageUpload :image-preview="imagePreview" @upload="(event) => handleImageUpload(event)"
        @remove="removeImage" />

      <button :disabled="!isFormValid || loading" class="text-white py-2 rounded-full mt-10"
        :class="[isFormValid ? 'bg-[#695CCD] hover:bg-[#5648B0]' : 'bg-[#B2A8FF]']" type="submit">
        {{ loading ? 'Salvando...' : 'Salvar projeto' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import ProjectFormHeader from '../components/ProjectFormHeader.vue';
import ProjectImageUpload from '../components/ProjectImageUpload.vue';
import { useProjectForm } from '../composables/useProjectForm';
import { useProjectImage } from '../composables/useProjectImage';

const route = useRoute();
const { form, isEditing, loading, isFormValid, handleSubmit, loadProject } = useProjectForm();
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
