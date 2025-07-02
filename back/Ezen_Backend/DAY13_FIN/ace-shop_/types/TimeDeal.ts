// types/TimeDeal.ts
export interface TimeDeal {
  id: number;
  product_id: number;
  product_name: string;
  image_url?: string;
  price: number;
  deal_price: number;
  start_time: string;
  end_time: string;
  is_active: boolean|number;
}
 