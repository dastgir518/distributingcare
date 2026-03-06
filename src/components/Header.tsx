import Link from 'next/link';
import { getMenu } from '@/lib/wp';
import Navigation from '@/components/Navigation';

export default async function Header() {
    // Fetch Menu ID 7 from WordPress
    const topMenu = await getMenu(7);

    return (
        <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-primary/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link className="flex items-center gap-2" href="/">
                            <span className="material-symbols-outlined text-primary text-3xl">medical_services</span>
                            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">DistributingCare</span>
                        </Link>
                        <Navigation menuItems={topMenu} />
                    </div>
                    {/* Search and Best Reviews CTA - Hidden on very small screens to make room for hamburger */}
                    <div className="hidden lg:flex items-center gap-4">
                        <div className="flex items-center bg-primary/5 dark:bg-primary/10 rounded-lg px-3 py-1.5 border border-primary/20">
                            <span className="material-symbols-outlined text-slate-500 text-xl">search</span>
                            <input
                                className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-slate-400 outline-none"
                                placeholder="Search guides..." type="text"
                            />
                        </div>
                        <button className="bg-primary hover:bg-primary/90 text-background-dark px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-sm">
                            Best Reviews
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
