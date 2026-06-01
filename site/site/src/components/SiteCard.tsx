import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Gift, Activity, ArrowRight, Heart, Zap, HandCoins, Pickaxe, Laptop, Coins, MoreHorizontal } from 'lucide-react';
import { SiteData } from '../data';

const typeBadges = {
  FAUCET: 'text-amber-600',
  PTC: 'text-blue-600',
  MINING: 'text-emerald-600',
  PASSIVE: 'text-purple-600'
};

const getCoinSymbols = (site: SiteData) => {
  const upper = (site.reward + ' ' + site.name).toUpperCase();
  const symbols: string[] = [];

  if (
    upper.includes('COINPAYU') || upper.includes('ROLLERCOIN') ||
    upper.includes('FAUCETPAYZ') || upper.includes('SIMPLEBITS') ||
    upper.includes('GROSATS') || upper.includes('COINLUVA') ||
    upper.includes('NUGGMI') || upper.includes('PTCVERSE') ||
    upper.includes('COINTIPLY')
  ) {
    return ['btc', 'eth', 'doge', 'trx', 'ltc'];
  }

  if (upper.includes('BTC') || upper.includes('SATOSHI') || upper.includes('BITCOIN')) symbols.push('btc');
  if (upper.includes('ETH')) symbols.push('eth');
  if (upper.includes('DOGE')) symbols.push('doge');
  if (upper.includes('TRX') || upper.includes('TRON')) symbols.push('trx');
  if (upper.includes('SOL')) symbols.push('sol');
  if (upper.includes('BNB')) symbols.push('bnb');
  if (upper.includes('XRP')) symbols.push('xrp');
  if (upper.includes('TON')) symbols.push('ton');
  if (upper.includes('SHIB')) symbols.push('shib');
  if (upper.includes('ARB')) symbols.push('arb');
  if (upper.includes('SUI')) symbols.push('sui');
  if (upper.includes('BCH')) symbols.push('bch');
  if (upper.includes('LTC') || upper.includes('LITE')) symbols.push('ltc');
  if (upper.includes('$') || upper.includes('USDT') || upper.includes('TETHER')) symbols.push('usdt');

  if (symbols.length === 0) {
    return site.type === 'PASSIVE' ? ['usdt'] : ['btc', 'eth', 'doge', 'trx'];
  }

  return [...new Set(symbols)];
};

const TypeIcon = ({ type, className }: { type: SiteData['type']; className?: string }) => {
  switch (type) {
    case 'FAUCET': return <HandCoins className={className} />;
    case 'PTC':    return <Zap className={className} />;
    case 'MINING': return <Pickaxe className={className} />;
    case 'PASSIVE':return <Laptop className={className} />;
    default:       return <Coins className={className} />;
  }
};

interface SiteCardProps {
  site: SiteData;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export function SiteCard({ site, isFavorite = false, onToggleFavorite }: SiteCardProps) {
  const navigate = useNavigate();
  const coinSymbols = useMemo(() => getCoinSymbols(site), [site]);

  const coinTimings = useMemo(() => {
    return coinSymbols.slice(0, 3).map(() => ({
      duration: `${2 + Math.random() * 3}s`,
      delay: `${Math.random() * 2}s`,
    }));
  }, [coinSymbols]);

  const handleClaim = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/redirect/${site.id}`);
  };

  return (
    <article className="bg-white rounded-[20px] border border-gray-100 p-5 flex flex-col shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[19px] font-bold text-gray-900 font-heading tracking-tight leading-tight pr-2">
          {site.name}
        </h3>
        <div className="flex justify-end items-center gap-2 shrink-0">
          <span className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest ${typeBadges[site.type]}`}>
            <TypeIcon type={site.type} className="w-4 h-4" />
            <span className="hidden sm:inline">{site.type}</span>
          </span>
          {coinSymbols.length > 0 && (
            <div className="flex items-center -space-x-1.5 ml-2">
              {coinSymbols.slice(0, 3).map((sym, i) => (
                <div
                  key={sym}
                  className="rounded-full bg-white shadow-sm flex items-center justify-center p-[2px]"
                  style={{ zIndex: 10 - i }}
                >
                  <img
                    src={`https://assets.coincap.io/assets/icons/${sym}@2x.png`}
                    alt={sym}
                    className="w-[22px] h-[22px] object-contain animate-coin-spin"
                    style={{
                      animationDuration: coinTimings[i]?.duration,
                      animationDelay: coinTimings[i]?.delay,
                    }}
                  />
                </div>
              ))}
              {coinSymbols.length > 3 && (
                <div className="w-[26px] h-[26px] rounded-full bg-gray-50 flex items-center justify-center z-0 text-gray-400 border border-gray-100 ml-0.5">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          )}
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(site.id)}
              className={`p-1.5 rounded-[8px] transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300 ml-1 ${
                isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-pressed={isFavorite}
            >
              <Heart className={`w-[18px] h-[18px] transition-colors ${isFavorite ? 'fill-red-500' : ''}`} />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 mb-5 border-b border-gray-50 pb-4">
        <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
        <span className="text-[14px] font-bold text-gray-800 ml-1">
          {site.rating}<span className="text-gray-400 font-medium">/5</span>
        </span>
      </div>

      <div className="flex flex-col gap-2.5 mb-6 text-gray-600 mt-auto">
        <div className="flex items-center gap-3 bg-gray-50/80 p-2.5 rounded-[12px] border border-gray-100/50">
          <div className="bg-white p-1.5 rounded-[8px] shadow-sm border border-gray-100">
            <Gift className="w-4 h-4 text-gray-600" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Reward</span>
            <span className="text-[13px] font-bold text-gray-900">{site.reward}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50/80 p-2.5 rounded-[12px] border border-gray-100/50">
          <div className="bg-white p-1.5 rounded-[8px] shadow-sm border border-gray-100">
            <Activity className="w-4 h-4 text-gray-600" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Frequency</span>
            <span className="text-[13px] font-semibold text-gray-700">{site.frequency}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleClaim}
        className="block w-full bg-[#2e1065] text-white text-[13.5px] tracking-wide font-bold py-3 rounded-[10px] text-center hover:bg-[#1f0b45] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e1065] shadow-sm flex justify-center items-center gap-2 cursor-pointer"
        aria-label={`Claim from ${site.name}`}
      >
        Claim Now
        <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300" aria-hidden="true" />
      </button>
    </article>
  );
}
