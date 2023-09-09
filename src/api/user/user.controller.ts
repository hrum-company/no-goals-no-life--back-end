import { Controller, Get, Request } from '@nestjs/common'
import { User } from './user.interface'
import { PrismaService } from '../_services/prisma.service'

@Controller('api/user')
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('me')
  async me(@Request() req): Promise<User> {
    return req.user
  }
}
