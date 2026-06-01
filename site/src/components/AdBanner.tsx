export default function AdBanner() {
  return (
    <div className="w-full my-8">
      <div id="frame" style={{ width: '100%', margin: 'auto', position: 'relative', zIndex: 99998 }}>
        <iframe
          data-aa="2440274"
          src="//acceptable.a-ads.com/2440274/?size=Adaptive"
          style={{
            border: 0,
            padding: 0,
            width: '70%',
            height: 'auto',
            overflow: 'hidden',
            display: 'block',
            margin: 'auto',
          }}
        />
      </div>
    </div>
  );
}
