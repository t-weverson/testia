export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  costPrice: number;
  finalPrice: number;
  brand: string;
  supplier: string;
  stockQuantity: number;
  stockLocation: string;
}

export type ProductFormData = Omit<Product, 'id'>;

export interface Customer {
  id: string;
  name: string;
  address: string;
  contact: string;
  observations: string;
}

export type CustomerFormData = Omit<Customer, 'id'>;

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  observations: string;
}