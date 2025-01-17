import type { Project } from '../types/project'
import { ApiError, handleApiError } from './errorHandler'

const API_URL = `${import.meta.env.VITE_API_URL}/projects`

export const projectApi = {
  async getAll(): Promise<Project[]> {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new ApiError('Falha ao carregar os projetos', response.status)
      }
      return response.json()
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async create(project: Omit<Project, 'id'>): Promise<Project> {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      })

      if (!response.ok) {
        throw new ApiError('Falha ao criar o projeto', response.status)
      }

      return response.json()
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async getById(id: string): Promise<Project> {
    // Mudamos para aceitar apenas string
    try {
      const response = await fetch(`${API_URL}/${id}`)
      if (!response.ok) {
        throw new ApiError(`Falha ao buscar o projeto com id ${id}`, response.status)
      }
      return response.json()
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async update(project: Project): Promise<Project> {
    try {
      const response = await fetch(`${API_URL}/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      })

      if (!response.ok) {
        throw new ApiError(`Falha ao atualizar o projeto com id ${project.id}`, response.status)
      }

      return response.json()
    } catch (error) {
      throw handleApiError(error)
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new ApiError(`Falha ao excluir o projeto com id ${id}`, response.status)
      }
    } catch (error) {
      throw handleApiError(error)
    }
  },
}
