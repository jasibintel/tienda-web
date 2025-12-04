// ============================================
// TypeScript Interfaces - De Gloria en Gloria
// ============================================

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  coverUrl: string;
  price?: number;
  isFree: boolean;
  featured?: boolean;
  downloadUrl?: string;
  description?: string;
  category: string; // 'maestros' | 'devocionales' | 'predicaciones' | 'familias' | 'ninos' | 'jovenes'
  audience: string; // 'adultos' | 'jovenes' | 'ninos' | 'familias' | 'todos'
  formats: string[]; // ['PDF', 'EPUB']

  // Detail page fields
  descriptionLong?: string;
  learningPoints?: string[];
  targetAudience?: {
    icon: string;
    title: string;
    description: string;
  }[];

  // Technical details
  pages?: number;
  fileSize?: {
    pdf?: string;
    epub?: string;
  };
  language?: string;
  publishedDate?: string;
  isbn?: string;
  publisher?: string;
  isActive?: boolean;
  
  // Admin fields (optional, used in admin panel)
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  bookCount?: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorLocation: string;
  order?: number;
  isActive: boolean;
}

export interface UserLibraryItem {
  id: string;
  userId: string;
  bookId: string;

  // Book data (denormalized for performance)
  title: string;
  author: string;
  coverUrl: string;
  isFree: boolean;

  // Download URLs
  downloadUrls: {
    pdf?: string;
    epub?: string;
  };

  // Metadata
  acquiredAt: string; // ISO date string for mock data
  downloadCount?: number;
  lastDownloadedAt?: string;
}

export interface OrderItem {
  bookId: string;
  title: string;
  author: string;
  coverUrl: string;
  price: number;
  isFree: boolean;
  formats: string[]; // ['PDF', 'EPUB']
  quantity: number; // Always 1 for digital books
}

export interface Order {
  id: string;
  buyerId: string; // Changed from userId for clarity
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'paid' | 'cancelled';
  paymentMethod?: 'online-simulated' | 'manual' | 'stripe' | 'wompi';
  paymentIntentId?: string;
  isGift: boolean;
  recipientEmail: string | null;
  createdAt: string; // ISO date string
  updatedAt: string;
  paidAt?: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  descriptionShort: string;
  descriptionLong: string;
  bannerUrl: string;
  books: string[]; // Array of book IDs
  order: number;
  isActive: boolean;
  hasReadingOrder?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LibraryEntry {
  bookId: string;
  grantedAt: string; // ISO date
  source: 'order' | 'manual';
  orderId: string | null;
}
