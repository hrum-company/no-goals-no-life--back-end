import { Body, Controller, Get, Param, Put, Request, UseGuards } from '@nestjs/common'
import { Book, Book as BookModel, User } from '@prisma/client'
import { BookService } from './book.service'
import { BookGuard } from './book.guard'

type WithCompletedGoalsCount<T> = T & {
  completedGoalsCount: number
}

interface EditBookRequest {
  name: string
  hidden: boolean
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

  @Get('/:bookId')
  async findOne(@Param('bookId') id: number): Promise<BookModel> {
    return await this.bookService.findOne(id)
  }

  @Put('/:bookId')
  @UseGuards(BookGuard)
  async edit(
    @Param('bookId') id: number,
    @Body() body: EditBookRequest
  ): Promise<WithCompletedGoalsCount<Book>> {
    const book = await this.bookService.update(Number(id), body.name, body.hidden)
    return {
      ...book,
      completedGoalsCount: book._count.goals,
    }
  }
}
