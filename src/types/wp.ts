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
  review_products?: Array<{
    name: string;
    key_feature: string;
    price_range: string;
    rating: number;
    image_url: string;
    image_alt: string;
    description: string;
    pros: string[];
    cons: string[];
    affiliate_link: string;
  }>;
  editor_team?: string;
  read_time?: string;
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

export interface WP_Tag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
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

export interface WP_MenuItem {
  id: number;
  title: string;
  url: string;
  children?: WP_MenuItem[];
}
