import { GoalService } from './goal.service'
import { Body, Controller, Param, Post, Get, Put, UseGuards } from '@nestjs/common'
import { Goal } from '@prisma/client'
import { BookGuard } from '../book/book.guard'

interface CreateGoalRequest {
  name: string
  description: string
}
interface EditGoalRequest {
  description: string
}

@Controller('api/book/:bookId/goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post('')
  @UseGuards(BookGuard)
  async create(@Param('bookId') bookId: number, @Body() body: CreateGoalRequest): Promise<Goal> {
    return await this.goalService.create(Number(bookId), body.name, body.description)
  }

  @Get('/:id')
  async findOne(@Param('bookId') bookId: number, @Param('id') id: number): Promise<Goal> {
    return await this.goalService.findOne(Number(bookId), Number(id))
  }

  @Put('/:id')
  @UseGuards(BookGuard)
  async edit(
    @Param('bookId') bookId: number,
    @Param('id') id: number,
    @Body() body: EditGoalRequest
  ): Promise<Goal> {
    return await this.goalService.update(Number(bookId), Number(id), body.description)
  }

  @Put('/:id/complete')
  @UseGuards(BookGuard)
  async complete(@Param('bookId') bookId: number, @Param('id') id: number): Promise<Goal> {
    return await this.goalService.complete(Number(bookId), Number(id))
  }
}
