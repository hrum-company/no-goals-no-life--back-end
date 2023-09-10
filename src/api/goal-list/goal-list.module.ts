import { PrismaService } from './../_services/prisma.service'
import { Module } from '@nestjs/common'
import { GoalListController } from './goal-list.controller'
import { GoalListService } from './goal-list.service'

@Module({
  controllers: [GoalListController],
  providers: [GoalListService, PrismaService],
  exports: [GoalListService],
})
export class GoalListModule {}
