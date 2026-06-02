import { useState } from 'react';

export default function AdBannerSticky() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
      }}
      // Mobile: 60px de largura, bem colado na borda, não tampa nada
      // Desktop (sm+): 90px
      className="w-[60px] sm:w-[90px]"
      aria-label="Advertisement"
    >
      <iframe
        data-aa="2440274"
        src="//acceptable.a-ads.com/2440274/?size=160x600"
        style={{
          border: 0,
          padding: 0,
          width: '100%',
          // Mobile menor pra não ocupar metade da tela
          height: 200,
          overflow: 'hidden',
          display: 'block',
          backgroundColor: 'transparent',
        }}
        className="sm:!h-[300px]"
        title="Advertisement"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />

      <button
        onClick={() => setClosed(true)}
        aria-label="Fechar anúncio"
        style={{
          background: 'rgba(248,248,249,0.85)',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 22,
          height: 22,
          backdropFilter: 'blur(2px)',
          flexShrink: 0,
        }}
      >
        <svg fill="#555" height="10" width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490" aria-hidden="true">
          <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337" />
        </svg>
      </button>
    </div>
  );
}
