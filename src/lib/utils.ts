export function calculateReadingTime(text: string): number {
    const wordsPerMinute = 200;
    // Strip HTML tags using regex before calculating
    const cleanText = text.replace(/<[^>]*>?/gm, '');
    const noOfWords = cleanText.split(/\s+/).length;
    return Math.max(1, Math.ceil(noOfWords / wordsPerMinute));
}

export function stripHtml(html: string): string {
    return html.replace(/<[^>]*>?/gm, '');
}
