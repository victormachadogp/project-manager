<template>
  <main class="bg-white m-5 flex justify-center">
    <div v-if="projects.length === 0" class="flex items-center justify-center flex-col space-y-5 rounded h-screen">
      <h3 class="text-[#1F1283] font-semibold text-2xl">Nenhum Projeto</h3>
      <span class="text-[#717171]">Clique no botão abaixo para criar o primeiro e gerenciá-lo.</span>

      <button class="bg-[#695CCD] text-white px-5 py-3 rounded-full">Novo Projeto</button>
    </div>

    <div v-if="projects.length > 0">
      <ProjectCard />
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProjectCard from '@/components/ProjectCard.vue';

const projects = ref([
  {
    id: 1,
    name: 'Projeto 1',
    client: 'Cliente 1',
    startDate: '2021-10-01',
    endDate: '2021-10-31',
    coverImage: 'https://images.unsplash.com/photo-1634170380004-7b3b3b3b3b3b',
  },
  {
    id: 2,
    name: 'Projeto 2',
    client: 'Cliente 2',
    startDate: '2021-11-01',
    endDate: '2021-11-30',
    coverImage: 'https://images.unsplash.com/photo-1634170380004-7b3b3b3b3b3b',
  },
  {
    id: 3,
    name: 'Projeto 3',
    client: 'Cliente 3',
    startDate: '2021-12-01',
    endDate: '2021-12-31',
    coverImage: 'https://images.unsplash.com/photo-1634170380004-7b3b3b3b3b3b',
  },
]);

</script>
