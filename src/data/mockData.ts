export interface Category {
  id: string;
  name: string;
}

export interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price?: number;
}

export interface ShoppingCategory {
  id: string;
  name: string;
  image: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Apparel' },
  { id: '2', name: 'Category' },
  { id: '3', name: 'Category' },
];

export const bannerSlides: BannerSlide[] = [
  {
    id: '1',
    title: 'Get 30% OFF On The Best Laptops',
    subtitle: 'Upgrade Your Tech Today',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ctaText: 'Shop Now'
  },
  {
    id: '2',
    title: 'New Collection 2024',
    subtitle: 'Discover the Latest Trends',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ctaText: 'Shop Now'
  }
];

export const latestProducts: Product[] = [
  {
    id: '1',
    name: 'Smart Watch',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 299
  },
  {
    id: '2',
    name: 'Analog Watch',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 199
  },
  {
    id: '3',
    name: 'Classic Watch',
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 249
  },
  {
    id: '4',
    name: 'Modern Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 399
  }
];

export const shoppingCategories: ShoppingCategory[] = [
  {
    id: '1',
    name: 'T shirts',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    name: 'Cases',
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '3',
    name: 'Water',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '4',
    name: 'Plates',
    image: 'https://images.unsplash.com/photo-1578262825743-a4e402caab76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  }
];

export const dealsProducts: Product[] = [
  {
    id: '1',
    name: 'Smart Watch Series 7',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 399
  },
  {
    id: '2',
    name: 'Wireless Earbuds',
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 159
  },
  {
    id: '3',
    name: 'Premium Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 299
  },
  {
    id: '4',
    name: 'Smart Speaker',
    image: 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 199
  }
];

export const allCategories = [
  {
    group: "Technology",
    items: [
      { 
        slug: "laptops", 
        name: "Laptops", 
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
      },
      { 
        slug: "phones", 
        name: "Phones", 
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
      },
      { 
        slug: "watches", 
        name: "Watches", 
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
      }
    ]
  },
  {
    group: "Home & Living",
    items: [
      { 
        slug: "furniture", 
        name: "Furniture", 
        image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
      },
      { 
        slug: "lighting", 
        name: "Lighting", 
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
      },
      { 
        slug: "kitchen", 
        name: "Kitchen", 
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
      }
    ]
  }
];
