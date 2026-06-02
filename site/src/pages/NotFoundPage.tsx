import { useNavigate } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full">
        {/* Icon */}
        <div className="w-24 h-24 rounded-3xl bg-purple-50 flex items-center justify-center mb-8 mx-auto">
          <AlertTriangle className="w-12 h-12 text-purple-600" />
        </div>

        <h1 className="text-6xl font-black text-[#2e1065] mb-4 font-heading tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-500 font-medium mb-10 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/')}
            className="w-full py-4 bg-[#2e1065] text-white rounded-[20px] font-bold flex items-center justify-center gap-2 hover:bg-[#1f0b45] transition-all shadow-lg shadow-purple-900/20"
          >
            <Home className="w-5 h-5" /> Back to Homepage
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 text-gray-500 font-bold text-sm hover:text-gray-800 transition-colors"
          >
            Go to Previous Page
          </button>
        </div>
      </div>

      <div className="mt-16 flex items-center gap-2 opacity-50">
        <img src="/assets/icon.webp" alt="Logo" className="w-5 h-5 object-contain" />
        <span className="text-xs font-bold text-[#2e1065] uppercase tracking-widest">Earn and Claim Coins Free</span>
      </div>
    </div>
  );
}
