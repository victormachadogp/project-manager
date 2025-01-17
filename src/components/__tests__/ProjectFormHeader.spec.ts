import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import ProjectFormHeader from '@/components/ProjectFormHeader.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
})

describe('ProjectFormHeader', () => {
  it('exibe o título correto para novo projeto', () => {
    const wrapper = mount(ProjectFormHeader, {
      props: {
        isEditing: false,
      },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('Novo Projeto')
  })

  it('exibe o título correto para edição de projeto', () => {
    const wrapper = mount(ProjectFormHeader, {
      props: {
        isEditing: true,
      },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('Editar Projeto')
  })

  it('renderiza o link de voltar', () => {
    const wrapper = mount(ProjectFormHeader, {
      props: {
        isEditing: false,
      },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.text()).toContain('Voltar')
  })
})
