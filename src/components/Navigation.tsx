'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WP_MenuItem } from '@/types/wp';

interface NavigationProps {
    menuItems: WP_MenuItem[];
}

export default function Navigation({ menuItems }: NavigationProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState<number[]>([]);

    const toggleDropdown = (id: number) => {
        setOpenDropdowns(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const getRelativeUrl = (url: string) => {
        try {
            const urlObj = new URL(url);
            // Return only the path, query string, and hash
            return urlObj.pathname + urlObj.search + urlObj.hash;
        } catch {
            return url; // Return as is if it's already relative or invalid
        }
    };

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
                {menuItems.length > 0 ? (
                    menuItems.map((item) => (
                        <div key={item.id} className="relative group p-2 -m-2">
                            {item.children && item.children.length > 0 ? (
                                <>
                                    <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                                        {item.title} <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
                                    </button>

                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="py-2">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.id}
                                                    href={getRelativeUrl(child.url)}
                                                    className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-primary/5 hover:text-primary transition-colors"
                                                >
                                                    {child.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <Link href={getRelativeUrl(item.url)} className="text-sm font-medium hover:text-primary transition-colors">
                                    {item.title}
                                </Link>
                            )}
                        </div>
                    ))
                ) : (
                    <>
                        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Mobility</Link>
                        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Senior Living</Link>
                        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Pain Relief</Link>
                        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Sleep</Link>
                        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Fitness</Link>
                    </>
                )}
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
            >
                <span className="material-symbols-outlined text-3xl">
                    {isMobileMenuOpen ? 'close' : 'menu'}
                </span>
            </button>

            {/* Mobile Navigation overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-y-auto max-h-[calc(100vh-4rem)] z-40">
                    <div className="px-4 py-6 space-y-4">
                        {/* Mobile Search - Only visible on small screens (md and below hide the header search) */}
                        <div className="md:hidden flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2 mb-6">
                            <span className="material-symbols-outlined text-slate-500 text-xl">search</span>
                            <input
                                className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400 outline-none ml-2"
                                placeholder="Search guides..." type="text"
                            />
                        </div>

                        {menuItems.length > 0 ? (
                            menuItems.map((item) => (
                                <div key={`mobile-${item.id}`} className="border-b border-slate-100 dark:border-slate-800 pb-2">
                                    {item.children && item.children.length > 0 ? (
                                        <div>
                                            <button
                                                onClick={() => toggleDropdown(item.id)}
                                                className="flex items-center justify-between w-full py-2 text-base font-bold hover:text-primary transition-colors"
                                            >
                                                {item.title}
                                                <span className={`material-symbols-outlined text-lg transition-transform ${openDropdowns.includes(item.id) ? 'rotate-180' : ''}`}>
                                                    expand_more
                                                </span>
                                            </button>

                                            {/* Mobile Dropdown Children */}
                                            {openDropdowns.includes(item.id) && (
                                                <div className="pl-4 py-2 space-y-3 border-l-2 border-primary/20 ml-2 mt-2">
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={`mobile-child-${child.id}`}
                                                            href={getRelativeUrl(child.url)}
                                                            className="block py-1 text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {child.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            href={getRelativeUrl(item.url)}
                                            className="block py-2 text-base font-bold hover:text-primary transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.title}
                                        </Link>
                                    )}
                                </div>
                            ))
                        ) : (
                            // Fallback
                            <div className="space-y-4">
                                <Link href="#" className="block py-2 text-base font-bold hover:text-primary transition-colors">Mobility</Link>
                                <Link href="#" className="block py-2 text-base font-bold hover:text-primary transition-colors">Senior Living</Link>
                                <Link href="#" className="block py-2 text-base font-bold hover:text-primary transition-colors">Pain Relief</Link>
                            </div>
                        )}

                        <button className="w-full mt-6 bg-primary hover:bg-primary/90 text-background-dark px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-sm">
                            Best Reviews
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
