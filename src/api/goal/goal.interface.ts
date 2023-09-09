export interface Goal {
  id: number
  listId: number

  name: string
  description?: string

  completed: boolean
  createdAt: string
  completedAt?: string
}
