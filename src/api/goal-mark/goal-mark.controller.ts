import { Controller, Get } from '@nestjs/common'
import { PrismaService } from '../_services/prisma.service'

@Controller('api/goal-mark')
export class GoalMarkController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/')
  async findAll() {
    return await this.prismaService.goalMark.findMany()
  }
}
