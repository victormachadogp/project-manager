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

  const isFormValid = computed(() => {
    return (
      form.value.name &&
      form.value.client &&
      form.value.startDate &&
      form.value.endDate &&
      !Object.keys(errors.value).length
    )
  })

  function validateForm(): boolean {
    errors.value = {}

    if (!form.value.name.trim()) {
      errors.value.name = 'Nome do projeto é obrigatório'
    }

    if (!form.value.client.trim()) {
      errors.value.client = 'Cliente é obrigatório'
    }

    if (!form.value.startDate) {
      errors.value.startDate = 'Data de início é obrigatória'
    }

    if (!form.value.endDate) {
      errors.value.endDate = 'Data final é obrigatória'
    }

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
    if (!validateForm()) return

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
          coverImage: project.coverImage || '', // Garante que sempre terá um valor, mesmo que vazio
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
    isFormValid,
    handleSubmit,
    loadProject,
  }
}
