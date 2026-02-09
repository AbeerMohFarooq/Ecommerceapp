import type { Product } from '../App';

// Mock API delay to simulate network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock product database
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Luxury Eau De Parfum',
    price: 45.500,
    image: 'https://images.unsplash.com/photo-1719175936556-dbd05e415913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlfGVufDF8fHx8MTc3MDQ0NTE4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Perfumes',
    description: 'Premium French perfume with notes of jasmine and sandalwood. Long-lasting fragrance for special occasions.',
    rating: 4.8,
    reviews: 127,
    inStock: true,
    discount: 15
  },
  {
    id: '2',
    name: 'Gold Pearl Necklace',
    price: 89.900,
    image: 'https://images.unsplash.com/photo-1611012756377-05e2e4269fa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwamV3ZWxyeSUyMG5lY2tsYWNlfGVufDF8fHx8MTc3MDUyNjAzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Jewelry',
    description: '18K gold necklace with natural pearls. Elegant design perfect for weddings and formal events.',
    rating: 4.9,
    reviews: 85,
    inStock: true
  },
  {
    id: '3',
    name: 'Designer Leather Handbag',
    price: 125.000,
    image: 'https://images.unsplash.com/photo-1758171692659-024183c2c272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGhhbmRiYWclMjBsdXh1cnl8ZW58MXx8fHwxNzcwNDk0NDc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Fashion',
    description: 'Premium Italian leather handbag with gold hardware. Spacious interior with multiple compartments.',
    rating: 4.7,
    reviews: 203,
    inStock: true,
    discount: 20
  },
  {
    id: '4',
    name: 'Swiss Automatic Watch',
    price: 199.000,
    image: 'https://images.unsplash.com/photo-1760163180940-eecde9eda36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3YXRjaCUyMGVsZWdhbnR8ZW58MXx8fHwxNzcwNDcxNTY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Watches',
    description: 'Swiss-made automatic watch with sapphire crystal and leather strap. Water-resistant up to 50m.',
    rating: 5.0,
    reviews: 156,
    inStock: true
  },
  {
    id: '5',
    name: 'Premium Skincare Set',
    price: 34.750,
    image: 'https://images.unsplash.com/photo-1643168343279-3f93c2e592ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGNvc21ldGljc3xlbnwxfHx8fDE3NzA1NDc1MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Beauty',
    description: 'Complete skincare routine with natural ingredients. Includes cleanser, toner, serum, and moisturizer.',
    rating: 4.6,
    reviews: 342,
    inStock: true,
    discount: 10
  },
  {
    id: '6',
    name: 'Designer Sunglasses',
    price: 42.500,
    image: 'https://images.unsplash.com/photo-1732139637217-56c77369e25c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzA0NDQ2MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Accessories',
    description: 'UV400 protection polarized sunglasses. Lightweight frame with premium lenses.',
    rating: 4.5,
    reviews: 98,
    inStock: true
  },
  {
    id: '7',
    name: 'Premium Arabic Sweets Box',
    price: 18.500,
    image: 'https://images.unsplash.com/photo-1595353611262-ff0489f4969a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBzd2VldHMlMjBkZXNzZXJ0fGVufDF8fHx8MTc3MDU0NzUxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Food',
    description: 'Assorted premium Arabic sweets and baklava. Perfect for gifting during celebrations.',
    rating: 4.8,
    reviews: 445,
    inStock: true
  },
  {
    id: '8',
    name: 'Wireless Noise-Canceling Headphones',
    price: 68.900,
    image: 'https://images.unsplash.com/photo-1723961617032-ef69c454cb31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGVhZHBob25lc3xlbnwxfHx8fDE3NzA0MzA1MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Electronics',
    description: 'Premium wireless headphones with active noise cancellation. 30-hour battery life.',
    rating: 4.9,
    reviews: 567,
    inStock: true,
    discount: 25
  }
];

/**
 * Simulated API service for product data
 * In production, replace these with actual API calls to your backend
 */
export const productApi = {
  /**
   * Fetch all products
   * @returns Promise<Product[]>
   */
  async getAllProducts(): Promise<Product[]> {
    await delay(500); // Simulate network delay
    return [...mockProducts];
  },

  /**
   * Fetch products by category
   * @param category - Category name to filter by
   * @returns Promise<Product[]>
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    await delay(300);
    return mockProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  },

  /**
   * Fetch a single product by ID
   * @param id - Product ID
   * @returns Promise<Product | null>
   */
  async getProductById(id: string): Promise<Product | null> {
    await delay(200);
    return mockProducts.find(p => p.id === id) || null;
  },

  /**
   * Search products by query
   * @param query - Search query string
   * @returns Promise<Product[]>
   */
  async searchProducts(query: string): Promise<Product[]> {
    await delay(400);
    const lowerQuery = query.toLowerCase();
    return mockProducts.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Get featured/discounted products
   * @returns Promise<Product[]>
   */
  async getFeaturedProducts(): Promise<Product[]> {
    await delay(300);
    return mockProducts.filter(p => p.discount && p.discount > 0);
  },

  /**
   * Get products sorted by rating
   * @returns Promise<Product[]>
   */
  async getTopRatedProducts(): Promise<Product[]> {
    await delay(300);
    return [...mockProducts].sort((a, b) => b.rating - a.rating).slice(0, 4);
  }
};

/**
 * Example of how to integrate with a real REST API:
 * 
 * const API_BASE_URL = 'https://your-api.com/api';
 * 
 * export const productApi = {
 *   async getAllProducts(): Promise<Product[]> {
 *     const response = await fetch(`${API_BASE_URL}/products`);
 *     if (!response.ok) throw new Error('Failed to fetch products');
 *     return response.json();
 *   },
 *   
 *   async getProductById(id: string): Promise<Product | null> {
 *     const response = await fetch(`${API_BASE_URL}/products/${id}`);
 *     if (!response.ok) return null;
 *     return response.json();
 *   },
 *   
 *   // ... other methods
 * };
 */

/**
 * Example of how to integrate with GraphQL:
 * 
 * import { GraphQLClient, gql } from 'graphql-request';
 * 
 * const client = new GraphQLClient('https://your-api.com/graphql');
 * 
 * export const productApi = {
 *   async getAllProducts(): Promise<Product[]> {
 *     const query = gql`
 *       query {
 *         products {
 *           id
 *           name
 *           price
 *           image
 *           category
 *           description
 *           rating
 *           reviews
 *           inStock
 *           discount
 *         }
 *       }
 *     `;
 *     const data = await client.request(query);
 *     return data.products;
 *   },
 *   
 *   // ... other methods
 * };
 */
