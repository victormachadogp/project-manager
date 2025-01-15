import type { Project } from '../types/Project'

const API_URL = 'http://localhost:3000/projects'

export const projectApi = {
  async getAll(): Promise<Project[]> {
    const response = await fetch(API_URL)
    return response.json()
  },

  async create(project: Omit<Project, 'id'>): Promise<Project> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
    return response.json()
  },

  async delete(id: number): Promise<void> {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
  },
}
