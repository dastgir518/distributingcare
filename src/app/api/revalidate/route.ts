import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
    try {
        const secret = req.headers.get('x-webhook-secret');

        // Security verification
        if (secret !== process.env.REVALIDATE_SECRET) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        const body = await req.json();
        const { slug, type, categories } = body;

        if (!slug) {
            return NextResponse.json({ message: 'Missing slug' }, { status: 400 });
        }

        // Always revalidate global posts list when any post changes
        revalidateTag('posts');

        // Revalidate the specific post
        if (type === 'post') {
            revalidateTag(`post-${slug}`);
        }

        // Revalidate affected categories
        if (categories && Array.isArray(categories)) {
            categories.forEach((catSlug: string) => revalidateTag(`category-${catSlug}`));
        }

        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        console.error('Revalidation error:', err);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}
