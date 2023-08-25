import { RoleOptions } from '../../users/entities/role-options.entity';

export interface UserFromJwt {
  id: string;
  email: string;
  name: string;
  roles: RoleOptions[];
}
