import { Controller, Get } from '@nestjs/common'
import { User } from './user.interface'

@Controller('api/user')
export class UserController {
  @Get('me')
  me(): User {
    return {
      id: 1,
      vkId: 1,
      firstName: 'Денис',
      lastName: 'Джабаров',
    }
  }
}
