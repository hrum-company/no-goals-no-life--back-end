import { Injectable } from '@nestjs/common'
import { PrismaService } from '../_services/prisma.service'

@Injectable()
export class GoalService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(bookId: number, name: string, description: string, completed: boolean = false) {
    return await this.prismaService.goal.create({
      data: {
        bookId,
        name,
        description,
        completed,
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

  async update(bookId: number, id: number, description: string) {
    return await this.prismaService.goal.update({
      where: {
        bookId,
        id,
      },
      data: {
        description,
      },
    })
  }
}
