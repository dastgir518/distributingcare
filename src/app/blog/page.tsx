import Link from 'next/link';
import Image from 'next/image';
import { getPosts } from '@/lib/wp';
import { stripHtml } from '@/lib/utils';

export const metadata = {
    title: 'Expert Care Library | DistributingCare',
    description: 'Read the latest expert guides and articles on caregiving and health products.',
};

// Next 15 specific page props pattern
export default async function BlogListing(props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParams = await props.searchParams;
    const pageParam = searchParams?.page;
    const page = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
    const { posts, totalPages } = await getPosts(page);

    if (!posts?.length) {
        return (
            <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center text-slate-600 dark:text-slate-400">
                <h1 className="text-4xl font-black mb-4 text-slate-900 dark:text-slate-100">Care <span className="text-primary">Library</span></h1>
                <p>No guides found.</p>
            </div>
        );
    }

    return (
        <section className="relative py-16 lg:py-24 bg-white dark:bg-slate-900/50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                        <span className="material-symbols-outlined text-sm">library_books</span> Expert Guides &amp; Insights
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 leading-[1.1] tracking-tight max-w-2xl mb-6">
                        Latest from the <span className="text-primary">Care Library</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                        Deep-dive reviews, how-to guides, and expert advice to help you care for those you love.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => {
                        const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
                        return (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group bg-background-light dark:bg-slate-800/50 p-6 rounded-3xl border border-primary/10 hover:border-primary/40 transition-all shadow-sm flex flex-col h-full"
                            >
                                {featuredMedia && (
                                    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-6 border border-slate-200/50 dark:border-slate-700/50">
                                        <Image
                                            src={featuredMedia.source_url}
                                            alt={featuredMedia.alt_text || post.title.rendered}
                                            fill
                                            className="object-cover group-hover:scale-105 transition duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                )}
                                <div className="flex flex-col flex-grow">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                    <h2
                                        className="text-2xl font-bold mb-4 line-clamp-3 text-slate-900 dark:text-slate-100 group-hover:text-primary transition leading-snug"
                                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                    />
                                    <p className="text-slate-600 dark:text-slate-400 line-clamp-3 flex-grow mb-6 leading-relaxed">
                                        {stripHtml(post.excerpt.rendered)}
                                    </p>
                                    <span className="inline-flex items-center text-primary font-bold gap-2 mt-auto tracking-wide uppercase text-sm">
                                        Read Article <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-16 pb-8 border-t border-slate-200 dark:border-slate-800 pt-16">
                        {page > 1 ? (
                            <Link
                                href={`/blog?page=${page - 1}`}
                                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary px-8 py-3 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2 text-slate-700 dark:text-slate-300"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back</span> Previous
                            </Link>
                        ) : (
                            <span className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-3 rounded-xl font-bold text-slate-400 cursor-not-allowed flex items-center gap-2 opacity-50">
                                <span className="material-symbols-outlined text-sm">arrow_back</span> Previous
                            </span>
                        )}

                        <span className="text-sm font-bold text-slate-500">
                            Page {page} of {totalPages}
                        </span>

                        {page < totalPages ? (
                            <Link
                                href={`/blog?page=${page + 1}`}
                                className="bg-primary hover:bg-primary/90 text-background-dark px-8 py-3 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2"
                            >
                                Next <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                        ) : (
                            <span className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-3 rounded-xl font-bold text-slate-400 cursor-not-allowed flex items-center gap-2 opacity-50">
                                Next <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </span>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
