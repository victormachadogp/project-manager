import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { createTestingPinia } from '@pinia/testing'
import { useProjectStore } from '@/stores/projectStore'
import type { Project, ProjectSortOption } from '@/types/Project'
import { nextTick } from 'vue'

// Definindo a interface para o store
interface ProjectStore {
  projects: Project[]
  searchQuery: string
  fetchProjects: () => Promise<void>
  deleteProject: (id: number) => Promise<void>
}

// Definindo a interface para o componente
interface HomeViewInstance {
  showOnlyFavorites: boolean
  sortBy: ProjectSortOption
  showDeleteModal: boolean
  projectToDelete: Project | null
  filteredProjects: Project[]
  handleDeleteProject: () => Promise<void>
  closeDeleteModal: () => void
}

// Mock dos componentes
vi.mock('@/components/TheHeader.vue', () => ({
  default: {
    name: 'TheHeader',
    template: '<div data-testid="header"></div>',
  },
}))

vi.mock('@/components/ProjectCard.vue', () => ({
  default: {
    name: 'ProjectCard',
    template: '<div data-testid="project-card"><slot></slot></div>',
    props: ['project'],
  },
}))

// Mock de dados
const mockProjects: Project[] = [
  {
    id: 1,
    name: 'Projeto A',
    client: 'Cliente 1',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    coverImage: '',
    isFavorite: true,
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    name: 'Projeto B',
    client: 'Cliente 2',
    startDate: '2024-02-01',
    endDate: '2024-11-30',
    coverImage: '',
    isFavorite: false,
    createdAt: '2024-01-02',
  },
]

// Configuração Router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/project', component: { template: '<div></div>' } },
    { path: '/project/:id', component: { template: '<div></div>' } },
  ],
})

describe('HomeView', () => {
  let wrapper: VueWrapper<HomeViewInstance>
  let store: ProjectStore

  beforeEach(() => {
    wrapper = mount(HomeView, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              project: {
                projects: mockProjects,
                searchQuery: '',
              },
            },
          }),
        ],
        stubs: {
          TheHeader: true,
          ProjectCard: true,
          ModalBase: true,
          ProjectFilters: true,
        },
      },
    }) as VueWrapper<HomeViewInstance>

    store = useProjectStore() as unknown as ProjectStore
  })

  it('inicializa os projetos ao montar o componente', () => {
    expect(store.fetchProjects).toHaveBeenCalled()
  })

  it('renderiza a mensagem de nenhum projeto quando não há projetos', async () => {
    store.projects = []
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Nenhum Projeto')
    expect(wrapper.text()).toContain('Clique no botão abaixo para criar o primeiro e gerenciá-lo')
  })

  it('renderiza a lista de projetos quando existem projetos', () => {
    const projectCards = wrapper.findAllComponents({ name: 'ProjectCard' })
    expect(projectCards).toHaveLength(mockProjects.length)
  })

  it('mostra o número correto de projetos', () => {
    expect(wrapper.text()).toContain(`(${mockProjects.length})`)
  })

  it('ordena alfabeticamente por padrão', async () => {
    const projectCards = wrapper.findAllComponents({ name: 'ProjectCard' })
    const firstProject = projectCards[0].props('project') as Project
    const secondProject = projectCards[1].props('project') as Project

    expect(firstProject.name.localeCompare(secondProject.name)).toBeLessThanOrEqual(0)
  })

  it('abre o modal para excluir ao receber evento delete do ProjectCard', async () => {
    const projectCard = wrapper.findComponent({ name: 'ProjectCard' })
    await projectCard.vm.$emit('delete', mockProjects[0])
    expect(wrapper.vm.showDeleteModal).toBe(true)
    expect(wrapper.vm.projectToDelete).toEqual(mockProjects[0])
  })

  it('deleta o projeto quando confirmado no modal', async () => {
    wrapper.vm.projectToDelete = mockProjects[0]
    wrapper.vm.showDeleteModal = true
    await wrapper.vm.handleDeleteProject()

    expect(store.deleteProject).toHaveBeenCalledWith(mockProjects[0].id)
    expect(wrapper.vm.showDeleteModal).toBe(false)
    expect(wrapper.vm.projectToDelete).toBe(null)
  })

  it('fecha o modal sem deletar o projeto', async () => {
    wrapper.vm.projectToDelete = mockProjects[0]
    wrapper.vm.showDeleteModal = true
    await wrapper.vm.closeDeleteModal()

    expect(store.deleteProject).not.toHaveBeenCalled()
    expect(wrapper.vm.showDeleteModal).toBe(false)
    expect(wrapper.vm.projectToDelete).toBe(null)
  })

  describe('Ordenação de projetos', () => {
    it('ordena por data de início', async () => {
      const projectFilters = wrapper.findComponent({ name: 'ProjectFilters' })
      await projectFilters.vm.$emit('update:sortOption', 'startDate')
      await nextTick()

      const projectCards = wrapper.findAllComponents({ name: 'ProjectCard' })
      const firstProject = projectCards[0].props('project')
      const secondProject = projectCards[1].props('project')

      expect(new Date(firstProject.startDate).getTime()).toBeGreaterThan(
        new Date(secondProject.startDate).getTime(),
      )
    })

    it('ordena por data de término', async () => {
      const projectFilters = wrapper.findComponent({ name: 'ProjectFilters' })
      await projectFilters.vm.$emit('update:sortOption', 'endDate')
      await nextTick()

      const projectCards = wrapper.findAllComponents({ name: 'ProjectCard' })
      const firstProject = projectCards[0].props('project') as Project
      const secondProject = projectCards[1].props('project') as Project

      const firstDate = new Date(firstProject.endDate).getTime()
      const secondDate = new Date(secondProject.endDate).getTime()
      expect(firstDate).toBeLessThan(secondDate)
    })

    it('ordena alfabeticamente por padrão', async () => {
      const projectFilters = wrapper.findComponent({ name: 'ProjectFilters' })
      await projectFilters.vm.$emit('update:sortOption', 'alphabetical')
      await nextTick()

      const projectCards = wrapper.findAllComponents({ name: 'ProjectCard' })
      const firstProject = projectCards[0].props('project')
      const secondProject = projectCards[1].props('project')

      expect(firstProject.name < secondProject.name).toBe(true)
    })
  })

  describe('Responsividade', () => {
    it('aplica classes responsivas corretas', () => {
      const mainElement = wrapper.find('main')
      expect(mainElement.classes()).toContain('flex')
      expect(mainElement.classes()).toContain('justify-center')

      const gridContainer = wrapper.find('.grid')
      expect(gridContainer.classes()).toContain('grid-cols-1')
      expect(gridContainer.classes()).toContain('sm:grid-cols-2')
      expect(gridContainer.classes()).toContain('xl:grid-cols-4')
    })
  })
})
