import { RoleOptions } from '@prisma/client';
import { Address } from './address.entity';

export class User {
  userId: string;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  user_active: boolean;
  role: RoleOptions;
  created_at: string | Date;
  updated_at: string | Date;
  address?: Address;
}
