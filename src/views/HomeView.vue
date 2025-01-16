<template>
  <main class="bg-white m-5 flex justify-center h-screen">
    <div v-if="projects.length === 0" class="flex items-center justify-center flex-col space-y-5 rounded h-screen">
      <h3 class="text-[#1F1283] font-semibold text-2xl">Nenhum Projeto</h3>
      <span class="text-[#717171]">Clique no botão abaixo para criar o primeiro e gerenciá-lo.</span>

      <RouterLink to="/project" class="bg-[#695CCD] text-white px-5 py-3 rounded-full">
        Novo Projeto
      </RouterLink>
    </div>

    <div v-else>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <h3 class="text-2xl">Projetos</h3>
          <span class="text-sm">({{ filteredProjects.length }})</span>
        </div>

        <div class="flex items-center gap-4">
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="showOnlyFavorites" class="sr-only peer">
            <div
              class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#695CCD] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#695CCD]">
            </div>
            <span class="ms-3 text-sm font-medium text-[#717171]">Apenas favoritos</span>
          </label>

          <RouterLink to="/project" class="bg-[#695CCD] text-white p-5 py-3 rounded-full">
            Novo Projeto
          </RouterLink>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-5">
        <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project"
          @delete="showDeleteModal = true; projectToDelete = project" />
      </div>
    </div>

    <ModalBase v-if="showDeleteModal" :project="projectToDelete" @confirm="handleDeleteProject"
      @close="showDeleteModal = false" />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import ProjectCard from '@/components/ProjectCard.vue';
import { useProjectStore } from '../stores/projectStore';
import ModalBase from '../components/ModalBase.vue';
import type { Project } from '../types/Project';

const store = useProjectStore();
const showDeleteModal = ref(false);
const projectToDelete = ref<Project | null>(null);
const showOnlyFavorites = ref(false);

const {
  totalProjects,
  loading
} = store;

async function handleDeleteProject() {
  if (projectToDelete.value) {
    await store.deleteProject(projectToDelete.value.id);
    showDeleteModal.value = false;
    projectToDelete.value = null;
  }
}

const projects = computed(() => store.projects);

const filteredProjects = computed(() => {
  if (showOnlyFavorites.value) {
    return projects.value.filter(project => project.isFavorite);
  }
  return projects.value;
});

onMounted(() => {
  store.fetchProjects();
});
</script>
