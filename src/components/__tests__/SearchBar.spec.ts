import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '@/components/SearchBar.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useProjectStore } from '@/stores/projectStore'

describe('SearchBar', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const projectStore = useProjectStore()
    projectStore.recentSearches = ['busca anterior']
  })

  it('deve atualizar o valor do input corretamente', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')

    await input.setValue('test search')
    expect(input.element.value).toBe('test search')
  })

  it('deve mostrar buscas recentes quando o input receber foco', async () => {
    const store = useProjectStore()
    store.recentSearches = ['busca anterior']

    const wrapper = mount(SearchBar)

    await wrapper.find('input').trigger('focus')
    expect(wrapper.text()).toContain('busca anterior')
  })

  it('deve emitir evento de fechar quando o botão fechar for clicado', async () => {
    const wrapper = mount(SearchBar)

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
