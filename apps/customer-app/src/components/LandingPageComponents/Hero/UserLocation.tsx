"use client";

import React, { useEffect, useState } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

const UserLocation: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [place, setPlace] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(coords);
        setError(null);

        // Reverse geocode using Nominatim
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
        )
          .then((res) => res.json())
          .then((data) => {
            // Try to get state, city, or town
            const address = data.address;
            const state = address.state || address.region;
            const city = address.city || address.town || address.village;
            setPlace(state || city || "Unknown location");
          })
          .catch(() => setPlace("Unknown location"));
      },
      () => {
        setError("Somewhere in the world.");
        setLocation(null);
      }
    );
  }, []);

  return (
    <div>
      {error && <p style={{fontSize:30}}>{error}</p>}
      {place ? <p style={{fontSize:30}}>{place}</p> : !error ? <p style={{fontSize:30}}>Getting your location...</p> : null}
    </div>
  );
};

export default UserLocation;
