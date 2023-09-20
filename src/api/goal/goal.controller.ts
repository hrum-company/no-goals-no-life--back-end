import { GoalService } from './goal.service'
import { Body, Controller, Param, Post, Get, Put, UseGuards } from '@nestjs/common'
import { Goal } from '@prisma/client'
import { BookGuard } from '../book/book.guard'

interface CreateGoalRequest {
  markId?: number
  name: string
  description?: string
}
interface EditGoalRequest {
  markId?: number
  description?: string
}

@Controller('api/book/:bookId/goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post('')
  @UseGuards(BookGuard)
  async create(@Param('bookId') bookId: number, @Body() body: CreateGoalRequest): Promise<Goal> {
    return await this.goalService.create(bookId, {
      ...body,
    })
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
    return await this.goalService.update(id, bookId, {
      ...body,
    })
  }

  @Put('/:id/complete')
  @UseGuards(BookGuard)
  async complete(@Param('bookId') bookId: number, @Param('id') id: number): Promise<Goal> {
    return await this.goalService.complete(Number(bookId), Number(id))
  }
}
