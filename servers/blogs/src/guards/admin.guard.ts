import { BadRequestError, NotAuthorizedError } from '@common-kitchen/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from '../entities/user.entity';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const gqlContext = GqlExecutionContext.create(context);
    const req = gqlContext.getContext().req;

    const { role } = req.body.variables;

    if (role === undefined || role !== UserRole.ADMIN)
      throw new NotAuthorizedError();

    return true;
  }
}
