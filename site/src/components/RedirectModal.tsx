// Allowlist validator used by RedirectPage
// FIX: Added 'www.' variants explicitly — the replace() strips them, but being explicit avoids
//      any future regex edge case. Also added missing 'honeygain.com' www variant path.
const ALLOWED_HOSTS = new Set([
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
]);

export function isSafeRedirectUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    // FIX: reject anything that isn't strictly https
    if (parsed.protocol !== 'https:') return false;
    // FIX: reject URLs with user-info (e.g. https://evil@cointiply.com) — could spoof domain
    if (parsed.username || parsed.password) return false;
    // FIX: reject non-standard ports (e.g. https://cointiply.com:8080/...) 
    if (parsed.port !== '') return false;
    const hostname = parsed.hostname.replace(/^www\./, '').toLowerCase();
    return ALLOWED_HOSTS.has(hostname);
  } catch {
    return false;
  }
}
