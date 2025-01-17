import { ref, computed } from 'vue'
import { useProjectStore } from '@/stores/projectStore'
import type { Project, ProjectSortOption } from '@/types/project'

export function useProjects() {
  const store = useProjectStore()
  const showDeleteModal = ref(false)
  const projectToDelete = ref<Project | null>(null)
  const showOnlyFavorites = ref(false)
  const sortBy = ref<ProjectSortOption>('alphabetical')

  const projects = computed(() => store.projects)

  const filteredProjects = computed(() => {
    let result = [...projects.value]

    if (store.searchQuery) {
      const searchLower = store.searchQuery.toLowerCase()
      result = result.filter(
        (project) =>
          project.name.toLowerCase().includes(searchLower) ||
          project.client.toLowerCase().includes(searchLower),
      )
    }

    switch (sortBy.value) {
      case 'alphabetical':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'startDate':
        result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
        break
      case 'endDate':
        result.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
        break
    }

    if (showOnlyFavorites.value) {
      result = result.filter((project) => project.isFavorite)
    }

    return result
  })

  // Actions
  const handleDeleteProject = async () => {
    if (projectToDelete.value) {
      if (projectToDelete.value?.id) {
        await store.deleteProject(projectToDelete.value.id)
      }
      showDeleteModal.value = false
      projectToDelete.value = null
    }
  }

  const initializeProjects = () => {
    store.fetchProjects()
  }

  const openDeleteModal = (project: Project) => {
    projectToDelete.value = project
    showDeleteModal.value = true
  }

  const closeDeleteModal = () => {
    showDeleteModal.value = false
    projectToDelete.value = null
  }

  return {
    // State
    projects,
    filteredProjects,
    showDeleteModal,
    projectToDelete,
    showOnlyFavorites,
    sortBy,

    // Actions
    handleDeleteProject,
    initializeProjects,
    openDeleteModal,
    closeDeleteModal,
  }
}
