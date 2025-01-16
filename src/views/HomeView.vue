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
      <RouterLink to="/project" class="bg-[#695CCD] text-white p-5 py-3 rounded-full">
        Novo Projeto
      </RouterLink>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-5">
        <ProjectCard v-for="project in store.projects" :key="project.id" :project="project"
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


async function handleDeleteProject() {
  if (projectToDelete.value) {
    await store.deleteProject(projectToDelete.value.id);
    showDeleteModal.value = false;
    projectToDelete.value = null;
  }
}

const projects = computed(() => store.projects);

onMounted(() => {
  store.fetchProjects();
});
</script>
