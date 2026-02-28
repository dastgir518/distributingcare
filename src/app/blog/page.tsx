import Link from 'next/link';
import Image from 'next/image';
import { getPosts } from '@/lib/wp';
import { stripHtml } from '@/lib/utils';

export const metadata = {
    title: 'Blog | Headless WP Next.js',
    description: 'Read the latest articles on our headless Next.js blog',
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
            <div className="max-w-4xl mx-auto py-12 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Blog</h1>
                <p className="text-zinc-500">No posts found.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-extrabold mb-10 tracking-tight">Latest Articles</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {posts.map((post) => {
                    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
                    return (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 bg-white dark:bg-zinc-950"
                        >
                            {featuredMedia && (
                                <div className="relative h-56 w-full overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
                                    <Image
                                        src={featuredMedia.source_url}
                                        alt={featuredMedia.alt_text || post.title.rendered}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-500"
                                    />
                                </div>
                            )}
                            <div className="p-6 flex flex-col flex-grow">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 font-medium">
                                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                                <h2
                                    className="text-xl font-bold mb-3 line-clamp-2 text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 transition"
                                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                />
                                <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3 flex-grow">
                                    {stripHtml(post.excerpt.rendered)}
                                </p>

                                <div className="mt-6 text-sm font-semibold text-blue-600 flex items-center">
                                    Read article &rarr;
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center gap-4 mt-8">
                    {page > 1 ? (
                        <Link href={`/blog?page=${page - 1}`} className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition font-medium">
                            Previous
                        </Link>
                    ) : <span className="px-6 py-3 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-400 cursor-not-allowed font-medium">Previous</span>}
                    {page < totalPages ? (
                        <Link href={`/blog?page=${page + 1}`} className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 border-transparent hover:opacity-90">
                            Next
                        </Link>
                    ) : <span className="px-6 py-3 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-400 cursor-not-allowed font-medium">Next</span>}
                </div>
            )}
        </div>
    );
}
