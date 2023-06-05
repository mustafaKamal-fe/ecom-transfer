// required-permission.decorator.ts
import { SetMetadata } from '@nestjs/common';
import Actions from '../enum/actions';

export const RequiredPermission = (action: Actions) =>
  SetMetadata('caslPermission', { action });
