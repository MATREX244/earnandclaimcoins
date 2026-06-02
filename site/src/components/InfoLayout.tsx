import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import AdBannerSticky from './AdBannerSticky';

interface InfoLayoutProps {
  children: ReactNode;
  title: string;
}

export default function InfoLayout({ children, title }: InfoLayoutProps) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8fafc]">
      <AdBannerSticky />
      {/* Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 bg-[#2e1065] text-white ${isScrolled ? 'shadow-xl py-3' : 'py-3.5'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <button onClick={() => navigate('/')} className="flex items-center gap-2.5 group">
            <img src="/assets/icon.webp" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="text-[17px] font-medium tracking-wide">Earn and Claim Coins Free</span>
          </button>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-bold text-purple-200 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" /> Home
          </button>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-bold mb-10 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>

        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 font-heading">{title}</h1>
          <div className="prose prose-purple max-w-none text-gray-600 font-medium leading-relaxed space-y-6">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1f0b45] text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2026 Earn and Claim Coins Free. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
