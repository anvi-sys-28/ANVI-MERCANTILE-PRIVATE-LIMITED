import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/global/SEO';
import { blogPostsData } from '@/data/blogPostsData';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredPosts = blogPostsData.filter(
    (post) => selectedCategory === 'ALL' || post.category === selectedCategory
  );

  return (
    <>
      <SEO
        title="Global Trade Insights & Customs Compliance Articles"
        description="Expert analysis on international logistics, FTA tariffs, CEPA agreements, port operations, and Incoterm strategies."
      />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#0b3a40] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#0f5c66_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[#c9a46b] text-xs font-bold font-headline uppercase tracking-widest block">
            TRADE KNOWLEDGE HUB
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-headline uppercase tracking-tight text-white leading-none">
            TRADE INSIGHTS & ARTICLES
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl font-sans">
            Actionable intelligence for trade executives, supply chain directors, and manufacturers navigating global corridors.
          </p>
        </div>
      </section>

      {/* Filter & Grid Section */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#0b3a40]/10">
            <span className="text-xs font-bold font-headline uppercase text-[#0b3a40]">
              FILTER BY CATEGORY:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'ALL ARTICLES', val: 'ALL' },
                { label: 'CUSTOMS & COMPLIANCE', val: 'Customs & Compliance' },
                { label: 'LOGISTICS STRATEGY', val: 'Logistics Strategy' },
                { label: 'TRADE ROUTES', val: 'Trade Routes' },
              ].map((btn) => (
                <button
                  key={btn.val}
                  onClick={() => setSelectedCategory(btn.val)}
                  className={`px-3 py-1.5 rounded text-xs font-bold font-headline uppercase tracking-wider transition-all ${
                    selectedCategory === btn.val
                      ? 'bg-[#0b3a40] text-[#c9a46b] shadow'
                      : 'bg-white text-[#0b3a40] border border-[#0b3a40]/10 hover:border-[#c9a46b]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl overflow-hidden border border-[#0b3a40]/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      width="600"
                      height="400"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-[#0b3a40] text-[#c9a46b] text-[10px] font-bold font-headline uppercase px-3 py-1 rounded shadow">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-[11px] text-[#1a1f23]/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#c9a46b]" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#c9a46b]" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold font-headline uppercase text-[#0b3a40] group-hover:text-[#c9a46b] transition-colors leading-snug line-clamp-2">
                      <Link to={`/insights/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs text-[#1a1f23]/75 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-transparent flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#0f5c66] flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#c9a46b]" />
                    {post.author}
                  </span>
                  <Link
                    to={`/insights/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold font-headline uppercase tracking-wider text-[#0b3a40] group-hover:text-[#c9a46b] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#c9a46b]" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}
