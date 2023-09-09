import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { PrismaService } from '../_services/prisma.service'
import { AuthService } from '../auth/auth.service'

@Module({
  controllers: [UserController],
  providers: [AuthService, PrismaService],
})
export class UserModule {}
