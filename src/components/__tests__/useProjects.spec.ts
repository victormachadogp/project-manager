import { describe, it, expect, beforeEach } from 'vitest'
import { useProjects } from '@/composables/useProjects'
import { createPinia, setActivePinia } from 'pinia'

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

  it('lida corretamente da exclusão de projetos', async () => {
    const { handleDeleteProject, projectToDelete, showDeleteModal } = useProjects()

    projectToDelete.value = {
      id: 1,
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

    expect(showDeleteModal.value).toBe(false)
    expect(projectToDelete.value).toBeNull()
  })
})
