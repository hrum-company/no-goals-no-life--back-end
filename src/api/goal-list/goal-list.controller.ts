import { Controller, Get, Param, Request } from '@nestjs/common'
import { GoalList, User } from '@prisma/client'
import { GoalListService } from './goal-list.service'

@Controller('api/goal-list')
export class GoalListController {
  constructor(private readonly goalListService: GoalListService) {}

  @Get()
  async findAll(@Request() req): Promise<GoalList[]> {
    const user = req.user as User
    const goalLists = await this.goalListService.findAll(user)

    if (goalLists.length !== 0) {
      return goalLists
    }

    const goalList = await this.goalListService.create(user)

    return [goalList]
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<GoalList> {
    return await this.goalListService.findOne(id)
  }
}
