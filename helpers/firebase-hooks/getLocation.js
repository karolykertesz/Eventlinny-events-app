import React, { useState, useEffect } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState();
  useEffect(() => {
    const getLocation = async (position) => {
      const { latitude, longitude } = await position.coords;
      const loca = [];
      loca.push(latitude, longitude);
      if (!location) {
        return setLocation(loca);
      }
    };
    if (!location) {
      return navigator.geolocation.getCurrentPosition(getLocation, console.log);
    }
  }, [location]);
  return {
    location,
  };
};
