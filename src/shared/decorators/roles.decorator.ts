import { SetMetadata } from '@nestjs/common';
import { RoleOptions } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleOptions[]) => SetMetadata(ROLES_KEY, roles);
