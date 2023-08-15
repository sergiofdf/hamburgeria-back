import { RoleOptions } from '@prisma/client';

export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  roles: RoleOptions[];
  iat?: number;
  exp?: number;
}
