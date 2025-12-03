export type ClothingItem = {
  id: string;
  name: string;
  brand: string;
  category: 'headwear' | 'top' | 'bottom' | 'shoes';
  image: string;
  price: number;
  colors: string[];
  rating: number;
  description?: string;
};

export const clothingItems: ClothingItem[] = [
  // Headwear
  {
    id: 'hat-1',
    name: 'Classic Baseball Cap',
    brand: 'New Era',
    category: 'headwear',
    image: 'https://images.unsplash.com/photo-1606483956061-46a898dce538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlYmFsbCUyMGNhcCUyMGZhc2hpb258ZW58MXx8fHwxNzY0NTg2MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 35,
    colors: ['#000000', '#FFFFFF', '#1F2937', '#DC2626'],
    rating: 4.5,
    description: 'Classic baseball cap with adjustable strap'
  },
  {
    id: 'hat-2',
    name: 'Beanie Winter',
    brand: 'The North Face',
    category: 'headwear',
    image: 'https://images.unsplash.com/photo-1606483956061-46a898dce538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlYmFsbCUyMGNhcCUyMGZhc2hpb258ZW58MXx8fHwxNzY0NTg2MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 28,
    colors: ['#000000', '#1F2937', '#6B7280'],
    rating: 4.7,
    description: 'Warm winter beanie'
  },

  // Tops
  {
    id: 'top-1',
    name: 'Essential White Tee',
    brand: 'Uniqlo',
    category: 'top',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMGJhc2ljfGVufDF8fHx8MTc2NDYxMDU2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 19,
    colors: ['#FFFFFF', '#000000', '#1F2937', '#6B7280'],
    rating: 4.3,
    description: 'Premium cotton essential tee'
  },
  {
    id: 'top-2',
    name: 'Tech Fleece Hoodie',
    brand: 'Nike',
    category: 'top',
    image: 'https://images.unsplash.com/photo-1632682582909-2b3a2581eef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob29kaWUlMjBzdHJlZXR3ZWFyfGVufDF8fHx8MTc2NDYxMDU2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 120,
    colors: ['#000000', '#1F2937', '#374151', '#DC2626'],
    rating: 4.8,
    description: 'Lightweight warmth with style'
  },
  {
    id: 'top-3',
    name: 'Leather Moto Jacket',
    brand: 'AllSaints',
    category: 'top',
    image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwamFja2V0JTIwZmFzaGlvbnxlbnwxfHx8fDE3NjQ1NDExNzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 450,
    colors: ['#000000', '#78350F'],
    rating: 4.9,
    description: 'Premium leather jacket'
  },
  {
    id: 'top-4',
    name: 'Denim Jacket',
    brand: "Levi's",
    category: 'top',
    image: 'https://images.unsplash.com/photo-1764427163096-97ecceee3d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGphY2tldCUyMGNhc3VhbHxlbnwxfHx8fDE3NjQ1NzQ4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 98,
    colors: ['#2563EB', '#1E3A8A', '#000000'],
    rating: 4.6,
    description: 'Classic trucker jacket'
  },

  // Bottoms
  {
    id: 'bottom-1',
    name: '501 Original Jeans',
    brand: "Levi's",
    category: 'bottom',
    image: 'https://images.unsplash.com/photo-1638404390952-3a9442fbad15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGplYW5zJTIwZGVuaW18ZW58MXx8fHwxNzY0NTM3NzMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 89,
    colors: ['#000000', '#1E3A8A', '#6B7280'],
    rating: 4.7,
    description: 'Original straight fit jeans'
  },
  {
    id: 'bottom-2',
    name: 'Cargo Pants',
    brand: 'Carhartt',
    category: 'bottom',
    image: 'https://images.unsplash.com/photo-1638404390952-3a9442fbad15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGplYW5zJTIwZGVuaW18ZW58MXx8fHwxNzY0NTM3NzMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 75,
    colors: ['#000000', '#78350F', '#4B5563'],
    rating: 4.5,
    description: 'Functional cargo pants'
  },
  {
    id: 'bottom-3',
    name: 'Chino Pants',
    brand: 'Uniqlo',
    category: 'bottom',
    image: 'https://images.unsplash.com/photo-1638404390952-3a9442fbad15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGplYW5zJTIwZGVuaW18ZW58MXx8fHwxNzY0NTM3NzMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 49,
    colors: ['#D1D5DB', '#4B5563', '#000000', '#78350F'],
    rating: 4.4,
    description: 'Slim fit chino pants'
  },

  // Shoes
  {
    id: 'shoes-1',
    name: 'Air Force 1',
    brand: 'Nike',
    category: 'shoes',
    image: 'https://images.unsplash.com/photo-1578314921455-34dd4626b38d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzJTIwc2hvZXN8ZW58MXx8fHwxNzY0NTM3NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 110,
    colors: ['#FFFFFF', '#000000', '#DC2626'],
    rating: 4.8,
    description: 'Iconic basketball sneaker'
  },
  {
    id: 'shoes-2',
    name: 'Superstar',
    brand: 'Adidas',
    category: 'shoes',
    image: 'https://images.unsplash.com/photo-1578314921455-34dd4626b38d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzJTIwc2hvZXN8ZW58MXx8fHwxNzY0NTM3NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 95,
    colors: ['#FFFFFF', '#000000', '#2563EB'],
    rating: 4.7,
    description: 'Classic shell-toe sneaker'
  },
  {
    id: 'shoes-3',
    name: 'Chuck Taylor All Star',
    brand: 'Converse',
    category: 'shoes',
    image: 'https://images.unsplash.com/photo-1581327512021-fa236549e4b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMGNvbG9yZnVsfGVufDF8fHx8MTc2NDUyNTIwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 65,
    colors: ['#000000', '#FFFFFF', '#DC2626', '#2563EB'],
    rating: 4.6,
    description: 'Timeless high-top sneaker'
  },
];

export const presetOutfits = [
  {
    id: 'preset-1',
    name: 'Casual Street',
    items: {
      headwear: 'hat-1',
      top: 'top-2',
      bottom: 'bottom-1',
      shoes: 'shoes-1'
    },
    tags: ['casual', 'street', 'comfortable']
  },
  {
    id: 'preset-2',
    name: 'Minimal Chic',
    items: {
      headwear: null,
      top: 'top-1',
      bottom: 'bottom-3',
      shoes: 'shoes-2'
    },
    tags: ['minimal', 'clean', 'everyday']
  },
  {
    id: 'preset-3',
    name: 'Urban Edge',
    items: {
      headwear: 'hat-1',
      top: 'top-3',
      bottom: 'bottom-1',
      shoes: 'shoes-3'
    },
    tags: ['urban', 'edgy', 'bold']
  }
];
