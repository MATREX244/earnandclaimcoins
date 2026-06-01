export default function AdBanner() {
  return (
    <div className="w-full my-8 flex justify-center items-center overflow-hidden">
      <iframe
        src="//acceptable.a-ads.com/2440274"
        style={{
          width: '100%',
          maxWidth: '728px',
          height: '90px',
          border: '0',
          padding: 0,
          overflow: 'hidden',
          backgroundColor: 'transparent',
          display: 'block',
          margin: 'auto',
        }}
        allow="autoplay"
        title="Advertisement"
        aria-label="Advertisement"
      />
    </div>
  );
}
