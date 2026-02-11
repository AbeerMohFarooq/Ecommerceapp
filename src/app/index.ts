export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Governorate = 'Capital' | 'Hawally' | 'Farwaniya' | 'Ahmadi' | 'Jahra' | 'Mubarak Al-Kabeer';

export interface Address {
  id: string;
  governorate: Governorate;
  area: string;
  block: string;
  street: string;
  house: string;
  avenue?: string;
  floor?: string;
  apartment?: string;
  additionalDirections?: string;
}
