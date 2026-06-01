export default function AdBanner() {
  return (
    <div className="w-full my-8">
      <div style={{ width: '100%', margin: 'auto', position: 'relative', zIndex: 99998 }}>
        <iframe
          data-aa="2440274"
          src="/ad/?size=Adaptive"
          style={{
            border: 0,
            padding: 0,
            width: '70%',
            height: '90px',
            overflow: 'hidden',
            display: 'block',
            margin: 'auto',
            backgroundColor: 'transparent',
          }}
          title="Advertisement"
          scrolling="no"
        />
      </div>
    </div>
  );
}
