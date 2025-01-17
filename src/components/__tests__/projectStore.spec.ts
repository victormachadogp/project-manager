import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProjectStore } from '@/stores/projectStore'
import { projectApi } from '@/services/projectApi'

// Mock do projectApi
vi.mock('@/services/projectApi', () => ({
  projectApi: {
    getAll: vi.fn(),
    create: vi.fn(),
    getById: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('ProjectStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Limpa o localStorage antes de cada teste
    localStorage.clear()
  })

  it('deve inicializar com valores padrão', () => {
    const store = useProjectStore()
    expect(store.projects).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.searchQuery).toBe('')
    expect(store.recentSearches).toEqual([])
  })

  it('deve adicionar busca recente corretamente', () => {
    const store = useProjectStore()

    store.addToRecentSearches('teste')
    expect(store.recentSearches).toContain('teste')

    // Verifica se foi salvo no localStorage
    const saved = JSON.parse(localStorage.getItem('recentSearches') || '[]')
    expect(saved).toContain('teste')
  })

  it('deve limitar buscas recentes a 5 itens', () => {
    const store = useProjectStore()

    // Adiciona 6 buscas
    ;['Pro', 'Projeto', 'Projec', 'Novo', 'New', 'Projeto 01'].forEach((query) => {
      store.addToRecentSearches(query)
    })

    expect(store.recentSearches.length).toBe(5)
    expect(store.recentSearches[0]).toBe('Projeto 01') // O item mais recente primeiro
  })

  it('deve buscar projetos corretamente', async () => {
    const store = useProjectStore()
    const mockProjects = [
      {
        id: '1',
        name: 'Projeto 1',
        client: 'Cliente 1',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        coverImage: '',
        isFavorite: false,
        createdAt: '2024-01-01',
      },
    ]

    // Mock da resposta da API
    vi.mocked(projectApi.getAll).mockResolvedValue(mockProjects)

    await store.fetchProjects()

    expect(store.projects).toEqual(mockProjects)
    expect(store.loading).toBe(false)
  })

  it('deve criar novo projeto corretamente', async () => {
    const store = useProjectStore()
    const newProject = {
      name: 'Novo Projeto',
      client: 'Novo Cliente',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      coverImage: '',
    }

    const mockResponse = {
      id: '1',
      ...newProject,
      isFavorite: false,
      createdAt: expect.any(String),
    }

    vi.mocked(projectApi.create).mockResolvedValue(mockResponse)

    await store.createProject(newProject)

    expect(store.projects).toEqual(expect.arrayContaining([mockResponse]))
  })

  it('deve atualizar projeto existente', async () => {
    const store = useProjectStore()
    const project = {
      id: '1',
      name: 'Projeto Atualizado',
      client: 'Cliente',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      coverImage: '',
      isFavorite: true,
      createdAt: '2024-01-01',
    }

    // Adiciona um projeto inicial
    store.projects = [{ ...project, name: 'Nome Original' }]

    // Mock da resposta da API
    vi.mocked(projectApi.update).mockResolvedValue(project)

    await store.updateProject(project)

    const updatedProject = store.projects.find((p) => p.id === '1')
    expect(updatedProject?.name).toBe('Projeto Atualizado')
  })

  it('deve deletar projeto corretamente', async () => {
    const store = useProjectStore()
    const projectId = 1
    store.projects = [
      {
        id: projectId,
        name: 'Projeto para Deletar',
        client: 'Cliente',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        coverImage: '',
        isFavorite: false,
        createdAt: '2024-01-01',
      },
    ]

    await store.deleteProject(projectId)

    expect(store.projects.length).toBe(0)
    expect(store.projects.find((p) => p.id === projectId)).toBeUndefined()
  })

  it('deve calcular total de projetos corretamente', () => {
    const store = useProjectStore()
    store.projects = [
      {
        id: '1',
        name: 'P1',
        client: 'C1',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        coverImage: '',
        isFavorite: false,
        createdAt: '2024-01-01',
      },
      {
        id: 2,
        name: 'P2',
        client: 'C2',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        coverImage: '',
        isFavorite: false,
        createdAt: '2024-01-01',
      },
    ]

    expect(store.totalProjects).toBe(2)
  })
})
