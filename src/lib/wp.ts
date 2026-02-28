import { WP_Post, WP_Category } from '@/types/wp';

const WP_API_URL = process.env.WORDPRESS_API_URL || 'https://demo.wp-api.org/wp-json';

export async function getPosts(page = 1, perPage = 10, categoryId?: number): Promise<{ posts: WP_Post[], totalPages: number }> {
    const url = new URL(`${WP_API_URL}/wp/v2/posts`);
    url.searchParams.append('_embed', 'true');
    url.searchParams.append('page', page.toString());
    url.searchParams.append('per_page', perPage.toString());
    if (categoryId) url.searchParams.append('categories', categoryId.toString());

    const tags = ['posts'];
    if (categoryId) tags.push(`category-${categoryId}`);

    const res = await fetch(url.toString(), {
        cache: 'force-cache',
        next: { tags }
    });

    if (!res.ok) {
        if (res.status === 400 && page > 1) {
            // Typically means requested page is out of bounds
            return { posts: [], totalPages: 0 };
        }
        console.error('Failed to fetch posts:', await res.text());
        return { posts: [], totalPages: 0 };
    }

    const posts = await res.json();
    const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1', 10);

    return { posts, totalPages };
}

export async function getPostBySlug(slug: string): Promise<WP_Post | null> {
    const url = new URL(`${WP_API_URL}/wp/v2/posts`);
    url.searchParams.append('slug', slug);
    url.searchParams.append('_embed', 'true');

    const res = await fetch(url.toString(), {
        cache: 'force-cache',
        next: { tags: ['posts', `post-${slug}`] }
    });

    if (!res.ok) return null;
    const posts = await res.json();
    return posts[0] || null;
}

export async function getCategories(): Promise<WP_Category[]> {
    const url = new URL(`${WP_API_URL}/wp/v2/categories`);
    const res = await fetch(url.toString(), {
        cache: 'force-cache',
        next: { tags: ['categories'] } // Tagged for cache busting
    });

    if (!res.ok) return [];
    return res.json();
}
