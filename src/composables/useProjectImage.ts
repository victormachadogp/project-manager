import { ref, watch } from 'vue'
import { imageApi } from '../services/imageApi'
import type { ApiError } from '../types/error'

export function useProjectImage(form: { value: { coverImage: string } }) {
  const imagePreview = ref<string>(form.value.coverImage)
  const error = ref<string | null>(null)

  watch(
    () => form.value.coverImage,
    (newValue) => {
      imagePreview.value = newValue
    },
  )

  async function handleImageUpload(event: Event) {
    error.value = null
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      const file = input.files[0]

      if (!file.type.match(/image\/(jpeg|png)/)) {
        error.value = 'Por favor, selecione apenas imagens JPG ou PNG'
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        error.value = 'A imagem deve ter no máximo 5MB'
        return
      }

      try {
        const imagePath = await imageApi.upload(file)
        imagePreview.value = imagePath
        form.value.coverImage = imagePath
      } catch (err) {
        const apiError = err as ApiError
        error.value = apiError.message || 'Erro ao fazer upload da imagem. Tente novamente.'
      }
    }
  }

  async function removeImage() {
    error.value = null
    if (form.value.coverImage) {
      try {
        await imageApi.delete(form.value.coverImage)
        imagePreview.value = ''
        form.value.coverImage = ''

        const fileInput = document.getElementById('coverImage') as HTMLInputElement
        if (fileInput) {
          fileInput.value = ''
        }
      } catch (err) {
        const apiError = err as ApiError
        error.value = apiError.message || 'Erro ao remover a imagem. Tente novamente.'
      }
    }
  }

  return {
    imagePreview,
    error,
    handleImageUpload,
    removeImage,
  }
}
