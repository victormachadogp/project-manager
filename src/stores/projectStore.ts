import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Project } from '../types/project'
import { projectApi } from '@/services/projectApi'

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const searchQuery = ref('')
  const recentSearches = ref<string[]>([])

  const totalProjects = computed(() => projects.value.length)

  function addToRecentSearches(query: string) {
    if (query.length >= 3) {
      recentSearches.value = [
        query,
        ...recentSearches.value.filter((search) => search !== query),
      ].slice(0, 5)

      // Salva no localStorage (Talvez Remover)
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))
    }
  }

  function loadRecentSearches() {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      recentSearches.value = JSON.parse(saved)
    }
  }

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

  async function fetchProjectById(id: string | number) {
    loading.value = true
    try {
      const project = await projectApi.getById(id)
      if (project) {
        return project
      }
    } finally {
      loading.value = false
    }
  }

  async function updateProject(project: Project) {
    await projectApi.update(project)
    const index = projects.value.findIndex((p) => p.id === project.id)
    if (index !== -1) {
      projects.value[index] = project
    }
  }

  async function deleteProject(id: number) {
    await projectApi.delete(id)
    projects.value = projects.value.filter((p) => p.id !== id)
  }

  return {
    projects,
    loading,
    totalProjects,
    searchQuery,
    recentSearches,
    addToRecentSearches,
    loadRecentSearches,
    fetchProjects,
    createProject,
    fetchProjectById,
    updateProject,
    deleteProject,
  }
})
