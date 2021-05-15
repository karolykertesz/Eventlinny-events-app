import react, { useEffect, useState } from "react";

const Dimension = () => {
  const isWindow = typeof window !== "undefined";

  const getDimension = () => {
    const width = isWindow ? window.innerWidth : null;
    return { width };
  };
  const [windowDiv, setWindow] = useState(getDimension());
  useEffect(() => {
    if (isWindow) {
      function resize() {
        setWindow(getDimension());
      }
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }
  }, [isWindow]);
  return windowDiv;
};

export default Dimension;
