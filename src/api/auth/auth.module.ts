import { Module, Global } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { PrismaService } from '../_services/prisma.service'

@Global()
@Module({
  providers: [
    PrismaService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
