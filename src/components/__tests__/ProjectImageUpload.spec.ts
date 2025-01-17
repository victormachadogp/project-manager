import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectImageUpload from '@/components/ProjectImageUpload.vue'

describe('ProjectImageUpload', () => {
  it('renderiza o componente de upload quando não há preview', () => {
    const wrapper = mount(ProjectImageUpload, {
      props: {
        imagePreview: '',
      },
    })

    expect(wrapper.find('input[type="file"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Escolha uma imagem .jpg ou .png no seu dispositivo')
  })

  it('renderiza a imagem de preview quando há imagePreview', () => {
    const wrapper = mount(ProjectImageUpload, {
      props: {
        imagePreview: 'http://example.com/image.jpg',
      },
    })

    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe('http://example.com/image.jpg')
  })

  it('emite evento de upload quando um arquivo é selecionado', async () => {
    const wrapper = mount(ProjectImageUpload, {
      props: {
        imagePreview: '',
      },
    })

    const input = wrapper.find('input[type="file"]')
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' })

    // Simula a seleção de um arquivo
    Object.defineProperty(input.element, 'files', {
      value: [file],
      writable: false,
    })
    await input.trigger('change')

    // Verifica se o evento foi emitido
    expect(wrapper.emitted('upload')).toBeTruthy()

    // Extrai o evento emitido
    const emittedEvent = wrapper.emitted('upload')![0][0] as Event

    // Valida que o arquivo está no evento emitido
    expect((emittedEvent.target as HTMLInputElement).files![0]).toBe(file)
  })

  it('emite evento de remoção quando o botão de remover é clicado', async () => {
    const wrapper = mount(ProjectImageUpload, {
      props: {
        imagePreview: 'http://example.com/image.jpg',
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('remove')).toBeTruthy()
  })
})
