<template>
  <main class="bg-white m-5 flex justify-center h-screen">
    <div v-if="projects.length === 0" class="flex items-center justify-center flex-col space-y-5 rounded h-screen">
      <h3 class="text-[#1F1283] font-semibold text-2xl">Nenhum Projeto</h3>
      <span class="text-[#717171]">Clique no botão abaixo para criar o primeiro e gerenciá-lo.</span>

      <RouterLink to="/project/new" class="bg-[#695CCD] text-white px-5 py-3 rounded-full">
        Novo Projeto
      </RouterLink>
    </div>

    <div v-else>
      <RouterLink to="/project/new" class="bg-[#695CCD] text-white p-5 py-3 rounded-full">
        Novo Projeto
      </RouterLink>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-5">
        <ProjectCard v-for="project in store.projects" :key="project.id" :project="project" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import ProjectCard from '@/components/ProjectCard.vue';
import { useProjectStore } from '../stores/projectStore';

const store = useProjectStore();

const projects = computed(() => store.projects);

onMounted(() => {
  store.fetchProjects();
});
</script>
