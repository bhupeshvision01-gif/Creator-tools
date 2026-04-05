import { useEffect } from 'react';

/**
 * AdUnit Component
 * Note: The main Google AdSense script MUST be in your index.html <head>
 * for this component to work.
 */
export const AdUnit = () => {
  useEffect(() => {
    try {
      // This "pushes" the ad request to Google's servers 
      // after the component has rendered on the screen.
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // This prevents the whole website from crashing if an ad fails to load
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="my-10 flex justify-center w-full overflow-hidden min-h-[100px]">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
        data-ad-client="ca-pub-7608319000056384" 
        data-ad-slot="6478995663"
      ></ins>
    </div>
  );
};
