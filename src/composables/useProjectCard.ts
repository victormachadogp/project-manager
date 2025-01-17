// useProjectCard.ts
import { ref } from 'vue'
import type { Project } from '../types/project'
import { useProjectStore } from '../stores/projectStore'
import defaultBackground from '../assets/default-background.png'

export function useProjectCard(initialProject: Project) {
  const store = useProjectStore()
  const showOptions = ref(false)
  const project = ref({ ...initialProject })

  async function toggleFavorite() {
    const updatedProject = {
      ...project.value,
      isFavorite: !project.value.isFavorite,
    }

    // Atualiza o estado local imediatamente
    project.value = updatedProject

    try {
      // Atualiza no store
      await store.updateProject(updatedProject)
    } catch (error) {
      project.value = { ...initialProject }
      console.error('Erro ao atualizar favorito:', error)
    }
  }

  function formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
    const localDate = new Date(date + 'T00:00:00')
    return localDate.toLocaleDateString('pt-BR', options)
  }

  function handleDelete(emit: (event: 'delete') => void) {
    showOptions.value = false
    emit('delete')
  }

  function highlightText(text: string): string {
    if (!store.searchQuery) return text

    const searchTerm = store.searchQuery.toLowerCase()
    const index = text.toLowerCase().indexOf(searchTerm)

    if (index >= 0) {
      const before = text.slice(0, index)
      const match = text.slice(index, index + searchTerm.length)
      const after = text.slice(index + searchTerm.length)
      return `${before}<span class="bg-yellow-200">${match}</span>${after}`
    }

    return text
  }

  function handleImageError(event: Event) {
    const target = event.target as HTMLElement
    target.style.backgroundImage = `url(${defaultBackground})`
  }

  return {
    showOptions,
    defaultBackground,
    toggleFavorite,
    formatDate,
    handleDelete,
    highlightText,
    handleImageError,
    project, // Exporta o ref do projeto
  }
}
