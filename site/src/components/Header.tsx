import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'All Sites', path: '/' },
    { label: 'Faucets', path: '/faucet' },
    { label: 'PTC Sites', path: '/ptc' },
    { label: 'Free Mining', path: '/freemining' },
    { label: 'Passive Income', path: '/passive' },
    { label: 'Blog', path: '/blog' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 bg-[#2e1065] text-white ${isScrolled ? 'shadow-xl py-4' : 'py-5'}`}>
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        <button onClick={() => { navigate('/'); window.scrollTo({ top: 0 }); }} className="flex items-center gap-2.5 group">
          <img src="/assets/icon.webp" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="text-[17px] font-medium tracking-wide">Earn and Claim Coins Free</span>
        </button>
        <nav className="hidden lg:flex items-center gap-8 text-[15px] text-gray-300 font-semibold tracking-wide">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); window.scrollTo({ top: 0 }); }}
              className={`transition-colors ${isActive(item.path) ? 'text-white' : 'hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
