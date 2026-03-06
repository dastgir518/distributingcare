import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const WP_API_URL = process.env.WORDPRESS_API_URL || 'https://distributingcare.com/wp-json';

    // Fetch up to 100 posts for the sitemap
    const res = await fetch(`${WP_API_URL}/wp/v2/posts?per_page=100`, {
        next: { revalidate: 3600 } // Revalidate sitemap hourly
    });

    const posts = res.ok ? await res.json() : [];

    const blogEntries = posts.map((post: any) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://myawesomeblog.com'}/blog/${post.slug}`,
        lastModified: new Date(post.modified),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://myawesomeblog.com',
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://myawesomeblog.com'}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        ...blogEntries
    ];
}
