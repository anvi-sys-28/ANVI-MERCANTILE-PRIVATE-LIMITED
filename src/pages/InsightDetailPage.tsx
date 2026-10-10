import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '@/components/global/SEO';
import { blogPostsData } from '@/data/blogPostsData';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

export default function InsightDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/insights" replace />;
  }

  const relatedPosts = blogPostsData.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        ogImage={post.image}
        ogType="article"
      />

      {/* Hero Header */}
      <section className="relative pt-36 pb-16 bg-[#0b3a40] text-white overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          width="2000"
          height="1000"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-xs font-bold font-headline uppercase text-[#c9a46b] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="bg-[#0f5c66] text-[#c9a46b] text-xs font-bold font-headline uppercase px-3 py-1 rounded border border-[#c9a46b]/40">
              {post.category}
            </span>
            <span className="text-xs text-white/70 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#c9a46b]" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-headline uppercase tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-white/80 pt-2 border-t border-white/10">
            <span className="flex items-center gap-1.5 font-medium">
              <User className="w-4 h-4 text-[#c9a46b]" />
              {post.author} ({post.authorRole})
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-[#c9a46b]" />
              {post.date}
            </span>
          </div>
        </div>
      </section>

      {/* Main Article Body */}
      <section className="py-16 bg-[#f7f5f0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#0b3a40]/10 shadow-lg space-y-6">
            
            {/* Article Content Render */}
            <div className="prose prose-teal max-w-none text-sm text-[#1a1f23]/85 leading-relaxed font-sans space-y-4">
              {post.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h2 key={idx} className="text-2xl font-bold font-headline uppercase text-[#0b3a40] pt-4 pb-2 border-b border-[#0b3a40]/10">
                      {paragraph.replace('# ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h3 key={idx} className="text-xl font-bold font-headline uppercase text-[#0b3a40] pt-3">
                      {paragraph.replace('## ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h4 key={idx} className="text-lg font-bold font-headline uppercase text-[#0f5c66] pt-2">
                      {paragraph.replace('### ', '')}
                    </h4>
                  );
                }
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>

            {/* Tags Strip */}
            <div className="pt-6 border-t border-[#0b3a40]/10 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#c9a46b]" />
                <span className="font-bold font-headline uppercase text-[#0b3a40]">Article Tags:</span>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-[#f7f5f0] text-[#0b3a40] text-[10px] font-semibold px-2.5 py-1 rounded border border-[#0b3a40]/10">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Recommended Articles */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-headline uppercase text-[#0b3a40]">
              RECOMMENDED TRADE READS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/insights/${rel.slug}`}
                  className="bg-white p-6 rounded-xl border border-[#0b3a40]/10 shadow-sm hover:shadow-md transition-all space-y-2 group"
                >
                  <span className="text-[10px] font-bold font-headline uppercase text-[#c9a46b]">
                    {rel.category}
                  </span>
                  <h4 className="text-base font-bold font-headline uppercase text-[#0b3a40] group-hover:text-[#c9a46b] transition-colors leading-snug">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#1a1f23]/70 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}
