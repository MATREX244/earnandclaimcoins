export default function AdBanner() {
  return (
    <div className="not-prose w-full my-8">
      {/* FIX: give the iframe a concrete min-height so it never collapses to 0px */}
      <div
        id="frame"
        style={{ width: '100%', margin: 'auto', position: 'relative', zIndex: 99998, minHeight: '90px' }}
      >
        <iframe
          data-aa="2440274"
          src="//acceptable.a-ads.com/2440274/?size=Adaptive"
          style={{
            border: 0,
            padding: 0,
            width: '70%',
            height: '90px',       // FIX: explicit height — "auto" collapses cross-origin iframes
            minHeight: '60px',
            overflow: 'hidden',
            display: 'block',
            margin: 'auto',
            backgroundColor: 'transparent',
          }}
          title="Advertisement"
          // FIX: security hardening — restrict what the ad iframe can do
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
}
