import { useEffect, useRef, useState } from 'react';

export default function AdBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adBlocked, setAdBlocked] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Don't inject while page itself hasn't settled
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      // Clear previous content
      containerRef.current.innerHTML = '';

      // Use the script-based embed (recommended by A-Ads) instead of raw iframe.
      // This avoids the "key=" param cycling that triggers Tracking Prevention.
      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle'; // neutral class, not used for tracking here
      ins.setAttribute('data-aa', '2440274');
      ins.style.cssText = 'display:block;width:100%;max-width:728px;height:90px;margin:auto;';

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://acceptable.a-ads.com/2440274.js';

      // Detect if ad is blocked after a grace period
      script.onerror = () => setAdBlocked(true);
      script.onload = () => setLoaded(true);

      containerRef.current.appendChild(ins);
      containerRef.current.appendChild(script);
    }, 800); // small delay — let React finish painting first

    return () => clearTimeout(timer);
  }, []); // run once only — no auto-refresh that triggers tracking blocks

  if (adBlocked) {
    // Soft fallback — don't show error, just hide the slot
    return null;
  }

  return (
    <div className="w-full my-8 flex justify-center items-center overflow-hidden min-h-[90px]">
      <div
        ref={containerRef}
        style={{
          width: '100%',
          maxWidth: '728px',
          minHeight: '90px',
          margin: 'auto',
          position: 'relative',
          background: 'transparent',
          // Placeholder shimmer while loading
          ...((!loaded) && {
            background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }),
        }}
      />
    </div>
  );
}
