import { RoleOptions } from '../../users/entities/role-options.entity';

export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  roles: RoleOptions[];
  iat?: number;
  exp?: number;
}
