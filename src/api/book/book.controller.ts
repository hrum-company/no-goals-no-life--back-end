import { Controller, Get, Param, Request } from '@nestjs/common'
import { Book, Book as BookModel, User } from '@prisma/client'
import { BookService } from './book.service'

type WithCompletedGoalsCount<T> = T & {
  completedGoalsCount: number
}

@Controller('api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(@Request() req): Promise<WithCompletedGoalsCount<Book>[]> {
    const user = req.user as User

    const booksCount = await this.bookService.getCount(user)

    if (booksCount === 0) {
      await this.bookService.create(user)
    }

    const books = await this.bookService.findAll(user)

    return books.map(({ _count: count, ...book }) => ({
      ...book,
      completedGoalsCount: count.goals,
    }))
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<BookModel> {
    return await this.bookService.findOne(id)
  }
}
