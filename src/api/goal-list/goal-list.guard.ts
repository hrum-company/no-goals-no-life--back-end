import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { GoalListService } from './goal-list.service'

@Injectable()
export class GoalListGuard implements CanActivate {
  constructor(private readonly goalListService: GoalListService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    if (!request.params.listId) {
      return false
    }

    const userId = Number(request.user.id)
    const listId = Number(request.params.listId)
    const canEdit = await this.goalListService.canEdit(userId, listId)

    if (!canEdit) {
      return false
    }

    return true
  }
}
