export interface Goal {
  id: number
  bookId: number

  name: string
  description?: string

  completed: boolean
  createdAt: string
  completedAt?: string
}
