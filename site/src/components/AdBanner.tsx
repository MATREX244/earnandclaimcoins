// AdBanner — três variantes de tamanho
// - default / "horizontal": banner largo (728×90 leaderboard), usado no meio da página
// - "inline": banner compacto ao lado da barra de pesquisa (320×50 mobile leaderboard)
// - "card": banner na altura de um card, usado dentro do grid de sites

interface AdBannerProps {
  variant?: 'horizontal' | 'inline' | 'card';
  className?: string;
}

const AD_ID = '2440274';

export default function AdBanner({ variant = 'horizontal', className = '' }: AdBannerProps) {
  if (variant === 'inline') {
    // Ao lado da barra de pesquisa — pequeno, horizontal, sem margens grandes
    return (
      <div
        className={`shrink-0 overflow-hidden rounded-[12px] ${className}`}
        style={{ width: 320, height: 50, minWidth: 200 }}
        aria-label="Advertisement"
      >
        <iframe
          data-aa={AD_ID}
          src={`//acceptable.a-ads.com/${AD_ID}/?size=320x50`}
          style={{ border: 0, padding: 0, width: '100%', height: '100%', display: 'block', backgroundColor: 'transparent' }}
          title="Advertisement"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    );
  }

  if (variant === 'card') {
    // Dentro do grid de cards — mesma altura dos cards, largura total da célula
    return (
      <article
        className={`overflow-hidden rounded-[20px] border border-dashed border-gray-200 bg-gray-50/60 ${className}`}
        style={{ minHeight: 220 }}
        aria-label="Advertisement"
      >
        <iframe
          data-aa={AD_ID}
          src={`//acceptable.a-ads.com/${AD_ID}/?size=Adaptive`}
          style={{ border: 0, padding: 0, width: '100%', height: '100%', minHeight: 220, display: 'block', backgroundColor: 'transparent' }}
          title="Advertisement"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        />
      </article>
    );
  }

  // horizontal (padrão) — banner largo centralizado
  return (
    <div className={`not-prose w-full my-8 ${className}`}>
      <div
        id="frame"
        style={{ width: '100%', margin: 'auto', position: 'relative', zIndex: 99998, minHeight: 90 }}
      >
        <iframe
          data-aa={AD_ID}
          src={`//acceptable.a-ads.com/${AD_ID}/?size=Adaptive`}
          style={{
            border: 0,
            padding: 0,
            width: '70%',
            height: 90,
            minHeight: 60,
            overflow: 'hidden',
            display: 'block',
            margin: 'auto',
            backgroundColor: 'transparent',
          }}
          title="Advertisement"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
}
