import { WP_Post, WP_Category, WP_Tag, WP_MenuItem } from '@/types/wp';

const WP_API_URL = process.env.WORDPRESS_API_URL || 'https://backend.distributingcare.com/wp-json';

export async function getTagBySlug(slug: string): Promise<WP_Tag | null> {
    const url = new URL(`${WP_API_URL}/wp/v2/tags`);
    url.searchParams.append('slug', slug);
    const res = await fetch(url.toString(), {
        next: { revalidate: 300 }
    });
    if (!res.ok) return null;
    const tags = await res.json();
    return tags[0] || null;
}

export async function getTags(): Promise<WP_Tag[]> {
    const url = new URL(`${WP_API_URL}/wp/v2/tags`);
    url.searchParams.append('per_page', '100');
    url.searchParams.append('orderby', 'count');
    url.searchParams.append('order', 'desc');
    const res = await fetch(url.toString(), {
        next: { revalidate: 300 }
    });
    if (!res.ok) return [];
    return res.json();
}

export async function getPostsByTag(page = 1, perPage = 10, tagId: number): Promise<{ posts: WP_Post[], totalPages: number }> {
    const url = new URL(`${WP_API_URL}/wp/v2/posts`);
    url.searchParams.append('_embed', 'true');
    url.searchParams.append('page', page.toString());
    url.searchParams.append('per_page', perPage.toString());
    url.searchParams.append('tags', tagId.toString());

    const res = await fetch(url.toString(), {
        next: { revalidate: 300 }
    });

    if (!res.ok) {
        if (res.status === 400 && page > 1) return { posts: [], totalPages: 0 };
        console.error('Failed to fetch posts by tag:', await res.text());
        return { posts: [], totalPages: 0 };
    }

    const posts = await res.json();
    const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1', 10);
    return { posts, totalPages };
}

export async function getPosts(page = 1, perPage = 10, categoryId?: number): Promise<{ posts: WP_Post[], totalPages: number }> {
    const url = new URL(`${WP_API_URL}/wp/v2/posts`);
    url.searchParams.append('_embed', 'true');
    url.searchParams.append('page', page.toString());
    url.searchParams.append('per_page', perPage.toString());
    if (categoryId) url.searchParams.append('categories', categoryId.toString());

    const res = await fetch(url.toString(), {
        next: { revalidate: 300 } // Revalidate every 5 minutes
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
        next: { revalidate: 300 } // Revalidate every 5 minutes
    });

    if (!res.ok) return null;
    const posts = await res.json();
    return posts[0] || null;
}

export async function getCategories(): Promise<WP_Category[]> {
    const url = new URL(`${WP_API_URL}/wp/v2/categories`);
    const res = await fetch(url.toString(), {
        next: { revalidate: 300 } // Revalidate every 5 minutes
    });

    if (!res.ok) return [];
    return res.json();
}

export async function getCategoryBySlug(slug: string): Promise<WP_Category | null> {
    const url = new URL(`${WP_API_URL}/wp/v2/categories`);
    url.searchParams.append('slug', slug);
    const res = await fetch(url.toString(), {
        next: { revalidate: 300 } // Revalidate every 5 minutes
    });

    if (!res.ok) return null;
    const categories = await res.json();
    return categories[0] || null;
}

export async function getMenu(menuId: number): Promise<WP_MenuItem[]> {
    const url = new URL(`${WP_API_URL.replace('/wp/v2', '')}/custom/v1/menu/${menuId}`);

    try {
        const res = await fetch(url.toString(), {
            next: { revalidate: 3600 } // Revalidate menu hourly
        });

        if (!res.ok) {
            console.error(`Failed to fetch menu ${menuId}:`, await res.text());
            return [];
        }

        return await res.json();
    } catch (error) {
        console.error(`Error fetching menu ${menuId}:`, error);
        return [];
    }
}
