export interface Address {
  addressId?: string;
  number: number;
  street: string;
  district: string;
  zip_code: string;
  created_at?: string | Date;
  updated_at?: string | Date;
}
