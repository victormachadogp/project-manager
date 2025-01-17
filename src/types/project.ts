export interface Project {
  id?: string
  name: string
  client: string
  startDate: string
  endDate: string
  coverImage: string
  isFavorite: boolean
  createdAt: string
}

export type ProjectSortOption = 'alphabetical' | 'startDate' | 'endDate'

export interface ProjectFormData {
  id?: string
  name: string
  client: string
  startDate: string
  endDate: string
  coverImage: string
}

export interface ProjectFormErrors {
  name?: string
  client?: string
  startDate?: string
  endDate?: string
}
