import { OrderStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class Order {
  orderId: number;
  status: OrderStatus;
  created_at: string | Date;
  updated_at: string | Date;
  total: Decimal;
  user_id: string;
}

interface OrderProducts {
  orderProduct: [
    {
      orderProductId: string;
      quantity: number;
      product: {
        productId: number;
        name: string;
        price: Decimal;
      };
    },
  ];
}

//export type OrderWithProductsDetails = Order & OrderProducts;

export type OrderWithProductsDetails = {
  orderProduct: {
    orderProductId: string;
    quantity: number;
    product: {
      productId: number;
      name: string;
      price: Decimal;
    };
  }[];
} & {
  orderId: number;
  status: OrderStatus;
  created_at: Date;
  updated_at: Date;
  total: Decimal;
  user_id: string;
};
