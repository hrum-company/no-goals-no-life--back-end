import { Module } from '@nestjs/common'
import { GoalController } from './goal.controller'
import { GoalService } from './goal.service'
import { GoalListService } from '../goal-list/goal-list.service'
import { PrismaService } from '../_services/prisma.service'

@Module({
  controllers: [GoalController],
  providers: [PrismaService, GoalService, GoalListService],
})
export class GoalModule {}
