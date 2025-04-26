
export interface CartItem {
  productId: number;
  name: string;
  image: string;
  price: number;
  variantId?: string;
  quantity: number;
  color?: {
    name: string;
    value: string;
  };
  size?: {
    name: string;
  };
}

export interface Wishlist {
  productId: number;
  name: string;
  image: string;
  price: number;
}
