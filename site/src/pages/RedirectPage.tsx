import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import Turnstile from 'react-turnstile';
import { sites, slugify } from '../data';
import { isSafeRedirectUrl } from '../components/RedirectModal';
import AdBannerSticky from '../components/AdBannerSticky';

// FIX: countdown set to 10 seconds as requested
const COUNTDOWN = 10;
const TURNSTILE_SITE_KEY = '0x4AAAAAADft3KMI8i7zgg1J';

export default function RedirectPage() {
  const { siteId } = useParams<{ siteId: string }>();
  const navigate = useNavigate();

  // FIX: look up by slug derived from site.name (matches the URL param set in SiteCard)
  const site = sites.find((s) => slugify(s.name) === siteId);

  const [seconds, setSeconds] = useState(COUNTDOWN);
  const [unlocked, setUnlocked] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [gone, setGone] = useState(false);

  const goNow = useCallback(() => {
    if (gone || !site || !turnstileToken) return;
    if (!isSafeRedirectUrl(site.url)) return;
    setGone(true);
    window.open(site.url, '_blank', 'noopener,noreferrer');
    navigate(-1);
  }, [gone, site, turnstileToken, navigate]);

  // FIX: redirect to 404 (not home) when site not found, so the URL is meaningful
  useEffect(() => {
    if (!site || !isSafeRedirectUrl(site.url)) {
      navigate('/404', { replace: true });
    }
  }, [site, navigate]);

  // FIX: unlock as soon as seconds hits 0, don't leave a stale "Wait 0s" state
  useEffect(() => {
    if (seconds <= 0) {
      setUnlocked(true);
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  if (!site) return null;

  const progress = ((COUNTDOWN - seconds) / COUNTDOWN) * 100;
  const circ = 2 * Math.PI * 26;
  const dash = circ - (progress / 100) * circ;

  const isReady = unlocked && turnstileToken;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
      <AdBannerSticky />
      {/* Back link */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-white rounded-[28px] shadow-xl max-w-md w-full p-10 flex flex-col items-center text-center">
        {/* Site Title */}
        <div className="flex items-center gap-2 mb-8">
          <img src="/assets/icon.webp" alt="Earn and Claim Coins Free" className="w-8 h-8 object-contain" />
          <span className="text-lg font-bold text-[#2e1065]">Earn and Claim Coins Free</span>
        </div>

        {/* Target Site Info */}
        <div className="mb-8">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">You are being redirected to:</p>
          <h1 className="text-3xl font-black text-gray-900 mb-2">{site.name}</h1>
        </div>

        {/* Countdown ring */}
        {!unlocked && (
          <div className="flex flex-col items-center gap-3 mb-10">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="26" fill="none" stroke="#f3e8ff" strokeWidth="5" />
                <circle
                  cx="30" cy="30" r="26" fill="none"
                  stroke="#7c3aed" strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={dash}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-purple-700">
                {seconds}
              </span>
            </div>
            <p className="text-gray-400 text-sm font-medium tracking-wide">Preparing your access...</p>
          </div>
        )}

        {/* Turnstile Verification - Added min-height and centering */}
        <div className="mb-8 min-h-[65px] flex items-center justify-center w-full overflow-hidden">
          <Turnstile
            sitekey={TURNSTILE_SITE_KEY}
            onVerify={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken(null)}
            onError={() => setTurnstileToken(null)}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={goNow}
            disabled={!isReady}
            className={`w-full py-4 rounded-[18px] font-bold flex items-center justify-center gap-2 transition-all focus:outline-none text-base ${
              isReady
                ? 'bg-[#2e1065] text-white hover:bg-[#1f0b45] shadow-lg shadow-purple-900/20 focus:ring-2 focus:ring-purple-400 cursor-pointer'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {!unlocked ? (
              `Wait ${seconds}s to continue`
            ) : !turnstileToken ? (
              'Verify to continue'
            ) : (
              <> Access {site.name} <ExternalLink className="w-4 h-4" /> </>
            )}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 px-4 rounded-[18px] text-gray-500 font-bold text-sm hover:text-gray-800 transition-colors focus:outline-none"
          >
            Cancel and Go Back
          </button>
        </div>
      </div>

      <p className="mt-8 text-gray-400 text-[11px] font-medium uppercase tracking-widest">
        &copy; 2026 Earn and Claim Coins Free
      </p>
    </div>
  );
}
