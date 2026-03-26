import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTagBySlug, getPostsByTag } from '@/lib/wp';
import { stripHtml } from '@/lib/utils';
import Image from 'next/image';

// Label map for display-friendly badge text per tag slug
const TAG_LABELS: Record<string, string> = {
    'best-budget-picks': 'Best Budget Picks',
    'best-for-seniors': 'Best for Seniors',
    'best-of-2026': 'Best of 2026',
    'editors-choice': "Editor's Choice",
};

export async function generateMetadata(
    props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const params = await props.params;
    const tag = await getTagBySlug(params.slug);

    if (!tag) return { title: 'Tag Not Found' };

    const label = TAG_LABELS[tag.slug] || tag.name;

    return {
        title: `${label} | DistributingCare`,
        description: tag.description || `Browse all ${label} articles and guides on DistributingCare.`,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://distributingcare.com'}/tag/${tag.slug}`,
        },
        openGraph: {
            title: `${label} | DistributingCare`,
            description: tag.description || `Browse all ${label} articles and guides on DistributingCare.`,
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://distributingcare.com'}/tag/${tag.slug}`,
            type: 'website',
        },
    };
}

export default async function TagPage(props: {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await props.params;
    const tag = await getTagBySlug(params.slug);

    if (!tag) {
        notFound();
    }

    const searchParams = await props.searchParams;
    const pageParam = searchParams?.page;
    const page = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
    const { posts, totalPages } = await getPostsByTag(page, 10, tag.id);

    const label = TAG_LABELS[tag.slug] || tag.name;

    return (
        <div className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-20 py-6">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap gap-2 py-4 text-sm mb-4">
                <Link className="text-primary font-medium hover:underline" href="/">Home</Link>
                <span className="text-slate-400 font-medium">/</span>
                <span className="text-slate-500 dark:text-slate-400 font-medium">{label}</span>
            </nav>

            {/* Hero Section */}
            <section className="mb-12">
                <div className="relative overflow-hidden rounded-xl bg-slate-900">
                    <div
                        className="absolute inset-0 opacity-40 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBUuOOCfGMXnDJGWqPPozK1oOLHCf559dWYr8ygoUfNUAN7_UhqKJQVHS74dwcPguKLpHnh5PYM34l-_uvxfSgq1TMgzvg6SaquZ_LkvlwOGpUWdnLBJkNvog-jsWgKArclRaOawjGVuVM-BzLoTl8piEUTLyK504B180KxThiMdsfx6MZW4MrErb7q6GbA_WKSzPZRJk6VDHcxntYgTG2M4NEAV9AaHjJSBT2iPObB-xNnHXjZpvGh6FnBfKdB79wCaci-GCsNmJ8")',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background-dark/90 to-transparent" />
                    <div className="relative flex min-h-[340px] flex-col gap-6 items-start justify-center px-8 md:px-16 py-12 max-w-2xl">
                        <div className="flex flex-col gap-4">
                            <span className="text-primary font-bold tracking-wider uppercase text-xs">Tag</span>
                            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
                                {label}
                            </h1>
                            <p className="text-slate-200 text-lg leading-relaxed">
                                {tag.description ||
                                    `Explore our expert-reviewed articles and guides tagged under "${label}".`}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="mb-16">
                <div className="flex flex-col gap-1 mb-8">
                    <h2 className="text-2xl font-bold tracking-tight">Articles & Guides</h2>
                    <p className="text-slate-500 dark:text-slate-400">
                        {tag.count > 0 ? `${tag.count} article${tag.count !== 1 ? 's' : ''} in this collection.` : 'Browse our expert content below.'}
                    </p>
                </div>

                {!posts?.length ? (
                    <div className="py-20 text-center">
                        <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">article</span>
                        <p className="text-slate-500 text-lg">No articles found for this tag yet.</p>
                        <Link href="/" className="mt-6 inline-block text-primary font-bold hover:underline">
                            Back to Home
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => {
                            const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
                            return (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-primary/5 hover:border-primary/20 transition-all h-full"
                                >
                                    {featuredMedia ? (
                                        <div className="relative aspect-video w-full overflow-hidden">
                                            <Image
                                                src={featuredMedia.source_url}
                                                alt={featuredMedia.alt_text || post.title.rendered}
                                                fill
                                                className="object-cover group-hover:scale-105 transition duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                unoptimized
                                            />
                                        </div>
                                    ) : (
                                        <div className="aspect-video w-full bg-primary/5 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-4xl text-primary/30">image</span>
                                        </div>
                                    )}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-primary/10 text-primary">
                                                {label}
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                {new Date(post.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                        <h3
                                            className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 text-slate-900 dark:text-slate-100"
                                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                        />
                                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-grow">
                                            {stripHtml(post.excerpt.rendered)}
                                        </p>
                                        <div className="text-primary font-bold text-sm flex items-center gap-2 mt-auto">
                                            Read Full Guide{' '}
                                            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                                                chevron_right
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2">
                        {page > 1 ? (
                            <Link
                                href={`/tag/${tag.slug}?page=${page - 1}`}
                                className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary"
                            >
                                <span className="material-symbols-outlined">chevron_left</span>
                            </Link>
                        ) : (
                            <button
                                disabled
                                className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 opacity-50 cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                        )}

                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-slate-900 font-bold">
                            {page}
                        </div>

                        {page < totalPages ? (
                            <Link
                                href={`/tag/${tag.slug}?page=${page + 1}`}
                                className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary"
                            >
                                <span className="material-symbols-outlined">chevron_right</span>
                            </Link>
                        ) : (
                            <button
                                disabled
                                className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 opacity-50 cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}
