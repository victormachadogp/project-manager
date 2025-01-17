import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '../stores/projectStore'
import type { Project, ProjectFormData, ProjectFormErrors } from '../types/project'

export function useProjectForm() {
  const route = useRoute()
  const router = useRouter()
  const store = useProjectStore()

  const isEditing = ref(false)
  const loading = ref(false)
  const form = ref<ProjectFormData>({
    name: '',
    client: '',
    startDate: '',
    endDate: '',
    coverImage: '',
  })
  const errors = ref<ProjectFormErrors>({})

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
        const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

        await store.updateProject({
          id,
          ...form.value,
          isFavorite: false,
          createdAt: new Date().toISOString(),
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
    if (!projectId) return

    const id = typeof projectId === 'string' ? projectId : projectId[0]
    if (!id) return

    try {
      const projectData = await store.fetchProjectById(id)

      if (projectData) {
        form.value.name = projectData.name
        form.value.client = projectData.client
        form.value.startDate = projectData.startDate
        form.value.endDate = projectData.endDate
        form.value.coverImage = projectData.coverImage

        errors.value.name = ''
        errors.value.client = ''
        errors.value.startDate = ''
        errors.value.endDate = ''
      }
    } catch (error) {
      console.error('Erro ao carregar o projeto:', error)
    } finally {
      loading.value = false
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
