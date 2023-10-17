import { Prisma } from '@prisma/client';

export function decimalToNumber(value: Prisma.Decimal) {
  return Number(value);
}

export function numberToDecimal(value: number) {
  return new Prisma.Decimal(value);
}
