// Allowlist validator used by RedirectPage
// FIX: Added 'www.' variants explicitly — the replace() strips them, but being explicit avoids
//      any future regex edge case. Also added missing 'honeygain.com' www variant path.
const ALLOWED_HOSTS = new Set([
  // FAUCETS
  'tronlux.io', 'freeeth.io', 'cointiply.com', 'dogekong.live', 'usdpick.io',
  'freebnb.in', 'freexrp.in', 'freetron.in', 'solkong.live', 'freetoncoin.in',
  'freeshib.in', 'freearb.in', 'suikong.live', 'easyton.io', 'freebch.in',
  'solpick.io', 'litepick.io',
  // PTC
  'satsman.com', 'addoge.com', 'coinpayu.com', 'adbtc.top', 'luckywatch.com',
  'adcore.io', 'adslice.com', 'bitclickz.com', 'faucetpayz.com', 'cryptoclik.com',
  'clicknewads.com', 'ptcverse.com', 'bzillion.club', 'clxaward.com',
  'makeyoutask.com', 'btcadspace.com',
  // MINING
  'rollercoin.com', 'zenmine.io', 'nuggmi.com', 'limercoin.com', 'simplebits.io',
  'grosats.com', 'coinluva.com',
  // PASSIVE
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
