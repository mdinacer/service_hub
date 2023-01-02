import axios from 'axios';
import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const fetchAddress = async () => {
    if (location) {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`;
      try {
        const data = await axios.get(url).then((response) => response.data);
        setAddress(data.display_name);
      } catch (error) {
        console.error(error);
        setAddress(null);
      }
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      () => {
        setLocation(null);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  useEffect(() => {
    fetchAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return { location, address };
};

export default useGeolocation;
