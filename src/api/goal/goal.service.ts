import { Injectable } from '@nestjs/common'
import { PrismaService } from '../_services/prisma.service'

@Injectable()
export class GoalService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(listId: number, name: string, description: string, completed: boolean = false) {
    return await this.prismaService.goal.create({
      data: {
        listId,
        name,
        description,
        completed,
      },
    })
  }

  async findOne(listId: number, id: number) {
    return await this.prismaService.goal.findUnique({
      where: {
        id,
        listId,
      },
    })
  }

  async update(listId: number, id: number, description: string) {
    return await this.prismaService.goal.update({
      where: {
        listId,
        id,
      },
      data: {
        description,
      },
    })
  }
}
