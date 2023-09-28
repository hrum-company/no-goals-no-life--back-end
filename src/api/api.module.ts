import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { GoalModule } from './goal/goal.module'
import { AuthModule } from './auth/auth.module'
import { BookModule } from './book/book.module'
import { GoalMarkModule } from './goal-mark/goal-mark.module'
import { FriendsBookModule } from './friends-book/friends-book.module'

@Module({
  imports: [AuthModule, UserModule, BookModule, GoalModule, GoalMarkModule, FriendsBookModule],
})
export class ApiModule {}
