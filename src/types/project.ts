export interface Project {
  id: number
  name: string
  client: string
  startDate: string
  endDate: string
  coverImage: string
  isFavorite: boolean
  createdAt: string
}

export type ProjectSortOption = 'alphabetical' | 'startDate' | 'endDate'
