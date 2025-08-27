import { useEffect, useState } from "react";

export function useGoogleMaps(apiKey: string) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Already loaded
    if (window.google?.maps?.places) {
      setLoaded(true);
      return;
    }

    // Prevent adding multiple scripts
    if (document.getElementById("google-maps-script")) {
      const checkReady = () => {
        if (window.google?.maps?.places) setLoaded(true);
      };
      const interval = setInterval(checkReady, 300);
      return () => clearInterval(interval);
    }

    // Inject script
    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => setLoaded(false);
    document.head.appendChild(script);
  }, [apiKey]);

  return loaded;
}
