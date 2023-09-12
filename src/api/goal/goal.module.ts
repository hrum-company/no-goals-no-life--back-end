import { Module } from '@nestjs/common'
import { GoalController } from './goal.controller'
import { GoalService } from './goal.service'
import { PrismaService } from '../_services/prisma.service'
import { BookService } from '../book/book.service'

@Module({
  controllers: [GoalController],
  providers: [PrismaService, GoalService, BookService],
})
export class GoalModule {}
