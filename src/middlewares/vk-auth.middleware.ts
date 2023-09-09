import { NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

export class VkAuthMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    console.log('---- vk-auth-middleware started ----')

    console.log(request.baseUrl)
    console.log(response.type)

    console.log('---- vk-auth-middleware ended ----')
    next()
  }
}
