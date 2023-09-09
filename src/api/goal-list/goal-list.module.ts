import { Module } from '@nestjs/common'
import { GoalListController } from './goal-list.controller'

@Module({
  controllers: [GoalListController],
})
export class GoalListModule {}
