export type Category = 'ALL' | 'FAUCET' | 'PTC' | 'MINING' | 'PASSIVE';

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export interface SiteData {
  id: string;
  name: string;
  url: string;
  type: Exclude<Category, 'ALL'>;
  reward: string;
  frequency: string;
  rating: number;
  featured?: boolean;
  bonusInfo?: string;
}

export const sites: SiteData[] = [
  // SITES WITH BONUS (TOP)
  { id: 'f18', name: 'LitePick', url: 'https://litepick.io/?ref=earnandclaimcoin', type: 'FAUCET', reward: 'LTC', frequency: 'Every 60 minutes', rating: 4.6, bonusInfo: '5% Bonus Commission' },
  { id: 'f17', name: 'SolPick', url: 'https://solpick.io/?ref=earnandclaimcoin', type: 'FAUCET', reward: '0.04 SOL', frequency: 'Every 60 minutes', rating: 4.5, bonusInfo: '5% Bonus Commission' },
  { id: 'f4', name: 'DOGE Kong', url: 'https://dogekong.live/?ref=earnandclaimcoins', type: 'FAUCET', reward: '15 DOGE', frequency: 'Every 60 minutes', rating: 4.6, bonusInfo: '2% Bonus Commission' },
  { id: 'f9', name: 'SOL Kong', url: 'https://solkong.live', type: 'FAUCET', reward: '0.01 SOL', frequency: 'Every 60 minutes', rating: 4.6, bonusInfo: '2% Bonus Commission' },
  { id: 'f13', name: 'SUI Kong', url: 'https://suikong.live', type: 'FAUCET', reward: '2 SUI', frequency: 'Every 60 minutes', rating: 4.5, bonusInfo: '2% Bonus Commission' },
  { id: 'f14', name: 'EasyTon', url: 'https://easyton.io/?ref=cryyypt', type: 'FAUCET', reward: '1 TON', frequency: 'Every 60 minutes', rating: 4.4, bonusInfo: 'Bonus Commission' },

  // FAUCETS
  { id: 'f1', name: 'Tronlux', url: 'https://tronlux.io/?ref=cryyycryp', type: 'FAUCET', reward: '80 TRX', frequency: 'Every 60 minutes', rating: 4.8, featured: true },
  { id: 'f2', name: 'Free ETH', url: 'https://freeeth.io', type: 'FAUCET', reward: '0.005 ETH', frequency: 'Every 60 minutes', rating: 4.5 },
  { id: 'f3', name: 'Cointiply', url: 'https://cointiply.mobi/rkO85E', type: 'FAUCET', reward: '200+ satoshi', frequency: 'Every 60 minutes', rating: 4.9, featured: true },
  { id: 'f5', name: 'USDT Pick', url: 'https://usdpick.io?ref=UNQLubRKzs', type: 'FAUCET', reward: '5 USDT', frequency: 'Every 60 minutes', rating: 4.4 },
  { id: 'f6', name: 'Free BNB', url: 'https://freebnb.in?ref=eTKpyBTNTs', type: 'FAUCET', reward: '0.007 BNB', frequency: 'Every 60 minutes', rating: 4.5 },
  { id: 'f7', name: 'Free XRP', url: 'https://freexrp.in?ref=VUFftXFUf3', type: 'FAUCET', reward: '5 XRP', frequency: 'Every 60 minutes', rating: 4.3 },
  { id: 'f8', name: 'Free TRON', url: 'https://freetron.in?ref=5lyXlHEjQC', type: 'FAUCET', reward: '50 TRX', frequency: 'Every 60 minutes', rating: 4.7 },
  { id: 'f10', name: 'Free TON', url: 'https://freetoncoin.in?ref=hfixyHWT9q', type: 'FAUCET', reward: '1.20 TON', frequency: 'Every 60 minutes', rating: 4.4 },
  { id: 'f11', name: 'Free SHIB', url: 'https://freeshib.in?ref=3kABbGovQu', type: 'FAUCET', reward: '500k SHIB', frequency: 'Every 60 minutes', rating: 4.2 },
  { id: 'f12', name: 'Free ARB', url: 'https://freearb.in?ref=x4GGgQnguV', type: 'FAUCET', reward: '20 ARB', frequency: 'Every 60 minutes', rating: 4.3 },
  { id: 'f15', name: 'Free BCH', url: 'https://freebch.in', type: 'FAUCET', reward: '0.025 BCH', frequency: 'Every 60 minutes', rating: 4.3 },

  // PTC
  { id: 'p1', name: 'Satsman', url: 'https://satsman.com?ref=earnandclaimcoins', type: 'PTC', reward: '200 satoshi', frequency: 'Daily Limit', rating: 4.7 },
  { id: 'p2', name: 'Ad Doge', url: 'https://addoge.com', type: 'PTC', reward: '1 DOGE', frequency: 'Daily Limit', rating: 4.3 },
  { id: 'p3', name: 'CoinPayU', url: 'https://www.coinpayu.com/?r=2Kg24bYy2X48', type: 'PTC', reward: '500 satoshi', frequency: 'Daily Limit', rating: 4.9, featured: true },
  { id: 'p4', name: 'Ad BTC', url: 'https://adbtc.top', type: 'PTC', reward: '250 satoshi', frequency: 'Daily Limit', rating: 4.8 },
  { id: 'p5', name: 'LuckyWatch', url: 'https://luckywatch.com', type: 'PTC', reward: '$0.20', frequency: 'Daily Limit', rating: 4.5 },
  { id: 'p6', name: 'AdCore', url: 'https://adcore.io', type: 'PTC', reward: '100 satoshi', frequency: 'Daily Limit', rating: 4.4 },
  { id: 'p7', name: 'AdSlice', url: 'https://adslice.com', type: 'PTC', reward: '100 satoshi', frequency: 'Daily Limit', rating: 4.6 },
  { id: 'p8', name: 'BitClickz', url: 'https://bitclickz.com', type: 'PTC', reward: '100 satoshi', frequency: 'Daily Limit', rating: 4.2 },
  { id: 'p9', name: 'FaucetPayz', url: 'https://faucetpayz.com', type: 'PTC', reward: '50 satoshi', frequency: 'Daily Limit', rating: 4.3 },
  { id: 'p10', name: 'CryptoClick', url: 'https://cryptoclik.com', type: 'PTC', reward: '50 satoshi', frequency: 'Daily Limit', rating: 4.1 },
  { id: 'p11', name: 'ClickNewAds', url: 'https://clicknewads.com', type: 'PTC', reward: '$0.10', frequency: 'Daily Limit', rating: 4.0 },
  { id: 'p12', name: 'PTCVerse', url: 'https://ptcverse.com', type: 'PTC', reward: '$0.05', frequency: 'Daily Limit', rating: 4.2 },
  { id: 'p13', name: 'Bzillion Club', url: 'https://bzillion.club', type: 'PTC', reward: '$0.10', frequency: 'Daily Limit', rating: 4.1 },
  { id: 'p14', name: 'Clxaward', url: 'https://clxaward.com', type: 'PTC', reward: '50 satoshi', frequency: 'Daily Limit', rating: 4.3 },
  { id: 'p15', name: 'MakeYouTask', url: 'https://makeyoutask.com', type: 'PTC', reward: '50 satoshi', frequency: 'Daily Limit', rating: 4.4 },
  { id: 'p16', name: 'BtcAdSpace', url: 'https://btcadspace.com', type: 'PTC', reward: '50 satoshi', frequency: 'Daily Limit', rating: 4.5 },

  // MINING
  { id: 'm1', name: 'RollerCoin', url: 'https://rollercoin.com/?r=mpz16sc7', type: 'MINING', reward: '1000 sat bonus', frequency: 'Continuous', rating: 4.8, featured: true },
  { id: 'm2', name: 'ZenMine', url: 'https://zenmine.io/?ref=VMEbBPeG', type: 'MINING', reward: '1000 H/s free', frequency: 'Continuous', rating: 4.5 },
  { id: 'm3', name: 'Nuggmi', url: 'https://nuggmi.com/ref/earnandclaimcoins', type: 'MINING', reward: 'Faucet+PTC+Mine', frequency: 'Continuous', rating: 4.6 },
  { id: 'm4', name: 'LimerCoin', url: 'https://limercoin.com', type: 'MINING', reward: 'Free Miner', frequency: 'Continuous', rating: 4.4 },
  { id: 'm5', name: 'SimpleBits', url: 'https://simplebits.io', type: 'MINING', reward: 'Deploy Miners', frequency: 'Continuous', rating: 4.7 },
  { id: 'm6', name: 'GROSATS', url: 'https://grosats.com', type: 'MINING', reward: 'Deploy Miners', frequency: 'Continuous', rating: 4.2 },
  { id: 'm7', name: 'Coinluva', url: 'https://coinluva.com', type: 'MINING', reward: 'Faucet+PTC+Mine', frequency: 'Continuous', rating: 4.3 },

  // PASSIVE INCOME
  { id: 'pa1', name: 'HoneyGain', url: 'https://honeygain.com', type: 'PASSIVE', reward: '$3 bonus + $0.30/GB', frequency: 'Passive', rating: 4.9, featured: true },
  { id: 'pa2', name: 'Pawns.app', url: 'https://pawns.app/?r=19830013', type: 'PASSIVE', reward: '$1 bonus + $0.20/GB', frequency: 'Passive', rating: 4.8 },
  { id: 'pa3', name: 'EarnFM', url: 'https://earn.fm', type: 'PASSIVE', reward: '$5 bonus + $0.20/GB', frequency: 'Passive', rating: 4.5 },
  { id: 'pa4', name: 'ByteLixir', url: 'https://bytelixir.com/r/NUJWDWGVHMBE', type: 'PASSIVE', reward: '$1 bonus + $0.20/GB', frequency: 'Passive', rating: 4.4 },
  { id: 'pa5', name: 'Grass', url: 'https://app.grass.io/register?referralCode=PP0N-orC1w48aD6', type: 'PASSIVE', reward: '5000 points free', frequency: 'Passive', rating: 4.7 }
];
