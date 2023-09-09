import { GoalListModule } from './goal-list/goal-list.module'
import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { GoalModule } from './goal/goal.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [AuthModule, UserModule, GoalListModule, GoalModule],
})
export class ApiModule {}
