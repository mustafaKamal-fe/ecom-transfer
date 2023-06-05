// rbac.middleware.ts
import {
  Injectable,
  HttpException,
  HttpStatus,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

import { Reflector } from '@nestjs/core';
import Actions from '../enum/actions';

@Injectable()
export class RBACMiddleware implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user; // Assuming you have implemented authentication and have the user available in the request object
    console.log('user', user);

    const action = this.reflector.getAllAndOverride('caslPermission', [
      context.getHandler(),
      context.getClass(),
    ])['action'];

    console.log('action', action);

    if (!user || !action) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const subject = req.route?.path.split('/')[1]; // Derive subject from the controller name
    console.log('subject', subject);

    // Check permission for the current action and subject
    if (!canDo(action, subject, user)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return true;
  }
}

function canDo(action: string, subject: string, user: any) {
  // Check permission for the current action and subject
  // convert action to string

  for (const permission of user.permissions) {
    const [myAction, mySubject] = permission.split('@');

    if (action === myAction && mySubject === subject) {
      return true;
    }
  }
  return false;
}
