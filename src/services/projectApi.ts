import type { Project } from '../types/project'

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

  async getById(id: string | number): Promise<Project> {
    const response = await fetch(`${API_URL}/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch project')
    }
    return response.json()
  },

  async update(project: Project): Promise<Project> {
    const response = await fetch(`${API_URL}/${project.id}`, {
      method: 'PUT',
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
