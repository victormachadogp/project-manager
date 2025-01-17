import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useProjects } from '@/composables/useProjects'
import { createPinia, setActivePinia } from 'pinia'
import { useProjectStore } from '@/stores/projectStore'

describe('useProjects', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('inicializa com lista de projetos vazia', () => {
    const { projects } = useProjects()
    expect(projects.value).toEqual([])
  })

  it('filtra corretamente os projetos favoritos', () => {
    const { filteredProjects, showOnlyFavorites } = useProjects()

    showOnlyFavorites.value = true
    expect(filteredProjects.value).toEqual([])
  })

  it('lida corretamente com a exclusão de projetos', async () => {
    const store = useProjectStore()
    // Mock do método deleteProject do store
    vi.spyOn(store, 'deleteProject').mockResolvedValue()

    const { handleDeleteProject, projectToDelete, showDeleteModal } = useProjects()

    projectToDelete.value = {
      id: '1', // Agora como string
      name: 'Test Project',
      client: 'Test Client',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      coverImage: '',
      isFavorite: false,
      createdAt: '2024-01-01',
    }

    showDeleteModal.value = true
    await handleDeleteProject()

    expect(store.deleteProject).toHaveBeenCalledWith('1')
    expect(showDeleteModal.value).toBe(false)
    expect(projectToDelete.value).toBeNull()
  })
})
