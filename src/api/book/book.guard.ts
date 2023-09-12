import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { BookService } from './book.service'

@Injectable()
export class BookGuard implements CanActivate {
  constructor(private readonly bookService: BookService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    if (!request.params.bookId) {
      return false
    }

    const userId = Number(request.user.id)
    const bookId = Number(request.params.bookId)
    const canEdit = await this.bookService.canEdit(userId, bookId)

    if (!canEdit) {
      return false
    }

    return true
  }
}
