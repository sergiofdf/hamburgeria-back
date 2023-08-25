import { SetMetadata } from '@nestjs/common';
import { RoleOptions } from '../../modules/users/entities/role-options.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleOptions[]) => SetMetadata(ROLES_KEY, roles);
