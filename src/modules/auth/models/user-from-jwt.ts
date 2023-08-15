import { RoleOptions } from '@prisma/client';

export interface UserFromJwt {
  id: string;
  email: string;
  name: string;
  roles: RoleOptions[];
}
