import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug } from '@/lib/wp';
import { stripHtml } from '@/lib/utils';
import Link from 'next/link';

export async function generateMetadata(
    props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    const excerpt = stripHtml(post.excerpt.rendered);
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return {
        title: `${post.title.rendered} | DistributingCare`,
        description: excerpt,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://distributingcare.com'}/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title.rendered,
            description: excerpt,
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://distributingcare.com'}/blog/${post.slug}`,
            type: 'article',
            images: featuredImage ? [{ url: featuredImage }] : [],
        },
    };
}

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const editorTeam = post.editor_team || 'Health Editorial Team';
    const readTime = post.read_time || '10 min read';
    const products = post.review_products || [];

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    return (
        <main className="mx-auto w-full max-w-[1280px] px-6 py-8 lg:px-10">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <Link className="hover:text-primary" href="/">Home</Link>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <Link className="hover:text-primary" href="/blog">Blog</Link>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-slate-900 dark:text-slate-100 font-medium line-clamp-1" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></span>
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <section className="mb-12">
                        <h1 className="text-4xl font-black leading-tight tracking-tight lg:text-5xl" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
                        <div className="mt-6 flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-sm">edit</span>
                                </div>
                                <span className="text-sm font-medium">{editorTeam}</span>
                            </div>
                            <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                            <span className="text-sm">{formattedDate}</span>
                            <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                            <span className="text-sm">{readTime}</span>
                        </div>
                    </section>



                    {products && products.length > 0 && (
                        <section className="mb-16">
                            <div className="mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">equalizer</span>
                                <h2 className="text-2xl font-bold">Quick Comparison</h2>
                            </div>
                            <div className="overflow-x-auto rounded-xl border border-primary/20 bg-white dark:bg-background-dark/50">
                                <table className="w-full min-w-[600px] text-left border-collapse">
                                    <thead>
                                        <tr className="bg-primary/5 text-sm font-semibold border-b border-primary/10">
                                            <th className="px-6 py-4">Product</th>
                                            <th className="px-6 py-4">Key Feature</th>
                                            <th className="px-6 py-4">Price Range</th>
                                            <th className="px-6 py-4">Rating</th>
                                            <th className="px-6 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-primary/5">
                                        {products.map((product, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-5 font-bold">{product.name}</td>
                                                <td className="px-6 py-5 text-sm">{product.key_feature}</td>
                                                <td className="px-6 py-5 text-sm">{product.price_range}</td>
                                                <td className="px-6 py-5">
                                                    <div className="flex text-primary">
                                                        {Array.from({ length: 5 }).map((_, r) => {
                                                            if (r < Math.floor(product.rating)) {
                                                                return <span key={r} className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>;
                                                            } else if (r < product.rating) {
                                                                return <span key={r} className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>star_half</span>;
                                                            } else {
                                                                return <span key={r} className="material-symbols-outlined text-slate-300 dark:text-slate-700">star</span>;
                                                            }
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-sm">
                                                    <a className="text-primary font-bold hover:underline" href={`#product-${index}`}>View</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    <div className="space-y-16">
                        {products && products.length > 0 && products.map((product, index) => (
                            <section key={index} className="scroll-mt-24" id={`product-${index}`}>
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="text-3xl font-bold">{index + 1}. {product.name}</h3>
                                </div>
                                <div className="grid gap-8 md:grid-cols-2">
                                    <div className="overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 aspect-video relative group">
                                        {product.image_url ? (
                                            <Image
                                                alt={product.image_alt || product.name}
                                                className="h-full w-full object-cover grayscale opacity-80"
                                                src={product.image_url}
                                                fill
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="flex w-full h-full items-center justify-center bg-slate-100 dark:bg-slate-700">
                                                <span className="material-symbols-outlined text-4xl text-slate-400">image</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-primary/10 transition-opacity group-hover:opacity-0"></div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                                            {product.description}
                                        </p>
                                        <div className="mt-8 grid grid-cols-2 gap-4">
                                            {product.pros && product.pros.length > 0 && (
                                                <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
                                                    <h4 className="mb-2 flex items-center gap-1 font-bold text-green-700 dark:text-green-400">
                                                        <span className="material-symbols-outlined text-sm">check_circle</span> Pros
                                                    </h4>
                                                    <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                                                        {product.pros.map((pro, pidx) => (
                                                            <li key={pidx}>{pro}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {product.cons && product.cons.length > 0 && (
                                                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
                                                    <h4 className="mb-2 flex items-center gap-1 font-bold text-red-700 dark:text-red-400">
                                                        <span className="material-symbols-outlined text-sm">cancel</span> Cons
                                                    </h4>
                                                    <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                                                        {product.cons.map((con, cidx) => (
                                                            <li key={cidx}>{con}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                        {product.affiliate_link && (
                                            <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer" className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 font-bold text-background-dark shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                                                <span>Check Price</span>
                                                <span className="material-symbols-outlined text-xl">shopping_cart</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>
                </div>

                <aside className="lg:col-span-4">
                    <div className="sticky top-28 space-y-8">
                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">mail</span>
                                <h4 className="text-lg font-bold">Newsletter</h4>
                            </div>
                            <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
                                Get expert-reviewed guides delivered weekly to your inbox.
                            </p>
                            <form className="space-y-3">
                                <input
                                    className="w-full rounded-lg border border-primary/20 bg-white dark:bg-background-dark p-3 text-sm focus:border-primary focus:ring-primary focus:outline-none"
                                    placeholder="Enter your email" type="email" />
                                <button
                                    type="button"
                                    className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-background-dark hover:bg-primary/90 transition-all">
                                    Sign Up Now
                                </button>
                            </form>
                        </div>
                        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                            <h4 className="mb-6 text-lg font-bold">Related Guides</h4>
                            <div className="space-y-4">
                                <a className="group flex items-start gap-3" href="#">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/20">
                                        <span className="material-symbols-outlined text-primary">accessible_forward</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold leading-tight group-hover:text-primary">Best Manual Wheelchairs for Active Seniors</p>
                                        <p className="mt-1 text-xs text-slate-500">8 min read</p>
                                    </div>
                                </a>
                                <a className="group flex items-start gap-3" href="#">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/20">
                                        <span className="material-symbols-outlined text-primary">stairs</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold leading-tight group-hover:text-primary">The Ultimate Stair Lift Buying Guide 2026</p>
                                        <p className="mt-1 text-xs text-slate-500">15 min read</p>
                                    </div>
                                </a>
                                <a className="group flex items-start gap-3" href="#">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/20">
                                        <span className="material-symbols-outlined text-primary">health_and_safety</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold leading-tight group-hover:text-primary">5 Essential Fall Prevention Tips for Your Home</p>
                                        <p className="mt-1 text-xs text-slate-500">6 min read</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background-dark p-6 text-white text-center relative">
                            <div className="relative z-10">
                                <span className="material-symbols-outlined text-primary text-4xl mb-2">emergency</span>
                                <h4 className="text-lg font-bold">Expert Consultation</h4>
                                <p className="mt-2 text-sm text-slate-400">Need help choosing the right equipment? Our experts are here.</p>
                                <button className="mt-6 w-full rounded-lg bg-primary py-3 text-sm font-bold text-background-dark hover:bg-primary/90 transition-all">
                                    Book Free Call
                                </button>
                            </div>
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent">
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}

