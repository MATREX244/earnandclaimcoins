export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  // Reconstrói a URL para o A-Ads
  const adUrl = `https://acceptable.a-ads.com/2440274${url.search}`;

  const response = await fetch(adUrl, {
    headers: {
      'Accept': context.request.headers.get('Accept') || 'text/html',
      'Accept-Language': context.request.headers.get('Accept-Language') || 'en-US',
      'User-Agent': context.request.headers.get('User-Agent') || '',
      'Referer': url.origin,
    },
  });

  const newHeaders = new Headers(response.headers);
  newHeaders.set('Access-Control-Allow-Origin', '*');
  newHeaders.set('X-Frame-Options', 'ALLOWALL');
  // Remove headers que impedem iframe cross-origin
  newHeaders.delete('X-Frame-Options');
  newHeaders.delete('Content-Security-Policy');

  return new Response(response.body, {
    status: response.status,
    headers: newHeaders,
  });
}
