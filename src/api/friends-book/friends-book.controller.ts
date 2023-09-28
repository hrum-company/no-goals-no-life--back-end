import { Controller, Get } from '@nestjs/common'
import { Book, User } from '@prisma/client'
import { PrismaService } from '../_services/prisma.service'
import { BookService } from '../book/book.service'

type WithCompletedGoalsCount<T> = T & {
  completedGoalsCount: number
}

interface FriendsBook {
  user: User
  book: WithCompletedGoalsCount<Book>
}

@Controller('api/friends-book')
export class FriendsBookController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bookService: BookService
  ) {}

  @Get('/')
  async findAll(): Promise<FriendsBook[]> {
    const users = await this.prismaService.user.findMany()

    let friendsBooks: FriendsBook[] = []

    for (const user of users) {
      const books = await this.bookService.findAll(user)

      const normalizedBooks = books.map(({ _count: count, ...book }) => ({
        ...book,
        completedGoalsCount: count.goals,
      }))

      const currentFriendsBooks: FriendsBook[] = normalizedBooks.map((book) => ({
        book,
        user,
      }))

      friendsBooks = friendsBooks.concat(currentFriendsBooks)
    }

    return friendsBooks
  }
}
