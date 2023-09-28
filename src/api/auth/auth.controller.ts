import { Body, Controller, Get, Post, Req, HttpStatus, HttpException } from '@nestjs/common'
import { Public } from './auth.decorator'
import { Request } from 'express'

import { AuthService } from './auth.service'
import { PrismaService } from '../_services/prisma.service'
import { JwtService } from '@nestjs/jwt'

interface AuthBody {
  first_name?: string
  last_name?: string
  photo_100?: string
  photo_200?: string
}

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService
  ) {}
  // Авторизация через query-параметры с
  // передачей информации о пользователе
  // и созданием нового jwt токена
  @Public()
  @Post('/')
  async auth(@Req() request: Request, @Body() body: AuthBody) {
    //? Идеальный вариант
    //* Достать query
    //* Запустить AuthService.vkParams
    //* Получить или создать пользователя
    //* Обновить информацию о пользователе
    //* Создать jwt
    //* Вернуть jwt

    //? Нет query
    //* Достать query
    //* Понять, что их нет
    //* Вернуть ошибку

    //? Авторизация не прошла
    //* Достать query
    //* Запустить AuthService.vkParams
    //* Понять, что авторизация не проходит
    //* Вернуть ошибку

    const query = request.query as Record<string, string>
    const secretKey = process.env.VK_SECRET_KEY

    if (!query || !secretKey) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }

    const authed = this.authService.vkParams(query, secretKey)

    if (!authed) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }

    const vkId = Number(query.vk_user_id)

    const userData: AuthBody = {
      first_name: body.first_name,
      last_name: body.last_name,
      photo_100: body.photo_100,
      photo_200: body.photo_200,
    }

    const user = await this.prismaService.user.upsert({
      where: {
        vkId,
      },
      update: {
        ...userData,
      },
      create: {
        vkId,
        ...userData,
      },
    })

    const payload = { id: user.id, vkId: user.vkId }
    const token = await this.jwtService.signAsync(payload)

    return { token, user }
  }

  @Public()
  @Get('/verify')
  async verify(@Req() request: Request) {
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })
    } catch {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
