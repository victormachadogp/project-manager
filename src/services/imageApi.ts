import { ApiError, handleApiError } from './errorHandler'

const IMAGE_API_URL = import.meta.env.VITE_IMAGE_API_URL || 'http://localhost:3001/images'

export const imageApi = {
  async upload(file: File): Promise<string> {
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(`${IMAGE_API_URL}/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new ApiError('Failed to upload image', response.status)
      }

      const data = await response.json()
      return data.filePath
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async delete(imagePath: string): Promise<void> {
    try {
      const response = await fetch(`${IMAGE_API_URL}/delete?path=${imagePath}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new ApiError('Failed to delete image', response.status)
      }
    } catch (error) {
      throw handleApiError(error)
    }
  },
}
