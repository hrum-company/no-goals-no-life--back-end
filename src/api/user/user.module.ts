import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { PrismaService } from '../_services/prisma.service'

@Module({
  controllers: [UserController],
  providers: [PrismaService],
})
export class UserModule {}
