import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Twitter, Send, MoreHorizontal, Calendar, Tag } from 'lucide-react';
import { blogPosts } from './BlogPage';
import Header from '../components/Header';
import AdBannerSticky from '../components/AdBannerSticky';
import AdBanner from '../components/AdBanner';

export default function NewsPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
        <button onClick={() => navigate('/blog')} className="text-purple-600 font-bold hover:underline">Back to Blog</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8fafc]">
      <AdBannerSticky />
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 w-full">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-bold mb-10 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </button>

        <article className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 md:p-12 overflow-hidden">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-500 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" /> {post.date}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-black text-gray-400 uppercase tracking-tight bg-gray-50 px-2.5 py-1 rounded-md">
              <Tag className="w-3.5 h-3.5" /> {post.category}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-8 font-heading leading-tight">
            {post.title}
          </h1>

          <div className="prose prose-purple max-w-none text-gray-600 font-medium leading-relaxed space-y-6 text-lg">
            <p className="italic text-xl text-gray-500 border-l-4 border-purple-200 pl-6 py-2 mb-10">
              {post.excerpt}
            </p>
            <p>{post.content}</p>
            <p>
              In the rapidly evolving world of digital assets, finding trustworthy platforms can be a challenge. Our mission is to simplify this process by curating a list of "verified" and "community-tested" sites. We believe that everyone should have the opportunity to enter the crypto space without initial investment.
            </p>
            <p>
              Stay updated with the newest opportunities and trends in the crypto world. We constantly monitor and review hundreds of platforms to ensure they meet our standards for reliability, payout consistency, and user experience.
            </p>
          </div>

          <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Share this post</span>
              <div className="flex items-center gap-3">
                <button className="p-3 rounded-xl bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-100 transition-all">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-xl bg-gray-50 text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all">
                  <Send className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-xl bg-gray-50 text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
            <AdBanner variant="inline" />
          </div>
        </article>
      </main>

      <footer className="bg-[#1f0b45] text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
          &copy; 2026 Earn and Claim Coins Free. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
