import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'About Us | DistributingCare',
    description:
        'Distributing Care is a healthcare and wellbeing affiliate website dedicated to helping people discover useful products across mobility, sleep, herbal wellness, pain relief, and hydration.',
};

export default function AboutPage() {
    return (
        <div className="bg-white text-slate-900 antialiased">

            {/* ── Hero ── */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">

                        {/* Left copy */}
                        <div className="w-full md:w-3/5">
                            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-black text-[10px] tracking-[0.15em] rounded-full uppercase mb-6">
                                Our Story
                            </span>
                            <h1 className="text-[3.5rem] md:text-[4.5rem] font-[900] leading-[1.05] tracking-tighter text-slate-900 mb-8">
                                About{' '}
                                <span className="text-primary">Distributing Care</span>
                            </h1>
                            <p className="text-xl leading-relaxed text-slate-500 max-w-2xl">
                                Distributing Care is a healthcare and wellbeing affiliate website dedicated to helping people discover useful products across important areas of everyday care. We create clear, practical content around categories such as mobility, sleep, herbal and natural wellness, pain relief, and hydration solutions, making it easier to explore products and compare options in one place.
                            </p>
                        </div>

                        {/* Right image */}
                        <div className="w-full md:w-2/5 relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 aspect-[4/5]">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzUxwUfhDkUGk-zztCAFvV95Z24O-rfR-omPi38AnWJbu-Qv_27mb0UJqpht7xGTgXLDp8MQ4e0sEp2Kcf4pzk61XuMC3iaORDLHfnzx31qXKCHtN_o7Er6_xzFGTY6_hnIwjWJb1XsyqUjbs4oCT9Q-a9DSu9KPYK3vRmz9QCcNWZ5IftfcySq8NoousIbAXnzepCOynlnMNnVPAc5YSJpd8YF261L6B1A8tWAjm3KcEnHbl_beAdBO57ieV0WPXc4Bb4m0ikQvw"
                                    alt="Healthcare provider holding an elderly person's hand with compassion"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            {/* Badge */}
                            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl max-w-[200px]">
                                <div className="flex items-center gap-2 mb-2">
                                    <span
                                        className="material-symbols-outlined text-primary"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        verified
                                    </span>
                                    <span className="font-black text-[10px] tracking-widest uppercase">
                                        Verified Expert
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 font-medium leading-snug">
                                    Helpful content for better everyday support.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Mission ── */}
            <section className="bg-slate-50 py-24">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-sm relative overflow-hidden border border-primary/10">
                        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                            <div className="w-full h-full bg-primary transform skew-x-12 translate-x-1/2" />
                        </div>
                        <div className="relative z-10 max-w-3xl">
                            <h2 className="text-4xl font-[800] tracking-tight mb-8">Our Mission</h2>
                            <p className="text-2xl leading-relaxed font-light text-slate-700 italic">
                                &ldquo;Our mission is to make healthcare and wellbeing product discovery simpler, clearer, and more accessible. We want to help readers navigate a wide range of options with greater confidence by creating content that is useful, easy to understand, and focused on real everyday needs.&rdquo;
                            </p>
                            <p className="mt-6 text-lg text-slate-500 leading-relaxed">
                                Distributing Care is built around the idea that better information leads to better choices, especially in areas connected to comfort, support, and quality of life.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Focus Areas Bento Grid ── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">

                        {/* Sidebar */}
                        <div className="lg:w-1/3 lg:sticky lg:top-32">
                            <div className="mb-6">
                                <h2 className="text-3xl font-[800] tracking-tight text-slate-900 mb-4">
                                    What We Do &amp; Our Focus Areas
                                </h2>
                                <div className="h-1.5 w-16 bg-primary rounded-full" />
                            </div>
                            <p className="text-slate-500 leading-relaxed">
                                At Distributing Care, we publish helpful content that makes product research easier — buying guides, product roundups, comparisons, and informational blog content focused on health, wellness, and care-related products.
                            </p>
                        </div>

                        {/* Bento grid */}
                        <div className="lg:w-2/3 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[160px]">

                                {/* Mobility — full width */}
                                <div className="md:col-span-2 row-span-1 bg-slate-50 rounded-2xl p-6 flex items-center justify-between relative overflow-hidden group border border-primary/10">
                                    <div className="relative z-10 flex flex-col justify-center h-full">
                                        <h3 className="text-xl font-[700] mb-1">Mobility</h3>
                                        <p className="text-sm text-slate-500 max-w-sm">
                                            Products that support movement, accessibility, safety, and independence.
                                        </p>
                                    </div>
                                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-3xl text-primary">accessible</span>
                                    </div>
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </div>

                                {/* Sleep */}
                                <div className="bg-slate-100 rounded-2xl p-5 flex flex-col justify-between border border-primary/10">
                                    <span className="material-symbols-outlined text-2xl text-primary">bedtime</span>
                                    <div>
                                        <h3 className="text-lg font-[700] mb-1">Sleep</h3>
                                        <p className="text-xs text-slate-500 leading-tight">
                                            Products that help improve rest, comfort, and recovery.
                                        </p>
                                    </div>
                                </div>

                                {/* Pain Relief */}
                                <div className="bg-white rounded-2xl p-5 border border-primary/10 flex flex-col justify-between hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-xl text-primary">healing</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-[700] mb-1 text-slate-900">Pain Relief</h3>
                                        <p className="text-xs text-slate-500 leading-tight">
                                            Products designed to support comfort and ease day-to-day discomfort.
                                        </p>
                                    </div>
                                </div>

                                {/* Natural Wellness */}
                                <div className="bg-slate-900 text-white rounded-2xl p-5 flex flex-col justify-end overflow-hidden relative group">
                                    <Image
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB5upzh3c9ZYYWb05H9IAh8uYABLLQfVOQV1kgQPe525aSELS2Ei4Rub77BzB6N4YYay7tG56frflEt6iVd-haPSSkMe7DzWvdia1Ag4O7AAQrlvT0Yt_SeM_a1vwH3o-E4hQ-T1wjs8Gp0WrY_jUo7SMUvkk8vHJDw9-xcOvxPyMqNGI9D8Zyz_ZNd2izION220wV5Bbc4p1UMggRS-EFZ-tgKhP1O51ThpOZKkOdDxir2yeWdU_RFYEOKqL1oj3IZTTaomcn2q4"
                                        alt="Natural Wellness"
                                        fill
                                        className="object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                                        unoptimized
                                    />
                                    <div className="relative z-10">
                                        <span className="material-symbols-outlined text-2xl text-primary">eco</span>
                                        <h3 className="text-lg font-[700] mt-1 mb-0">Herbal &amp; Natural Wellness</h3>
                                    </div>
                                </div>

                                {/* Hydration */}
                                <div className="bg-slate-100 rounded-2xl p-5 flex flex-col justify-between border border-primary/10">
                                    <span
                                        className="material-symbols-outlined text-2xl text-primary"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        water_drop
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-[700] mb-1">Hydration &amp; Water Solutions</h3>
                                        <p className="text-xs text-slate-500 leading-tight">
                                            Products that support better hydration, water quality, and healthier routines.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── How We Choose ── */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row gap-16 items-start">

                        {/* Sticky left */}
                        <div className="md:w-1/2 md:sticky md:top-32">
                            <h2 className="text-4xl font-[800] tracking-tight text-slate-900 mb-8 leading-tight">
                                How We Choose What to Feature
                            </h2>
                            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                                We aim to feature products that are relevant, practical, and aligned with the needs of the reader. Our focus is on presenting products in a way that helps readers make more informed decisions, rather than simply listing options without context.
                            </p>
                            <div className="flex flex-col gap-6">
                                {[
                                    {
                                        n: '1',
                                        title: 'Product Purpose & Features',
                                        desc: 'We assess how well a product fulfils its intended purpose and what features set it apart.',
                                    },
                                    {
                                        n: '2',
                                        title: 'Ease of Use & Value',
                                        desc: 'Practical usability and fair pricing are key factors in every product we consider.',
                                    },
                                    {
                                        n: '3',
                                        title: 'Brand Reputation & Relevance',
                                        desc: 'We consider brand credibility and how well each product aligns with the topic being covered.',
                                    },
                                ].map(({ n, title, desc }) => (
                                    <div key={n} className="flex gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                                            {n}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">{title}</h4>
                                            <p className="text-slate-500">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right */}
                        <div className="md:w-1/2">
                            <div className="bg-white rounded-[2rem] p-8 border border-primary/10 shadow-sm mb-8">
                                <h3 className="text-2xl font-[800] mb-4">Our Commitment to Transparency</h3>
                                <p className="text-slate-500 leading-relaxed mb-6">
                                    Distributing Care is committed to clear, honest, and useful content. We aim to be transparent about what we cover and how our website works, so readers can understand the purpose of our content and use it with confidence.
                                </p>
                                <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-primary">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="material-symbols-outlined text-sm font-bold text-slate-700">info</span>
                                        <span className="text-[10px] uppercase tracking-widest font-black">
                                            Affiliate Disclosure
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 italic leading-relaxed">
                                        Some links on our website may be affiliate links, which means we may earn a commission if a purchase is made through them, at no extra cost to the reader. Our goal is to keep our content straightforward, relevant, and helpful for anyone exploring products in mobility, sleep, herbal and natural wellness, pain relief, hydration, and related areas of healthcare and wellbeing.
                                    </p>
                                </div>
                            </div>
                            <div className="rounded-[2rem] overflow-hidden aspect-video relative">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjyQ64zP1lWxWYrYxVnEEZAUUTcq8ASsdeKJ-ejsoZIER-1AcTMVsmUbnAmIj0ks8qu496Rv3qtswTXLUA3sK-2oY4sRjzGNXQk6yYY4xKcvqWAWG1aNum1OBRX_3SXXlxnRY_obXZtnVzH4hNhMLLABtWfjKKEN6qq78q-bY951LC0t9HtNomFGHe6I37xDaE-a8POumOrFrcNb1i6WYs6D5h631lKLr9mrPbgUGXagXff023PBTuvG3vDwxItm2RwGV5FXsr1r0"
                                    alt="Interior of a modern clean research laboratory"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Final CTA ── */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at center, #f49d25 0%, transparent 70%)' }}
                />
                <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
                    <h2 className="text-5xl font-[900] tracking-tighter mb-8">
                        Start exploring{' '}
                        <span className="text-primary">care products.</span>
                    </h2>
                    <p className="text-xl text-slate-500 mb-12">
                        Our goal is to bring mobility, sleep, wellness, pain relief, and hydration together under one platform so you can discover relevant products more easily.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-primary text-white font-bold px-10 py-5 rounded-2xl shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1 transition-all text-lg">
                            Explore Care Guides
                        </button>
                        <button className="bg-white text-slate-900 font-bold px-10 py-5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all text-lg">
                            Contact Our Experts
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
