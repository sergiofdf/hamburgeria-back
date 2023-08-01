import { Category } from '@prisma/client';

export class Product {
  productId: string;
  name: string;
  description: string;
  size: string;
  price: number;
  imageUrl?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  category_id?: number;
  category?: Category;
}
