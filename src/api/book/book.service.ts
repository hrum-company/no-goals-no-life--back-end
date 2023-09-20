import { Injectable } from '@nestjs/common'
import { PrismaService } from '../_services/prisma.service'
import { User } from '@prisma/client'

@Injectable()
export class BookService {
  constructor(private readonly prismaService: PrismaService) {}

  async canEdit(userId: number, id: number) {
    return !!(await this.prismaService.book.count({ where: { userId, id } }))
  }

  async canCreate(user: User) {
    const books = await this.prismaService.book.findMany({
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

    return books.every((list) => list._count.goals === 100)
  }

  async getCount(user: User) {
    return await this.prismaService.book.count({
      where: {
        userId: user.id,
      },
    })
  }

  async create(user: User) {
    return await this.prismaService.book.create({
      data: { name: '100 жизненных целей', userId: user.id, hidden: false },
    })
  }

  async findAll(user: User) {
    return await this.prismaService.book.findMany({
      include: {
        goals: {
          include: {
            mark: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        _count: {
          select: {
            goals: {
              where: {
                completed: true,
              },
            },
          },
        },
      },
      where: {
        userId: user.id,
      },
    })
  }

  async findOne(id: number) {
    return await this.prismaService.book.findUnique({
      include: {
        goals: {
          include: {
            mark: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        _count: {
          select: {
            goals: {
              where: {
                completed: true,
              },
            },
          },
        },
      },
      where: { id },
    })
  }

  async update(id: number, name: string, hidden: boolean) {
    return await this.prismaService.book.update({
      include: {
        goals: {
          orderBy: {
            order: 'asc',
          },
        },
        _count: {
          select: {
            goals: {
              where: {
                completed: true,
              },
            },
          },
        },
      },
      where: { id },
      data: {
        name,
        hidden,
      },
    })
  }
}
