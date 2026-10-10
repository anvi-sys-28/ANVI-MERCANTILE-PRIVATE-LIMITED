import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { blogPostsData } from '@/data/blogPostsData';

export function LatestInsightsSection() {
  return (
    <section className="py-24 bg-[#071c35] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[#f39c12] text-xs font-bold font-headline uppercase tracking-widest block">
              TRADE ADVISORY & INDUSTRY ANALYSIS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight text-white">
              LATEST TRADE INSIGHTS
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-sans">
              Expert guides on customs regulations, FTA duty exemptions, port logistics, and supply chain optimization.
            </p>
          </div>

          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f39c12] hover:text-white group shrink-0"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 text-[#f39c12] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPostsData.slice(0, 3).map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-[#0a2540] rounded-3xl overflow-hidden border border-white/10 hover:border-[#f39c12] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    width="600"
                    height="400"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#f39c12] text-[#0a2540] text-[10px] font-bold font-headline uppercase px-3 py-1 rounded-full shadow">
                    {post.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[11px] text-white/50 font-sans">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#f39c12]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#f39c12]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-headline uppercase tracking-wide text-white group-hover:text-[#f39c12] transition-colors leading-snug line-clamp-2">
                    <Link to={`/insights/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-white/70 line-clamp-3 leading-relaxed font-sans">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-transparent flex items-center justify-between">
                <span className="text-[11px] font-medium text-white/70 flex items-center gap-1 font-sans">
                  <User className="w-3.5 h-3.5 text-[#f39c12]" />
                  {post.author}
                </span>
                <Link
                  to={`/insights/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold font-headline uppercase tracking-wider text-white group-hover:text-[#f39c12] transition-colors"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#f39c12]" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
