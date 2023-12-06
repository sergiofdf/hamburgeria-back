-- DropForeignKey
ALTER TABLE "orders_products" DROP CONSTRAINT "orders_products_order_id_fkey";

-- DropForeignKey
ALTER TABLE "orders_products" DROP CONSTRAINT "orders_products_product_id_fkey";

-- AddForeignKey
ALTER TABLE "orders_products" ADD CONSTRAINT "orders_products_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_products" ADD CONSTRAINT "orders_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("productId") ON DELETE NO ACTION ON UPDATE CASCADE;
