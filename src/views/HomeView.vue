<template>
  <div>
    <TheHeader />
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

          <ProjectFilters v-model:showFavorites="showOnlyFavorites" v-model:sortOption="sortBy" />
          <RouterLink to="/project" class="bg-[#695CCD] text-white p-5 py-3 rounded-full">
            Novo Projeto
          </RouterLink>
        </div>


        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-5">
          <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project"
            @delete="openDeleteModal(project)" />
        </div>
      </div>

      <ModalBase v-if="showDeleteModal" :project="projectToDelete" @confirm="handleDeleteProject"
        @close="closeDeleteModal" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import ModalBase from '@/components/ModalBase.vue'
import TheHeader from '@/components/TheHeader.vue'
import ProjectFilters from '@/components/filters/ProjectFilters.vue'
import { useProjects } from '@/composables/useProjects'

const {
  projects,
  filteredProjects,
  showDeleteModal,
  projectToDelete,
  showOnlyFavorites,
  sortBy,
  handleDeleteProject,
  initializeProjects,
  openDeleteModal,
  closeDeleteModal
} = useProjects()

onMounted(() => {
  initializeProjects()
})
</script>