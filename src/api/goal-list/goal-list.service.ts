import { Injectable } from '@nestjs/common'
import { PrismaService } from '../_services/prisma.service'
import { User } from '@prisma/client'

@Injectable()
export class GoalListService {
  constructor(private readonly prismaService: PrismaService) {}

  async canEdit(userId: number, id: number) {
    return !!(await this.prismaService.goalList.count({ where: { userId, id } }))
  }

  async canCreate(user: User) {
    const lists = await this.prismaService.goalList.findMany({
      include: {
        _count: {
          select: {
            goals: true,
          },
        },
      },
      where: {
        userId: user.id,
      },
    })

    return lists.every((list) => list._count.goals === 100)
  }

  async getCount(user: User) {
    return await this.prismaService.goalList.count({
      where: {
        userId: user.id,
      },
    })
  }

  async create(user: User) {
    const goalList = await this.prismaService.goalList.create({
      data: { name: '100 жизненных целей', userId: user.id, hidden: false },
    })

    return goalList
  }

  async findAll(user: User) {
    return await this.prismaService.goalList.findMany({
      include: {
        goals: true,
      },
      where: {
        userId: user.id,
      },
    })
  }

  async findOne(id: number) {
    return await this.prismaService.goalList.findUnique({
      where: { id },
    })
  }
}
