import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { GoalModule } from './goal/goal.module'
import { AuthModule } from './auth/auth.module'
import { BookModule } from './book/book.module'

@Module({
  imports: [AuthModule, UserModule, BookModule, GoalModule],
})
export class ApiModule {}
