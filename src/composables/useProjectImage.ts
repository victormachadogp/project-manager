import { ref, watch } from 'vue'
import { imageApi } from '../services/imageApi'

export function useProjectImage(form: { value: { coverImage: string } }) {
  const imagePreview = ref<string>(form.value.coverImage)

  watch(
    () => form.value.coverImage,
    (newValue) => {
      imagePreview.value = newValue
    },
  )

  async function handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      const file = input.files[0]

      if (!file.type.match(/image\/(jpeg|png)/)) {
        alert('Por favor, selecione apenas imagens JPG ou PNG')
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB')
        return
      }

      try {
        const imagePath = await imageApi.upload(file)
        imagePreview.value = imagePath
        form.value.coverImage = imagePath
      } catch (error) {
        console.error('Erro ao fazer upload:', error)
        alert('Erro ao fazer upload da imagem. Tente novamente.')
      }
    }
  }

  async function removeImage() {
    if (form.value.coverImage) {
      try {
        await imageApi.delete(form.value.coverImage)
        imagePreview.value = ''
        form.value.coverImage = ''

        const fileInput = document.getElementById('coverImage') as HTMLInputElement
        if (fileInput) {
          fileInput.value = ''
        }
      } catch (error) {
        console.error('Erro ao deletar imagem:', error)
        alert('Erro ao remover a imagem. Tente novamente.')
      }
    }
  }

  return {
    imagePreview,
    handleImageUpload,
    removeImage,
  }
}
