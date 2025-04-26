
export interface CartItem {
  productId: number;
  name: string;
  image: string;
  price: number;
  variantId?: string;
  quantity: number;
}

export interface Wishlist {
  productId: number;
  name: string;
  image: string;
  price: number;
}
