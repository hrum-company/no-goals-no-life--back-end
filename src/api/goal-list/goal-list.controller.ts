import { Controller, Get, Param } from '@nestjs/common'
import { GoalList } from './goal-list.interface'

@Controller('api/goal-list')
export class GoalListController {
  @Get()
  findAll(): GoalList[] {
    return [
      {
        id: 1,
        userId: 1,
        name: 'Список мечты',
        hidden: false,
      },
    ]
  }

  @Get('/:id')
  findOne(@Param('id') id: number): GoalList {
    return {
      id,
      userId: 1,
      name: 'Список мечты',
      hidden: false,
      goals: [],
    }
  }
}
