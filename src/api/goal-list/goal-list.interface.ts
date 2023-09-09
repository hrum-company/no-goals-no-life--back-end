import { Goal } from '../goal/goal.interface'

export interface GoalList {
  id: number
  userId: number

  name: string

  hidden: boolean

  goals?: Goal[]
}
