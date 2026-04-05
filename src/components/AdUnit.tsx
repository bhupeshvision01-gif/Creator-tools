import { useEffect } from 'react';

export const AdUnit = () => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="my-8 flex justify-center">
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-7608319000056384"
           data-ad-slot="4810690778"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};
