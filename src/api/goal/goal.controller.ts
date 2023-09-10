import { GoalService } from './goal.service'
import { Body, Controller, Param, Post, Get, Put, UseGuards } from '@nestjs/common'
import { Goal } from '@prisma/client'
import { GoalListService } from '../goal-list/goal-list.service'
import { GoalListGuard } from '../goal-list/goal-list.guard'

interface CreateGoalRequest {
  name: string
  description: string
}
interface EditGoalRequest {
  description: string
}

@Controller('api/goal-list/:listId/goal')
export class GoalController {
  constructor(
    private readonly goalListService: GoalListService,
    private readonly goalService: GoalService
  ) {}

  @Post('')
  @UseGuards(GoalListGuard)
  async create(@Param('listId') listId: number, @Body() body: CreateGoalRequest): Promise<Goal> {
    return await this.goalService.create(Number(listId), body.name, body.description)
  }

  @Get('/:id')
  async findOne(@Param('listId') listId: number, @Param('id') id: number): Promise<Goal> {
    return await this.goalService.findOne(Number(listId), Number(id))
  }

  @Put('/:id')
  @UseGuards(GoalListGuard)
  async edit(
    @Param('listId') listId: number,
    @Param('id') id: number,
    @Body() body: EditGoalRequest
  ): Promise<Goal> {
    return await this.goalService.update(Number(listId), Number(id), body.description)
  }
}
