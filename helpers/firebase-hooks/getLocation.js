import React, { useState, useEffect } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState();
  useEffect(() => {
    const locError = (err) => {
      if (err) {
        return setLocation([]);
      }
    };
    try {
      const getLocation = async (position) => {
        const { latitude, longitude } = await position.coords;
        const loca = [];
        loca.push(latitude, longitude);
        if (!location) {
          return setLocation(loca);
        }
      };
      if (!location) {
        return navigator.geolocation.getCurrentPosition(getLocation, locError);
      }
    } catch (err) {
      console.log(err);
    }
  }, [location]);
  return {
    location,
  };
};
