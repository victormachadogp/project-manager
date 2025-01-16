import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ModalBase from '@/components/ModalBase.vue'

describe('ModalBase', () => {
  const mockProject = {
    id: 1,
    name: 'Test Project',
    client: 'Test Client',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    coverImage: '',
    isFavorite: false,
    createdAt: '2024-01-01',
  }

  it('deve renderizar o nome do projeto no modal', () => {
    const wrapper = mount(ModalBase, {
      props: {
        project: mockProject,
      },
    })

    expect(wrapper.text()).toContain('Test Project')
  })

  it('deve emitir evento de fechar quando o botão cancelar for clicado', async () => {
    const wrapper = mount(ModalBase, {
      props: {
        project: mockProject,
      },
    })

    await wrapper.find('button:first-child').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('deve emitir evento de confirmação quando o botão confirmar for clicado', async () => {
    const wrapper = mount(ModalBase, {
      props: {
        project: mockProject,
      },
    })

    await wrapper.find('button:last-child').trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })
})
