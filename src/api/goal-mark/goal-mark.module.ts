import { Module } from '@nestjs/common'
import { GoalMarkController } from './goal-mark.controller'
import { PrismaService } from '../_services/prisma.service'

@Module({
  controllers: [GoalMarkController],
  providers: [PrismaService],
})
export class GoalMarkModule {}
