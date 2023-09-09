import { GoalListModule } from './goal-list/goal-list.module'
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { VkAuthMiddleware } from 'src/middlewares/vk-auth.middleware'
import { UserModule } from './user/user.module'
import { GoalModule } from './goal/goal.module'

@Module({
  imports: [UserModule, GoalListModule, GoalModule],
  controllers: [],
  providers: [],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VkAuthMiddleware)
  }
}
