import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '../stores/projectStore'
import type { Project } from '../types/Project'

interface FormData {
  name: string
  client: string
  startDate: string
  endDate: string
  coverImage: string
}

interface FormErrors {
  name?: string
  client?: string
  startDate?: string
  endDate?: string
}

export function useProjectForm() {
  const route = useRoute()
  const router = useRouter()
  const store = useProjectStore()

  const isEditing = ref(false)
  const loading = ref(false)
  const form = ref<FormData>({
    name: '',
    client: '',
    startDate: '',
    endDate: '',
    coverImage: '',
  })
  const errors = ref<FormErrors>({})

  function validateForm(): boolean {
    errors.value = {}

    // Validação do nome do projeto (pelo menos duas palavras)
    const nameWords = form.value.name.trim().split(/\s+/)
    if (nameWords.length < 2) {
      errors.value.name = 'Por favor, digite ao menos duas palavras'
    }

    // Validação do cliente (pelo menos uma palavra)
    if (!form.value.client.trim()) {
      errors.value.client = 'Por favor, digite ao menos uma palavra'
    }

    // Validação da data de início
    if (!form.value.startDate) {
      errors.value.startDate = 'Selecione uma data válida'
    }

    // Validação da data final
    if (!form.value.endDate) {
      errors.value.endDate = 'Selecione uma data válida'
    }

    // Validação adicional para datas
    if (
      form.value.startDate &&
      form.value.endDate &&
      new Date(form.value.startDate) > new Date(form.value.endDate)
    ) {
      errors.value.endDate = 'Data final deve ser posterior à data de início'
    }

    return Object.keys(errors.value).length === 0
  }

  async function handleSubmit() {
    validateForm()
    if (Object.keys(errors.value).length > 0) return

    loading.value = true
    try {
      if (isEditing.value) {
        await store.updateProject({
          id: route.params.id,
          ...form.value,
          isFavorite: false,
        } as Project)
      } else {
        await store.createProject(form.value)
      }
      router.push('/')
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      loading.value = false
    }
  }

  async function loadProject() {
    const projectId = route.params.id
    if (projectId) {
      const project = await store.fetchProjectById(projectId)
      if (project) {
        form.value = {
          name: project.name,
          client: project.client,
          startDate: project.startDate,
          endDate: project.endDate,
          coverImage: project.coverImage || '',
        }
      }
      isEditing.value = true
    }
  }

  return {
    form,
    errors,
    isEditing,
    loading,
    handleSubmit,
    loadProject,
  }
}
