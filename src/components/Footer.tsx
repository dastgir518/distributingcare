import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    <div className="col-span-2">
                        <Link className="flex items-center gap-2 mb-6" href="/">
                            <span className="material-symbols-outlined text-primary text-3xl">medical_services</span>
                            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">DistributingCare</span>
                        </Link>
                        <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                            Providing the most comprehensive, researched-backed reviews for home health and care
                            products. Helping you care for those you love.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all" href="#">
                                <span className="material-symbols-outlined">share</span>
                            </a>
                            <a className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all" href="#">
                                <span className="material-symbols-outlined">mail</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Explore</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link className="hover:text-primary" href="/blog">All Posts</Link></li>
                            <li><Link className="hover:text-primary" href="#">Mobility Aids</Link></li>
                            <li><Link className="hover:text-primary" href="#">Sleep Support</Link></li>
                            <li><Link className="hover:text-primary" href="#">Therapy Units</Link></li>
                            <li><Link className="hover:text-primary" href="#">Bathroom Safety</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a className="hover:text-primary" href="#">About Us</a></li>
                            <li><a className="hover:text-primary" href="#">Editorial Team</a></li>
                            <li><a className="hover:text-primary" href="#">Medical Review</a></li>
                            <li><a className="hover:text-primary" href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a className="hover:text-primary" href="#">Privacy Policy</a></li>
                            <li><a className="hover:text-primary" href="#">Terms of Service</a></li>
                            <li><a className="hover:text-primary" href="#">Affiliate Disclosure</a></li>
                            <li><a className="hover:text-primary" href="#">Accessibility</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <p>© 2026 DistributingCare. All rights reserved. Prices and availability are subject to change.</p>
                    <p>Designed for better caregiving.</p>
                </div>
            </div>
        </footer>
    );
}
