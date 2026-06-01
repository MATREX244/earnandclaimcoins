// Allowlist validator used by RedirectPage
const ALLOWED_HOSTS = [
  'cointiply.com', 'tronlux.net', 'free-eth.io', 'dogekong.com', 'usdtpick.com',
  'freebnb.io', 'freexrp.io', 'freetron.io', 'solkong.com', 'freeton.io',
  'freeshib.io', 'freearb.io', 'suikong.com', 'easyton.io', 'freebch.io',
  'solpick.io', 'litepick.io',
  'satsman.com', 'addoge.com', 'coinpayu.com', 'adbtc.top', 'luckywatch.io',
  'adcore.io', 'adslice.io', 'bitclickz.com', 'faucetpayz.com', 'cryptoclik.com',
  'clicknewads.com', 'ptcverse.com', 'bzillion.club', 'clxaward.com',
  'makeyoutask.com', 'btcadspace.com',
  'rollercoin.com', 'zenmine.com', 'nuggmi.com', 'limercoin.com', 'simplebits.io',
  'grosats.io', 'coinluva.com',
  'honeygain.com', 'pawns.app', 'earn.fm', 'bytelixir.com', 'getgrass.io',
];

export function isSafeRedirectUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return false;
    const hostname = parsed.hostname.replace(/^www\./, '');
    return ALLOWED_HOSTS.includes(hostname);
  } catch {
    return false;
  }
}
