import { Controller, Get } from '@nestjs/common'
import { User } from './user.interface'
import { PrismaService } from '../_services/prisma.service'

@Controller('api/user')
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('me')
  async me(): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        vkId: 1,
      },
    })

    return user
  }
}
