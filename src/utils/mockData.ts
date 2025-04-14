
// Mock data for e-commerce product page
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
}

// Mock product data
export const mockProduct: Product = {
  id: 1,
  name: "Premium Comfort Lounge Chair",
  price: 299.99,
  originalPrice: 399.99,
  discount: 25,
  description: "Elevate your living space with our Premium Comfort Lounge Chair. Designed with ergonomic support and luxurious materials, this chair offers the perfect balance of style and comfort for any modern home.",
  details: [
    "Solid oak frame with premium finish",
    "High-density foam cushioning for maximum comfort",
    "Stain-resistant fabric upholstery",
    "Assembly time: approximately 15 minutes",
    "Dimensions: 30\"W x 32\"D x 34\"H",
    "Weight capacity: 300 lbs"
  ],
  images: [
    { id: 1, src: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", alt: "Lounge chair front view", isMain: true },
    { id: 2, src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", alt: "Lounge chair side view" },
    { id: 3, src: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", alt: "Lounge chair in living room" },
    { id: 4, src: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", alt: "Lounge chair detail view" }
  ],
  variants: {
    colors: [
      { id: 1, type: 'color', name: 'Charcoal', value: '#403E43', inStock: true },
      { id: 2, type: 'color', name: 'Navy Blue', value: '#1A2A42', inStock: true },
      { id: 3, type: 'color', name: 'Beige', value: '#D6CAB0', inStock: true },
      { id: 4, type: 'color', name: 'Sage Green', value: '#7D8471', inStock: false }
    ],
    sizes: [
      { id: 1, type: 'size', name: 'Standard', value: 'Standard', inStock: true },
      { id: 2, type: 'size', name: 'Large', value: 'Large', inStock: true },
      { id: 3, type: 'size', name: 'Extra Large', value: 'XL', inStock: false }
    ]
  },
  reviews: [
    {
      id: 1,
      author: "Emma Thompson",
      date: "October 15, 2024",
      rating: 5,
      content: "Absolutely love this chair! It's the perfect addition to my reading nook. The fabric feels luxurious and it's incredibly comfortable for long reading sessions."
    },
    {
      id: 2,
      author: "Michael Rodriguez",
      date: "September 22, 2024",
      rating: 4,
      content: "Great quality chair with excellent support for my back. Assembly was quick and straightforward. Taking off one star only because the color is slightly darker than shown in the photos."
    },
    {
      id: 3,
      author: "Sarah Johnson",
      date: "August 10, 2024",
      rating: 5,
      content: "This chair exceeds all my expectations! The cushioning is perfect - not too soft, not too firm. I've received so many compliments from guests. Worth every penny!"
    }
  ],
  rating: 4.7,
  reviewCount: 128,
  relatedProducts: [
    {
      id: 101,
      name: "Modern Side Table",
      price: 149.99,
      imageSrc: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 4.5,
      reviewCount: 42
    },
    {
      id: 102,
      name: "Decorative Floor Lamp",
      price: 129.99,
      imageSrc: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 4.3,
      reviewCount: 28
    },
    {
      id: 103,
      name: "Plush Throw Pillow Set",
      price: 59.99,
      imageSrc: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 4.8,
      reviewCount: 65
    },
    {
      id: 104,
      name: "Minimalist Coffee Table",
      price: 199.99,
      imageSrc: "https://images.unsplash.com/photo-1611967164521-abae8fba4668?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      rating: 4.6,
      reviewCount: 37
    }
  ]
};
