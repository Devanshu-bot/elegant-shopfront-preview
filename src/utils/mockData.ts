
import { Product, ProductImage, ProductVariant, Review, RelatedProduct } from "@/types/product";

// Export moved to the types file
export type { Product, ProductImage, ProductVariant, Review, RelatedProduct };

// Mock product data
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Comfort Lounge Chair",
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    category: "Furniture",
    subcategory: "Lounge Chairs",
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
  },
  {
    id: 2,
    name: "Modern Minimalist Desk Lamp",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    category: "Lighting",
    subcategory: "Desk Lamps",
    description: "Add a touch of modern elegance to your workspace with our Minimalist Desk Lamp. Features adjustable brightness levels and a sleek design that complements any decor.",
    details: [
      "Brushed aluminum construction",
      "3 brightness levels with touch control",
      "Energy-efficient LED bulb included",
      "USB charging port for devices",
      "Dimensions: 5\"W x 7\"D x 15\"H",
      "1-year manufacturer warranty"
    ],
    images: [
      { id: 1, src: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", alt: "Desk lamp front view", isMain: true },
      { id: 2, src: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", alt: "Desk lamp in office setting" },
      { id: 3, src: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", alt: "Desk lamp detail" }
    ],
    variants: {
      colors: [
        { id: 1, type: 'color', name: 'Black', value: '#000000', inStock: true },
        { id: 2, type: 'color', name: 'Silver', value: '#C0C0C0', inStock: true },
        { id: 3, type: 'color', name: 'Gold', value: '#FFD700', inStock: false }
      ],
      sizes: [
        { id: 1, type: 'size', name: 'Standard', value: 'Standard', inStock: true }
      ]
    },
    reviews: [
      {
        id: 1,
        author: "James Wilson",
        date: "November 2, 2024",
        rating: 5,
        content: "Perfect desk lamp for my home office. The adjustable brightness is great for different times of day, and I love the USB charging port for my phone."
      },
      {
        id: 2,
        author: "Lisa Chen",
        date: "October 18, 2024",
        rating: 4,
        content: "Stylish and functional. I bought two for my bedside tables and they look fantastic. The only reason I'm giving 4 stars is because the touch control is sometimes a bit finicky."
      }
    ],
    rating: 4.5,
    reviewCount: 87,
    relatedProducts: [
      {
        id: 201,
        name: "Ergonomic Desk Chair",
        price: 199.99,
        imageSrc: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        rating: 4.7,
        reviewCount: 103
      },
      {
        id: 202,
        name: "Wireless Desk Charger",
        price: 39.99,
        imageSrc: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        rating: 4.4,
        reviewCount: 56
      }
    ]
  }
];

// Export the first product as the mock product for backward compatibility
export const mockProduct = mockProducts[0];
