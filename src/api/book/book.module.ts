import { PrismaService } from '../_services/prisma.service'
import { Module } from '@nestjs/common'
import { BookController } from './book.controller'
import { BookService } from './book.service'

@Module({
  controllers: [BookController],
  providers: [BookService, PrismaService],
  exports: [BookService],
})
export class BookModule {}
