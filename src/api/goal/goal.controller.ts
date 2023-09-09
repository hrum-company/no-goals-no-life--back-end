import { Controller, Get, Param } from '@nestjs/common'
import { Goal } from './goal.interface'

@Controller('api/goal-list/:listId/goal')
export class GoalController {
  @Get()
  getAll(@Param('listId') listId: number): Goal[] {
    return [
      {
        id: 1,
        listId,
        name: 'Сделать приложение: No Goals No Life',
        description: '',
        completed: false,
        createdAt: '',
        completedAt: '',
      },
    ]
  }

  @Get('/:id')
  getOne(@Param('listId') listId: number, @Param('id') id: number): Goal {
    return {
      id,
      listId,
      name: 'Сделать приложение: No Goals No Life',
      description: '',
      completed: false,
      createdAt: '',
      completedAt: '',
    }
  }
}
