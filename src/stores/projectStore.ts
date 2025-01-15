import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Project } from '../types/Project'
import { projectApi } from '@/services/projectApi'

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[]>([])
  const loading = ref(false)

  const totalProjects = computed(() => projects.value.length)

  // Actions
  async function fetchProjects() {
    loading.value = true
    try {
      projects.value = await projectApi.getAll()
    } finally {
      loading.value = false
    }
  }

  async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'isFavorite'>) {
    const newProject = await projectApi.create({
      ...project,
      isFavorite: false,
      createdAt: new Date().toISOString(),
    })
    projects.value.push(newProject)
  }

  async function deleteProject(id: number) {
    await projectApi.delete(id)
    projects.value = projects.value.filter((p) => p.id !== id)
  }

  return {
    projects,
    loading,
    totalProjects,
    fetchProjects,
    createProject,
    deleteProject,
  }
})
