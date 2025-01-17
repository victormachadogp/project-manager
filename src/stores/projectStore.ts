import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Project } from '../types/project'
import type { ApiError } from '../types/error'
import { projectApi } from '@/services/projectApi'
import { imageApi } from '@/services/imageApi'

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const recentSearches = ref<string[]>([])

  const totalProjects = computed(() => projects.value.length)

  function clearError() {
    error.value = null
  }

  function addToRecentSearches(query: string) {
    if (query.length >= 3) {
      recentSearches.value = [
        query,
        ...recentSearches.value.filter((search) => search !== query),
      ].slice(0, 5)

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
    error.value = null
    try {
      projects.value = await projectApi.getAll()
    } catch (e) {
      const apiError = e as ApiError
      error.value = apiError.message
      projects.value = []
    } finally {
      loading.value = false
    }
  }

  async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'isFavorite'>) {
    error.value = null
    try {
      const newProject = await projectApi.create({
        ...project,
        isFavorite: false,
        createdAt: new Date().toISOString(),
      })
      projects.value.push(newProject)
      return newProject
    } catch (e) {
      const apiError = e as ApiError
      error.value = apiError.message
      throw e
    }
  }

  async function fetchProjectById(id: string) {
    loading.value = true
    error.value = null
    try {
      return await projectApi.getById(id)
    } catch (e) {
      const apiError = e as ApiError
      error.value = apiError.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function updateProject(project: Project) {
    error.value = null
    try {
      const updatedProject = await projectApi.update(project)
      const index = projects.value.findIndex((p) => p.id === project.id)
      if (index !== -1) {
        projects.value[index] = updatedProject
      }
      return updatedProject
    } catch (e) {
      const apiError = e as ApiError
      error.value = apiError.message
      throw e
    }
  }

  async function deleteProject(id: string) {
    error.value = null
    try {
      const project = projects.value.find((p) => p.id === id)

      if (project?.coverImage) {
        // Se existe uma imagem, deleta ela primeiro
        try {
          await imageApi.delete(project.coverImage)
        } catch (imageError) {
          console.error('Erro ao deletar imagem:', imageError)
        }
      }
      // Depois deleta o projeto
      await projectApi.delete(id)
      projects.value = projects.value.filter((p) => p.id !== id)
    } catch (e) {
      const apiError = e as ApiError
      error.value = apiError.message
      throw e
    }
  }

  return {
    projects,
    loading,
    error,
    totalProjects,
    searchQuery,
    recentSearches,
    clearError,
    addToRecentSearches,
    loadRecentSearches,
    fetchProjects,
    createProject,
    fetchProjectById,
    updateProject,
    deleteProject,
  }
})
