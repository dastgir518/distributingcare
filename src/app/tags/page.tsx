import Link from 'next/link';
import { Metadata } from 'next';
import { getTags } from '@/lib/wp';

export const metadata: Metadata = {
    title: 'All Tags | DistributingCare',
    description: 'Browse all content tags on DistributingCare — from Best Budget Picks and Best for Seniors to Editor\'s Choice and Best of 2026.',
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://distributingcare.com'}/tags`,
    },
};

// Icon map per known tag slug
const TAG_ICONS: Record<string, string> = {
    'best-budget-picks': 'savings',
    'best-for-seniors': 'elderly',
    'best-of-2026': 'emoji_events',
    'editors-choice': 'workspace_premium',
};

// Human-readable label map
const TAG_LABELS: Record<string, string> = {
    'best-budget-picks': 'Best Budget Picks',
    'best-for-seniors': 'Best for Seniors',
    'best-of-2026': 'Best of 2026',
    'editors-choice': "Editor's Choice",
};

// Gradient/colour accent per tag (cycles for unknown tags)
const ACCENTS = [
    'from-primary/20 to-primary/5 border-primary/30',
    'from-sky-500/20 to-sky-500/5 border-sky-400/30',
    'from-violet-500/20 to-violet-500/5 border-violet-400/30',
    'from-emerald-500/20 to-emerald-500/5 border-emerald-400/30',
    'from-rose-500/20 to-rose-500/5 border-rose-400/30',
    'from-amber-500/20 to-amber-500/5 border-amber-400/30',
];

export default async function TagsPage() {
    const tags = await getTags();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="flex gap-2 text-sm mb-8 text-slate-500">
                <Link href="/" className="hover:text-primary font-medium">Home</Link>
                <span>/</span>
                <span className="text-slate-900 dark:text-slate-100 font-medium">All Tags</span>
            </nav>

            {/* Header */}
            <div className="mb-12">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-black text-[10px] tracking-[0.15em] rounded-full uppercase mb-4">
                    Browse Collections
                </span>
                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-4">
                    All Tags
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl">
                    Explore our curated content collections. Each tag groups expert-reviewed articles and guides around a specific theme.
                </p>
            </div>

            {/* Tags grid */}
            {!tags.length ? (
                <div className="py-24 text-center">
                    <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">label</span>
                    <p className="text-slate-500 text-lg">No tags found.</p>
                    <Link href="/" className="mt-6 inline-block text-primary font-bold hover:underline">
                        Back to Home
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tags.map((tag, index) => {
                        const label = TAG_LABELS[tag.slug] || tag.name;
                        const icon = TAG_ICONS[tag.slug] || 'label';
                        const accent = ACCENTS[index % ACCENTS.length];

                        return (
                            <Link
                                key={tag.id}
                                href={`/tag/${tag.slug}`}
                                className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br border transition-all hover:-translate-y-1 hover:shadow-lg ${accent}`}
                            >
                                {/* Post count badge */}
                                {tag.count > 0 && (
                                    <span className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full border border-slate-200/50">
                                        {tag.count} {tag.count === 1 ? 'post' : 'posts'}
                                    </span>
                                )}

                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-white/60 dark:bg-slate-900/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-2xl text-primary">{icon}</span>
                                </div>

                                {/* Label + arrow */}
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors">
                                        {label}
                                    </h2>
                                    {tag.description && (
                                        <p className="text-sm text-slate-500 line-clamp-2 mb-3">{tag.description}</p>
                                    )}
                                    <span className="inline-flex items-center gap-1 text-primary text-sm font-bold">
                                        Browse articles
                                        <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                                            arrow_forward
                                        </span>
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
