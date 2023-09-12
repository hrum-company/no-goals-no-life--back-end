import { Controller, Get, Param, Request } from '@nestjs/common'
import { Book, User } from '@prisma/client'
import { BookService } from './book.service'

@Controller('api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(@Request() req): Promise<Book[]> {
    const user = req.user as User
    const books = await this.bookService.findAll(user)

    if (books.length !== 0) {
      return books
    }

    const book = await this.bookService.create(user)

    return [book]
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<Book> {
    return await this.bookService.findOne(id)
  }
}
