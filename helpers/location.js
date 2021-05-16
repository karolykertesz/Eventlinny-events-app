import react, { useEffect, useState } from "react";
const windowLocation = () => {
  const isWindow = typeof window !== "undefined";
  const getLocation = () => {
    const location = isWindow ? window.location.href : null;
    return {
      location,
    };
  };
  const [win, setWin] = useState(getLocation());
  useEffect(() => {
    if (isWindow) {
      function getW() {
        setWin(getLocation());
      }
      window.addEventListener("popstate", getW);
      return () => window.removeEventListener("popstate", getW);
    }
  }, [isWindow]);
  return win;
};

export default windowLocation;
