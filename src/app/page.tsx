import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">verified</span> Verified by Medical Experts
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 leading-[1.1] tracking-tight">
                Your Trusted Source for <span className="text-primary">Care Product</span> Reviews
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                Empowering families and seniors with expert guides, unbiased comparisons, and the best
                deals on healthcare essentials. We test so you can rest.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary hover:bg-primary/90 text-background-dark px-8 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2">
                  Explore Best Lists <span className="material-symbols-outlined">trending_up</span>
                </button>
                <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary px-8 py-4 rounded-xl font-bold transition-all shadow-sm">
                  View Buying Guides
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
                <img
                  className="w-full h-full object-cover"
                  alt="Senior couple smiling and using a digital tablet together"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuATMYiduC8heJOu_msE-9NoRcueD_tc-wF27PyJZU7jQH7O-IsaRhRb2jv_qyi2LN43xcqe48zGYxYLE6nWqdh4BSK3tXVCNqeJPigudtcXUENHoK2Px19jaMINoNuMBr07643-hj6sX0d8HBoxg7IaUNlh3rzUfrW9lKwOrrbLLzGRnX2FKc_0Knfuq3w9qVA022nwtAHyjW2kB3z9HDBeOnKjZyBKSw-sFxbzboCiqviZIiJ_EYWZ-sEYonGYp9DKbhpN1qQpQ5k"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl max-w-[240px] border border-primary/10">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-white dark:border-slate-800"></div>
                    <div className="w-8 h-8 rounded-full bg-primary/40 border-2 border-white dark:border-slate-800"></div>
                    <div className="w-8 h-8 rounded-full bg-primary/60 border-2 border-white dark:border-slate-800"></div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase">Trusted By 50k+</span>
                </div>
                <p className="text-sm font-semibold leading-snug">"Finding the right wheelchair was finally easy."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Lists Section */}
      <section className="py-16 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">Best Lists of 2026</h2>
              <p className="text-slate-500 mt-2">The highest-rated products in every category.</p>
            </div>
            <a className="text-primary font-bold flex items-center gap-1 hover:underline" href="#">
              View All <span className="material-symbols-outlined">chevron_right</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="High tech medical equipment and accessories for home care"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD0TOUG_s79kMe-WAen48WVLxG5ztIMPNogmDRPSc-jMgPAbX2pA67iQrZo1tMQ3UlDTMWW_c7YqOBtn9VvanQwGWAryGMFkZvxLccuNLuMFK5pSKEmFQjlnapxqEKUrwhC1L_rJiqxEmorP0HGGFoUpcK4XQlVVirYOXVFfLupRWHj-aC4GV91p9dNhjzgwxjLXBXPEkkCJSTjZDoNvS3ZNtG1OoL0ED9CiTmqO4yuaxYmBWQEcgxPXGrIO5jjAbU4mOVl4ocEw4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 p-6">
                <span className="bg-primary text-background-dark text-[10px] font-black uppercase px-2 py-0.5 rounded mb-3 inline-block">
                  New Release
                </span>
                <h3 className="text-xl font-bold text-white">Best of 2026</h3>
              </div>
            </div>
            {/* Card 2 */}
            <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="Comfortable seating and living space designed for elderly"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk8OIjOCWrsrCUSF0UUpd1VETgPsWC6L3H4bC7dRnYOBebyJ2c-ptRj0c1NQTIwP5mPcd9t8NxBGKg86wwpVrEgpsAmqq2VbcUdYkdZ4UNUzIlnlLnbElTpxmI_Y_WsPppYD2ylIZ6HbTzEvjb0hdmkqifZjVImfWbAPD40df4zkCAyaRE_jBL_RlM3_tEbANErheyXjh8BtgrGSDrR2Tq8OkSd-yWy62ZkHCXnphzU57Tdwscq6JkcSC2Hjp4i3Qw0GKTwFVFioM"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 p-6">
                <h3 className="text-xl font-bold text-white">Best for Seniors</h3>
              </div>
            </div>
            {/* Card 3 */}
            <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="Selection of health monitors and budget medical devices"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjxNz5dvRiJsoTeG5WCriIi1iwibt19SOxAUnvr0Fb70GV0AvwA5Z6F14IjrRDZAeu_F_hXf0-VFcyoMoOYzKaXN_vYcoPG8A4gZQTSLHSfrgtzwhVCZbptiLx1amIYehKoWoJbdU5JBwu6qSsweW7ZjV34ueSsSIl7xuSzDCd-0KY31vak-W1IGgTf1eIMYGvmKYTuHVtAWgsC3j6I9BP7_uUEPY6h_hHTLf6Kegr8Gsx4tjLq4cyP7mHAsJEoIyCNptg6UBBqgE"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 p-6">
                <h3 className="text-xl font-bold text-white">Best Budget Picks</h3>
              </div>
            </div>
            {/* Card 4 */}
            <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="Clinician reviewing medical charts with professional equipment"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKByEPzY11MFVX7CRrXRxPTyF42Am9rar4Ju1lkZETfkLmaxAymvjIp2y9gm9y4xPudEbMoxAqEuYHCvCZnEdH4rZgnC2vS2QxJa8gpFDYM1NVqsuKgPrghi6KwyWfnSVTyd9FQyL4A94C2vDAV49cc2CYGhrLWmFmAECPtP8NX0-zTEGlJlBzwlhzdpcyOB-Pt5qpfCGDVJwqIPHzdILr9mkfBEK0oNHbEoIGuNgHx7f4aRkqB-xUjOf4itg2W4GXZNaU3MILpbA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 p-6">
                <h3 className="text-xl font-bold text-white">Editor’s Choice</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black mb-4">Expert Care Guides</h2>
            <p className="text-slate-500">
              In-depth research and step-by-step advice to help you make informed decisions for your loved ones.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background-light dark:bg-slate-800/50 p-8 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all shadow-sm group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-background-dark transition-all">
                <span className="material-symbols-outlined text-3xl">menu_book</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Buying Guides</h3>
              <p className="text-slate-500 mb-6">Learn what to look for when purchasing mobility aids, home care beds, and more.</p>
              <a className="inline-flex items-center text-primary font-bold gap-2" href="#">
                Read Guides <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
            <div className="bg-background-light dark:bg-slate-800/50 p-8 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all shadow-sm group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-background-dark transition-all">
                <span className="material-symbols-outlined text-3xl">lightbulb</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">How-To Guides</h3>
              <p className="text-slate-500 mb-6">Step-by-step instructions on setting up equipment and daily caregiving techniques.</p>
              <a className="inline-flex items-center text-primary font-bold gap-2" href="#">
                Read Guides <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
            <div className="bg-background-light dark:bg-slate-800/50 p-8 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all shadow-sm group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-background-dark transition-all">
                <span className="material-symbols-outlined text-3xl">compare_arrows</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Product Comparisons</h3>
              <p className="text-slate-500 mb-6">Head-to-head battles between the top brands to find the absolute winner.</p>
              <a className="inline-flex items-center text-primary font-bold gap-2" href="#">
                See Comparisons <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-background-dark text-white rounded-[2rem] p-8 lg:p-16 relative overflow-hidden">
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-black mb-6">Don&apos;t Miss Today&apos;s Best Deals</h2>
                <p className="text-slate-400 text-lg mb-8">
                  We track prices across all major retailers to find you the deepest discounts on essential care products.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-primary text-background-dark px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                    Best Deals Today <span className="material-symbols-outlined">sell</span>
                  </button>
                  <button className="bg-transparent border border-slate-700 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                    Seasonal Sales
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <span className="text-primary font-black text-3xl">Up to 40%</span>
                  <p className="text-sm text-slate-400 mt-2">Off Lift Chairs</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <span className="text-primary font-black text-3xl">Save $200</span>
                  <p className="text-sm text-slate-400 mt-2">On Hospital Beds</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <span className="text-primary font-black text-3xl">BOGO 50%</span>
                  <p className="text-sm text-slate-400 mt-2">Compression Gear</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <span className="text-primary font-black text-3xl">Extra 15%</span>
                  <p className="text-sm text-slate-400 mt-2">First Time Orders</p>
                </div>
              </div>
            </div>
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[120px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                className="rounded-[2.5rem] shadow-2xl"
                alt="Healthcare professionals discussing care strategy in a bright office"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDoIJR3IuWvuKZLb0FUsiQseF_z239Cdjk13RBNXDDjhYcuR0MbCKGcZ0VPO5jamM77LHRDjbC53ht-ezQJqSZ56_wYN1pl4C7pbQN1VGwFnbF8VA8cPbqaDlfnKsI-27OATSHmuvwBedAyY2fWLizaC6TywmhnvZ6H0O2xGrEwVbpevCeiXnr0Z_botatNRVLFGOTHUr0jfa7JkLZ9G0in46AKeK9739L6kO8x0oMUvq-rS_JCrfRaXezZWWV_wQnuwxgm9KALsw"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-4xl font-black">Our Mission &amp; Methodology</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                At DistributingCare, we believe everyone deserves access to high-quality healthcare
                information. Our mission is to simplify the complex world of care products through
                rigorous testing and expert review.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <div>
                    <h4 className="font-bold">Unbiased Research</h4>
                    <p className="text-sm text-slate-500">
                      We do not accept paid reviews. Every product is evaluated based on performance, durability, and user feedback.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <div>
                    <h4 className="font-bold">Medical Review Board</h4>
                    <p className="text-sm text-slate-500">
                      All health-related guides are reviewed by licensed medical professionals for accuracy and safety.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <div>
                    <h4 className="font-bold">Real-World Testing</h4>
                    <p className="text-sm text-slate-500">
                      We test products in home environments to see how they perform in real-life scenarios.
                    </p>
                  </div>
                </li>
              </ul>
              <button className="bg-primary/10 text-primary hover:bg-primary hover:text-background-dark px-8 py-3 rounded-xl font-bold transition-all inline-block">
                Meet the Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
