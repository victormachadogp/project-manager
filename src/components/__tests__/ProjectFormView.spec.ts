import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import ProjectFormView from '@/views/ProjectFormView.vue'
import { createPinia, setActivePinia } from 'pinia'

// Mock dos componentes filhos
vi.mock('../components/ProjectFormHeader.vue', () => ({
  default: {
    name: 'ProjectFormHeader',
    template: '<div></div>',
    props: ['isEditing'],
  },
}))

vi.mock('../components/ProjectImageUpload.vue', () => ({
  default: {
    name: 'ProjectImageUpload',
    template: '<div></div>',
    props: ['imagePreview'],
  },
}))

// Mock do useRoute
vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRoute: () => ({
      params: { id: undefined },
    }),
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/projects/:id', component: ProjectFormView },
  ],
})

describe('ProjectFormView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renderiza o formulário corretamente', () => {
    const wrapper = mount(ProjectFormView, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('#name').exists()).toBe(true)
    expect(wrapper.find('#client').exists()).toBe(true)
    expect(wrapper.find('#startDate').exists()).toBe(true)
    expect(wrapper.find('#endDate').exists()).toBe(true)
  })
  it('exibe mensagens de erro quando o formulário é submetido com campos vazios', async () => {
    const wrapper = mount(ProjectFormView, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.find('form').trigger('submit')

    expect(wrapper.text()).toContain('Por favor, digite ao menos duas palavras')
    expect(wrapper.text()).toContain('Por favor, digite ao menos uma palavra')
    expect(wrapper.text()).toContain('Selecione uma data válida')
  })

  it('valida corretamente o nome do projeto', async () => {
    const wrapper = mount(ProjectFormView, {
      global: {
        plugins: [router],
      },
    })

    const nameInput = wrapper.find('#name')
    await nameInput.setValue('Projeto') // Uma palavra apenas
    await wrapper.find('form').trigger('submit')
    expect(wrapper.text()).toContain('Por favor, digite ao menos duas palavras')

    await nameInput.setValue('Projeto Teste') // Duas palavras
    await wrapper.find('form').trigger('submit')
    expect(wrapper.text()).not.toContain('Por favor, digite ao menos duas palavras')
  })

  it('valida datas corretamente', async () => {
    const wrapper = mount(ProjectFormView, {
      global: {
        plugins: [router],
      },
    })

    const startDateInput = wrapper.find('#startDate')
    const endDateInput = wrapper.find('#endDate')

    await startDateInput.setValue('2024-02-01')
    await endDateInput.setValue('2024-01-01')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.text()).toContain('Data final deve ser posterior à data de início')
  })
})
