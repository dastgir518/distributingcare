'use server';

import { revalidatePath } from 'next/cache';

export async function purgeCache(path?: string) {
    try {
        if (path) {
            // Revalidate a specific path
            revalidatePath(path);
        } else {
            // Purge the entire site cache by revalidating the root layout
            revalidatePath('/', 'layout');
        }
        return {
            success: true,
            message: `Successfully purged cache${path ? ` for path: ${path}` : ' for the entire site'}.`
        };
    } catch (error) {
        console.error('Failed to purge cache:', error);
        return {
            success: false,
            message: 'An error occurred while attempting to purge the cache.'
        };
    }
}
