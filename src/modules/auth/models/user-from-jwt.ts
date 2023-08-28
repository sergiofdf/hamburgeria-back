import { RoleOptions } from '../../users/entities/role-options.entity';

export interface UserFromJwt {
  userId: string;
  email: string;
  name: string;
  roles: RoleOptions[];
}
