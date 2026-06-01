import { useEffect, useState } from 'react';

export default function AdBanner() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Random interval between 30 and 45 seconds to avoid flooding and tracking blocks
    const getRandomTime = () => Math.floor(Math.random() * (45000 - 30000 + 1)) + 30000;
    
    const refreshAd = () => {
      setKey(prev => prev + 1);
      timeoutId = setTimeout(refreshAd, getRandomTime());
    };

    let timeoutId = setTimeout(refreshAd, getRandomTime());
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full my-8 flex justify-center items-center overflow-hidden">
      <div id="frame" style={{ width: '100%', margin: 'auto', position: 'relative', zIndex: 9999 }}>
        <iframe
          key={key}
          data-aa="2440274"
          src={`https://acceptable.a-ads.com/2440274/?size=Adaptive&key=${key}`}
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-forms allow-popups allow-scripts allow-same-origin"
          loading="lazy"
          importance="low"
          style={{
            border: 0,
            padding: 0,
            width: '100%',
            maxWidth: '728px',
            height: '90px',
            overflow: 'hidden',
            display: 'block',
            margin: 'auto',
            background: 'transparent'
          }}
          title="Advertisement"
        />
      </div>
    </div>
  );
}
