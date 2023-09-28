import { Module } from '@nestjs/common'
import { FriendsBookController } from './friends-book.controller'
import { PrismaService } from '../_services/prisma.service'
import { BookService } from '../book/book.service'

@Module({
  controllers: [FriendsBookController],
  providers: [PrismaService, BookService],
})
export class FriendsBookModule {}
