import { Injectable } from '@nestjs/common'
import { PrismaService } from '../_services/prisma.service'
import { Goal } from '@prisma/client'

type CreateGoalData = Partial<Pick<Goal, 'markId' | 'description'>> & Pick<Goal, 'name'>
type EditGoalData = Partial<Pick<Goal, 'markId' | 'description'>>

@Injectable()
export class GoalService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(bookId: number, { markId, name, description }: CreateGoalData) {
    const goalsCountInBook = await this.prismaService.goal.count({
      where: {
        bookId,
      },
    })

    return await this.prismaService.goal.create({
      data: {
        bookId,
        markId,
        name,
        description,
        completed: false,
        order: goalsCountInBook + 1,
      },
    })
  }

  async findOne(bookId: number, id: number) {
    return await this.prismaService.goal.findUnique({
      where: {
        id,
        bookId,
      },
    })
  }

  async update(id: number, bookId: number, { markId, description }: EditGoalData) {
    return await this.prismaService.goal.update({
      where: {
        bookId,
        id,
      },
      data: {
        markId,
        description,
      },
    })
  }

  async complete(bookId: number, id: number) {
    return await this.prismaService.goal.update({
      where: {
        bookId,
        id,
      },
      data: {
        completed: true,
        completedAt: new Date(),
      },
    })
  }
}
