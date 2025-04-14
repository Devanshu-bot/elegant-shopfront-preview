
export interface ProductImage {
  id: number;
  src: string;
  alt: string;
  isMain?: boolean;
}

export interface ProductVariant {
  id: number;
  type: 'color' | 'size';
  name: string;
  value: string;
  inStock: boolean;
}

export interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  content: string;
  avatarSrc?: string;
}

export interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
  rating: number;
  reviewCount: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  details: string[];
  images: ProductImage[];
  variants: {
    colors: ProductVariant[];
    sizes: ProductVariant[];
  };
  reviews: Review[];
  rating: number;
  reviewCount: number;
  relatedProducts: RelatedProduct[];
  category?: string;
  subcategory?: string;
}
