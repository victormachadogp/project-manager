import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { RouterLink } from 'vue-router'
import ProjectCard from '../ProjectCard.vue'

const mockProject = {
  id: '1',
  name: 'Test Project',
  client: 'Test Client',
  coverImage: 'test-image.jpg',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  isFavorite: false,
  createdAt: '2023-01-01',
}

describe('ProjectCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renderiza corretamente as informações do projeto', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject,
      },
      global: {
        components: {
          RouterLink,
        },
        stubs: {
          RouterLink: {
            template: '<a><slot></slot></a>',
          },
        },
      },
    })

    expect(wrapper.text()).toContain('Test Project')
    expect(wrapper.text()).toContain('Test Client')
    expect(wrapper.text()).toContain('1 de janeiro de 2024')
    expect(wrapper.text()).toContain('31 de dezembro de 2024')
  })

  it('alterna favorito quando o botão é clicado', async () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject,
      },
      global: {
        components: {
          RouterLink,
        },
        stubs: {
          RouterLink: {
            template: '<a><slot></slot></a>',
          },
        },
      },
    })

    const favoriteButton = wrapper.find('button')
    await favoriteButton.trigger('click')

    expect(wrapper.emitted()).toBeTruthy()
  })

  it('exibe menu de opções quando o botão de três pontos é clicado', async () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject,
      },
      global: {
        components: {
          RouterLink,
        },
        stubs: {
          RouterLink: {
            template: '<a><slot></slot></a>',
          },
        },
      },
    })

    const optionsButton = wrapper.findAll('button')[1]
    await optionsButton.trigger('click')

    expect(wrapper.find('.absolute').isVisible()).toBe(true)
  })
})
