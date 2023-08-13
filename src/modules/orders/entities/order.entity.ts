import { OrderStatus } from '@prisma/client';

export class Order {
  orderId: string;
  status: OrderStatus;
  created_at: string | Date;
  updated_at: string | Date;
  user_id: string;
}
