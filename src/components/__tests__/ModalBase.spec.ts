import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ModalBase from '@/components/ModalBase.vue'

describe('ModalBase', () => {
  it('deve renderizar o título do modal corretamente', () => {
    const wrapper = mount(ModalBase, {
      props: {
        title: 'Título do Modal',
      },
    })

    expect(wrapper.find('h3').text()).toBe('Título do Modal')
  })

  it('deve renderizar o conteúdo do slot corretamente', () => {
    const wrapper = mount(ModalBase, {
      props: {
        title: 'Título',
      },
      slots: {
        default: '<p>Conteúdo do Modal</p>',
      },
    })

    expect(wrapper.find('.space-y-4').text()).toBe('Conteúdo do Modal')
  })

  it('deve emitir evento de cancel quando o botão cancelar for clicado', async () => {
    const wrapper = mount(ModalBase, {
      props: {
        title: 'Título',
        showCancelButton: true,
      },
    })

    await wrapper.find('button:first-child').trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('deve emitir evento de confirm quando o botão confirmar for clicado', async () => {
    const wrapper = mount(ModalBase, {
      props: {
        title: 'Título',
      },
    })

    await wrapper.find('button:last-child').trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  it('deve renderizar os textos personalizados dos botões', () => {
    const wrapper = mount(ModalBase, {
      props: {
        title: 'Título',
        cancelText: 'Voltar',
        confirmText: 'Salvar',
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0].text()).toBe('Voltar')
    expect(buttons[1].text()).toBe('Salvar')
  })
})
