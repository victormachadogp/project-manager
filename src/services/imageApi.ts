const IMAGE_API_URL = 'http://localhost:3001/images'

export const imageApi = {
  async upload(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(`${IMAGE_API_URL}/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const data = await response.json()
    return data.filePath
  },
}
