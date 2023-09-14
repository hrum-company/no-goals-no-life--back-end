import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { PrismaService } from '../_services/prisma.service'
import { AuthService } from './auth.service'
import { IS_PUBLIC_KEY } from './auth.decorator'
import { Reflector } from '@nestjs/core'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }

    if (!request.query) {
      return false
    }

    const query = request.query
    const secretKey = process.env.VK_SECRET_KEY

    if (!secretKey) {
      return false
    }

    if (!this.authService.vkParams(query, secretKey)) {
      return false
    }

    const vkId = Number(query.vk_user_id)

    let user = await this.prismaService.user.findUnique({ where: { vkId } })

    if (!user) {
      user = await this.prismaService.user.create({ data: { vkId } })
    }

    request['user'] = user

    return true
  }
}
