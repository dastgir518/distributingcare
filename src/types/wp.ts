export interface WP_Post {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{ 
      source_url: string; 
      alt_text: string 
    }>;
    'author'?: Array<{ 
      name: string; 
      avatar_urls: Record<string, string> 
    }>;
    'wp:term'?: Array<Array<{ 
      id: number; 
      name: string; 
      slug: string; 
      taxonomy: string 
    }>>;
  };
}

export interface WP_Category {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
}
