'use client';

import { useState } from 'react';
import { purgeCache } from './actions';

export default function CachePurgePage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [path, setPath] = useState('');

    const handlePurge = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Pass the path if the user typed one, otherwise it purges the whole site
            const reqPath = path.trim() || undefined;
            const result = await purgeCache(reqPath);
            setMessage(result.message);
        } catch (err) {
            setMessage('Failed to execute purge action.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-10">
            <div className="rounded-2xl border border-primary/20 bg-white dark:bg-background-dark/80 p-8 shadow-xl">
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                        <span className="material-symbols-outlined text-2xl font-bold">delete_sweep</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight lg:text-3xl">Purge Cache</h1>
                        <p className="text-sm text-slate-500 mt-1">Clear Next.js App Router Data Cache manually.</p>
                    </div>
                </div>

                <form onSubmit={handlePurge} className="space-y-6 mt-8">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                            Path to Purge (Optional)
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-3 text-sm focus:border-primary focus:ring-primary focus:outline-none"
                            placeholder="e.g. /blog/my-post-slug"
                            value={path}
                            onChange={(e) => setPath(e.target.value)}
                        />
                        <p className="mt-2 text-xs text-slate-500">
                            Leave this blank to flush the <strong>entire</strong> site cache.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-3 px-6 text-sm font-bold text-background-dark transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90 shadow-lg shadow-primary/20'
                            }`}
                    >
                        {loading ? (
                            <span className="material-symbols-outlined animate-spin">refresh</span>
                        ) : (
                            <span className="material-symbols-outlined">delete</span>
                        )}
                        {loading ? 'Purging Cache...' : 'Purge Cache Now'}
                    </button>
                </form>

                {message && (
                    <div className={`mt-6 rounded-lg p-4 text-sm font-medium ${message.includes('Successfully') ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-800' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800'}`}>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">
                                {message.includes('Successfully') ? 'check_circle' : 'error'}
                            </span>
                            {message}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
